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
    
    let response = {
      "was_in_cart": (context.steps.shopify == "true" ? true : false)
    };

    let output = JSON.stringify(response);
    Mesa.output.next(response);
  }
}
