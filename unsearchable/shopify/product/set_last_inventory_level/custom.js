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
    payload.sum = this.productSumAllVariantInventoryLevels(context.steps.transform.product_id);
    Mesa.output.next(payload);
  }

  productSumAllVariantInventoryLevels = (product_id) => {
    let query = `
      query($query: String!) {
        productVariants(first: 3, query: $query) {
          edges {
            node {
              id
              sku
              inventoryItem {
                id
                inventoryLevels(first:3) {
                  edges {
                    node {
                      id
                      available
                    }
                  }
                }
              }
              product {
                id
              }
            }
          }
        }
      }
    `;

    const response = ShopifyGraphql.send(query, {
      "query": "product_id:" + context.steps.transform.product_id
    });

    Mesa.log.info("response: ", response);

    let sum = 0;
    
    const edges = response.data.productVariants.edges;
    for (const edge of edges) {
      const available = edge.node.inventoryItem.inventoryLevels.edges[0].node.available;
      sum += available;
    }
    
    console.log(sum); // Output: 19
    Mesa.log.info('sum', sum);

    return sum;
  }
}
