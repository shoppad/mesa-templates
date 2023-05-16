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

    // Add your custom code here

    const sum = context.steps.shopify.line_items.reduce((a, b) => a + (b.grams || 0), 0);

    // We're done, call the next step!
    Mesa.output.next({
      total_weight: sum,
    });
  }
}
