const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');
const Shopify= require('vendor/Shopify.js');

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
    let query = `
      query getUTMFromOrder($id:ID!)
      {
        order(id: $id) {
          customerJourneySummary {
            firstVisit {
              id
              utmParameters {
                campaign
                content
                medium
                source
                term
              }
            }
            lastVisit {
              id
              utmParameters {
                campaign
                content
                medium
                source
                term
              }
            }
          }
        }
      }
    `;

    const r = ShopifyGraphql.send(query, {
      "id": "gid://shopify/Order/" + payload.id,
    });

    Mesa.log.info("response: ", r);
    payload.conversion = r.data;

    Mesa.output.next(payload);
  }
}
