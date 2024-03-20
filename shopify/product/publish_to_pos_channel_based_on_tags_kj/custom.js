/**
 * Get Publication ID For POS Channel
 */

const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');
const ShopifyUtil = require('./ShopifyUtil.js');

module.exports = new class {
  script = (payload, context) => {
    let vars = context.steps;
    
    let publicationId = ShopifyUtil.getPublicationIdByName('Point of Sale');
    Mesa.trigger.setTaskExternalData({
      "label": "Publication ID: " + publicationId
    });

    Mesa.output.next({"publicationId": publicationId});
  }
}