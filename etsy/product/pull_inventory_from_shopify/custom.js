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

    // Etsy can't handle negative inventory
    let inventory = Math.max(vars.shopify.available, 0);

    Mesa.output.next({"inventory": inventory});
  }
}
