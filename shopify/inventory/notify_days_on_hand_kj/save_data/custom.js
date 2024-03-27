const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    let variantId = payload.id; 
    payload.available = this.getAvailableInventoryForVariant(variantId);
    Mesa.output.next(payload);
  }

  getAvailableInventoryForVariant = (variantId) => {
    let query = `
      query ($id: ID!) {
        productVariant(id: $id) {
          id
          sku
          inventoryItem {
            id
            locationsCount
            inventoryLevels(first: 10) {
              edges {
                node {
                  available
                }
              }
            }
          }
        }
      }
    `;

    const response = ShopifyGraphql.send(query, {
      "id": ShopifyGraphql.buildShopifyId('ProductVariant', variantId),
    });


    Mesa.log.info("response: ", response);

    let sum = 0;
    const levels = response.data.productVariant.inventoryItem.inventoryLevels.edges;
    
    for (let i = 0; i < levels.length; i++) {
      sum += levels[i].node.available;
    }

    return sum;
  }
}
