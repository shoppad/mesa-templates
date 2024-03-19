const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');
const Shopify= require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {
  script = (payload, context) => {
    let vars = context.steps;
    
    let query = `
      {
        orders(first:20,reverse:true) {
          nodes {
            name
            subtotalPriceSet {
              presentmentMoney {
                amount
              }
            }
            createdAt
            lineItems(first:10) {
              nodes {
                id
                name
                quantity
                image {
                  url
                }
              }
            }
          }
        }
      }
    `;

    const r = ShopifyGraphql.send(query, null, {}, 'admin/api/2023-10/graphql.json');
    let orders = r.data.orders.nodes;
    for (let order of orders) {
        order.lineItemNames = order.lineItems.nodes.map(
          object => `${object.name} (${object.quantity})`
        );
    }

    Mesa.output.next({"orders": orders});
  }
}
