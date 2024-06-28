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
    // Get metaobject created payload
    const metaobjectCreatedPayload = vars.shopify_2;
    
    // Set vars.shopify_1.value to empty array [] if 'Retrieve Product Metafield' step returns NULL value
    if (!vars.shopify_1.value) {
      vars.shopify_1.value = '[]';
    }
    
    // Add the new product pricepoint to the beginning of the priceHistory array
    let priceHistory = JSON.parse(vars.shopify_1.value);
    let newPricePointId = metaobjectCreatedPayload.id;
    priceHistory.unshift(newPricePointId);

    // Continue to next step and pass priceHistory
    Mesa.output.next({"new_price_history": priceHistory});
  }
}
