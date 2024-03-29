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
    let sku = context.steps.loop.sku;
    
    // Add your custom code here
    let query = `
      query($query: String!) {
        productVariants(first: 3, query: $query) {
          edges {
            node {
              id
              sku
              inventoryItem {
                id
              }
              product {
                id
              }
            }
          }
        }
      }
    `;

    const r = ShopifyGraphql.send(query, {
      "query": "sku:" + sku,
    });


    Mesa.log.debug("response: ", r);

    let fullInventoryId = r.data.productVariants.edges[0].node.inventoryItem.id;
    payload.inventory_item_id = fullInventoryId.match(/\d+/)[0];

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
