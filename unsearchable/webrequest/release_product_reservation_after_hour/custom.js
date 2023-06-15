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


    Mesa.log.info("payload: ", payload.value);
    Mesa.log.info("payload type: ", typeof(payload.value));

    let newPayload = {};  
    if (payload.value) {
      Mesa.log.info("Product was already in cart");
      newPayload.was_in_cart = true;
    } else {
      newPayload.was_in_cart = false;
      Mesa.log.info("Triggering automation to remove product from cart after delay");
      Mesa.automation.send("set_product_is_in_cart_false_after_delay");
      Mesa.log.info("Triggered automation to remove product from cart after delay");
    }

    // We're done, call the next step!
    Mesa.output.next(newPayload);
  }
}
