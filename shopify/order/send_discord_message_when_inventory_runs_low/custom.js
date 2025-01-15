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
    // Retrieve the Variables Available to this step
    const vars = context.steps;

    /**
     * Variant query graphql body
     */
    const productQuery = `query ($id: ID!) {
      inventoryItem(id: $id) {
        id
        variant {
          title
          product {
            title
            id
          }
        }
      }
    }`;

    const response = ShopifyGraphql.send(productQuery, {
      id: ShopifyGraphql.buildShopifyId('inventoryItem', vars.shopify.inventory_item_id),
    });

    // Make sure we've got what we need (this is probably overkill / graphQL may ensure query vals are not undefined)
    if (!response || !response.data || !response.data.inventoryItem || !response.data.inventoryItem.variant || !response.data.inventoryItem.variant.product  || !response.data.inventoryItem.variant.product.title) {
        throw new Error('Unable to locate product by inventory ID');
    }

    // Don't pass variant name if it's "Default Title", prefix with dash for view
    const variantName = response.data.inventoryItem.variant.title !== 'Default Title' ? ' - ' + response.data.inventoryItem.variant.title : '';
    
    // Get product ID
    const productId = response.data.inventoryItem.variant.product.id.replace('gid:\/\/shopify\/Product\/', '');

    // We're done, call the next step!
    Mesa.output.next({
      product_title: response.data.inventoryItem.variant.product.title,
      variant_title: variantName,
      product_id: productId
    });
  }
}
