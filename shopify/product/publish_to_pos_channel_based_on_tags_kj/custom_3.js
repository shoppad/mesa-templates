/**
 * Publish to POS Channel
 */

const Mesa = require('vendor/Mesa.js');
const ShopifyUtil = require('./ShopifyUtil.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {
  script = (payload, context) => {
    let vars = context.steps;
    
    let response = ShopifyUtil.publishToChannel(`gid://shopify/Product/${vars.shopify.id}`, vars.custom.publicationId);

    Mesa.output.next({"response": response.data});
  }
}
