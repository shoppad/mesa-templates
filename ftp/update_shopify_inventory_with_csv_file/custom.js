const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');
const Shopify = require('vendor/Shopify.js');

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
    // Assign variables
    const vars = context.steps;
    let inventoryItemIdGid = 0;
    const productSku = vars.loop.SKU;
    Mesa.log.info("Product SKU", productSku);

    // Set up Shopify GraphQL query and retrieve product variant details based on SKU
    let query = `
      query($query: String!) {
        productVariants(first: 3, query: $query) {
          edges {
            node {
              displayName
              id
              sku
              inventoryItem {
                id
              }
              product {
                id
                title
              }
            }
          }
        }
      }
    `;
    const response = ShopifyGraphql.send(query, {
      "query": "sku:" + productSku,
    });
    Mesa.log.info("Response", response);
    
    // Get Inventory Item ID from Shopify GraphQL response and include in vars.loop payload
    if (
      response && 
      response.data &&
      response.data.productVariants &&
      response.data.productVariants.edges[0] &&
      response.data.productVariants.edges[0].node &&
      response.data.productVariants.edges[0].node.inventoryItem &&
      response.data.productVariants.edges[0].node.inventoryItem.id
    ) {
      inventoryItemIdGid = response.data.productVariants.edges[0].node.inventoryItem.id;
      vars.loop.inventory_item_id = inventoryItemIdGid.match(/\d+/)[0];
      Mesa.log.info("Inventory Item ID", vars.loop.inventory_item_id);

      // We're done, call the next step!
      Mesa.output.next(vars.loop);
    } else {
      Mesa.log.info('No Inventory Item ID included. Do not continue to next step');
    }
  }
}
