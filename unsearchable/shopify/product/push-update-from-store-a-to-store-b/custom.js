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

    const accessToken = Mesa.credential.get('kalen-plus_myshopify_com');
    const shop = "kalen-plus.myshopify.com";

    const query = `
        query {
          shop {
            name
            email
          }
        }
      `;

    const variables = {};

    let post = Mesa.request.post(
      `https://${shop}/admin/api/2022-07/graphql.json`,
      {
        query,
        variables,
      },
      {
        skipJsonWrap: true,
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    Mesa.log.info("post", post);

    /*
    let query = `
      query getProductIdFromHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
        }
      }
    `;

    const r = ShopifyGraphql.send(query, {
      "handle": payload.handle,
    });

    Mesa.log.info("response: ", r);

    let globalProductId = r.data.productByHandle.id;
    payload.product_id = globalProductId.match(/\d+/)[0];
    Mesa.log.info("inventory item Id: ", payload.inventory_item_id);
    */

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
