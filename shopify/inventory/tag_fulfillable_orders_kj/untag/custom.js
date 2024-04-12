const Mesa = require('vendor/Mesa.js');
const ShopifyUtil = require('./ShopifyUtil');

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
    const vars = context.steps;

    let orders = ShopifyUtil.ordersByTag('Fulfillable');
    // Add your custom code here
    // Line items from a Shopify Order Created trigger would be available as something like `vars.shopify.line_items`

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
