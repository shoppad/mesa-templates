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
      query variantsByCollection($query:String!) {
        productVariants(first:200,query:$query) {
          nodes {
            title
            sku
            inventoryQuantity
          }
        }
      }
    `;

    const r = ShopifyGraphql.send(query, {
      "query": `collection:${vars.loop.id} AND inventory_quantity:>0`
    }, {}, 'admin/api/2023-10/graphql.json');

    Mesa.trigger.setTaskExternalData({
      "label": vars.loop.title + ": " + r.data.productVariants.nodes.length + " variants in stock"
    })

    Mesa.output.next({"count": r.data.productVariants.nodes.length});
  }
}
