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
    query {
      orders(first:1, query:"tags:Migrated From Wholesale") {
        edges {
          node {
            id
            name
            tags
          }
        }
      }
    }
    `;

    const r = ShopifyGraphql.send(query);

    Mesa.log.info("response: ", r);
    r.data.orders.edges;

    let orderIds = [];
    for (let orderNode of r.data.orders.edges) {
      Mesa.log.info("order id: " + orderNode.node.id); 
      let segments = orderNode.node.id.split('/');
      orderIds.push({
        "id": segments[segments.length - 1]
      });
    }

    Mesa.output.next({
      "orderIds": orderIds,
    });
  }
}
