/**
 * Unpublish From POS Channel
 */

const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');
const ShopifyUtil = require('./ShopifyUtil.js');

module.exports = new class {
  script = (payload, context) => {
    let vars = context.steps;
    
    let response = ShopifyUtil.unpublishFromChannel(`gid://shopify/Product/${vars.shopify.id}`, vars.custom.publicationId);

    Mesa.output.next({"response": response.data});
  }
}
