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

    /**
     * Variant query graphql body
     */
    const query = `
    query($productId: ID!) {
        product(id: $productId) {
          title
          collections(first: 10) {
            nodes {
              id
              title
            }
          }
        }
      }
    `;

    const response = ShopifyGraphql.send(query, {
      productId: ShopifyGraphql.buildShopifyId('Product', payload.id),
    });

    payload.collections = response.data.product.collections.nodes.map(node => node.title);


    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
