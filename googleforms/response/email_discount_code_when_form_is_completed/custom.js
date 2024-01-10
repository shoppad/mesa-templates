const Mesa = require('vendor/Mesa.js');

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

    // Add your custom code here
    // Line items from a Shopify Order Created trigger would be available as something like `vars.shopify.line_items`
    const shopifyPriceRulePayload = vars.shopify_2;

    const priceRuleValueStr = shopifyPriceRulePayload.value;
    const num = Math.abs(parseFloat(priceRuleValueStr));
    Mesa.log.info('Price Rule value', num);

    payload.price_rule_value = num;

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
