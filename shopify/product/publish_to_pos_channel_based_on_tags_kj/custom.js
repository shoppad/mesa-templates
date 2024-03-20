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
        publications(first:10){
          nodes {
            id
            name      
          }
        }
      }
    `;

    const r = ShopifyGraphql.send(query, null, {}, 'admin/api/2023-10/graphql.json');

    Mesa.output.next({"publications": r.data.publications.nodes});
  }
}