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

    let shippingTitle = payload.shipping_lines[0].title;

    // Add your custom code here
    // Mesa.log.info("payload", payload);
    // Mesa.log.info("shipping title: " + shippingTitle);
    if (shippingTitle == 'Economy') {
      payload.num_days = 10;
    }

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
