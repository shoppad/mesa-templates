const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');

/**
 * A MESA Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * MESA Script
   *
   * @param {object} prevResponse The response from the previous step
   * @param {object} context Additional context about this task
   */
  script = (prevResponse, context) => {

    // Retrieve the Variables Available to this step
    const vars = context.steps;

    // https://shopify.dev/docs/api/admin-graphql/2024-10/mutations/collectionReorderProducts
    let query = `
      mutation collectionReorderProducts($id: ID!, $moves: [MoveInput!]!) {
        collectionReorderProducts(id: $id, moves: $moves) {
          job {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Send Shopify GraphQL request
    const response = ShopifyGraphql.send(query, {
      "id": "gid://shopify/Collection/" + vars["transform"]["Collection ID"],
      "moves": [
        {
          "id":"gid://shopify/Product/" + vars.shopify_2.id,
          "newPosition": vars["loop_2"]["Best Sellers Index"].toString(),
        }
      ]
    });

    // Call the next step in this workflow
    Mesa.output.next({"response": response.data});
  }

}