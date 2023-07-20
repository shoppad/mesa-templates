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

    // Add your custom code here
    let sku = context.steps.loop_1.sku;
    Mesa.log.info("sku: ", sku);
    
    let response = this.getAvailableInventoryForSku(sku);
    payload.inventory_item_id = response.inventory_item_id;
    payload.available = response.available;

    // We're done, call the next step!
    Mesa.output.next(newPayload);
  }

  getAvailableInventoryForSku = (sku) => {
    let query = `
      query ($query: String!) {
        productVariants(first: 3, query: $query) {
          edges {
            node {
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
        }
      }
    `;

    const r = ShopifyGraphql.send(query, {
    "query": "sku:" + sku,
    });


    Mesa.log.info("response: ", r);

    let fullInventoryId = r.data.productVariants.edges[0].node.inventoryItem.id;

    let response = {};
    response.inventory_item_id = fullInventoryId.match(/\d+/)[0];
    response.available = r.data.productVariants.edges[0].node.inventoryItem.inventoryLevels.edges[0].node.available;

    return response;
  }
}
