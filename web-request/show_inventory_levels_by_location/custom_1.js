const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');
const Shopify= require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {
  script = (payload, context) => {
    let vars = context.steps;
    let variantId = vars.webrequest.querystring.variant_id;
    
    let query = `
      {
        productVariant(id:"gid://shopify/ProductVariant/${variantId}") {
          sku
          inventoryItem {
            inventoryLevels(first:10) {
              nodes {
                location {
                  name
                }
                quantities(names:"available") {
                  available: quantity
                }
              }
            }
          }
        }
      }
    `;

    // const r = ShopifyGraphql.send(query, null, {}, 'admin/api/2023-10/graphql.json');
    const r = ShopifyGraphql.send(query, null);

    Mesa.output.next({"response": r.data.productVariant.inventoryItem.inventoryLevels.nodes});
  }
}
