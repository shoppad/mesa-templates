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

    // Get SKU from Square Retrieve Catalog Object
    const squareCatalogObject = context.steps['square_2'];
    const squareCatalogObjectSku = squareCatalogObject.object.item_variation_data.sku;
    
    // Create Shopify GraphQL query
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

    // Send request to Shopify GraphQL
    const response = ShopifyGraphql.send(query, {
      "query": "sku:" + squareCatalogObjectSku,
    });

    // Check response
    if (
      response &&
      response.data &&
      response.data.productVariants &&
      response.data.productVariants.edges[0] && 
      response.data.productVariants.edges[0].node && 
      response.data.productVariants.edges[0].node.inventoryItem && 
      response.data.productVariants.edges[0].node.inventoryItem.id ) 
    {
      // Add Inventory Item ID to payload
      let fullInventoryId = response.data.productVariants.edges[0].node.inventoryItem.id;
      payload.inventory_item_id = fullInventoryId.match(/\d+/)[0];

      Mesa.log.info(`Found match for Shopify product with SKU ${squareCatalogObjectSku}. Continue to next step.`);

      // We're done, call the next step!
      Mesa.output.next(payload);
    } else {
      // Output message if no SKU match is found
      Mesa.log.info(`No match for Shopify product with SKU ${squareCatalogObjectSku}. Do not continue to next step.`);
    }
    
  }
}