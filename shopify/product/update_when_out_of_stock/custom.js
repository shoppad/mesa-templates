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

    let hasVariantsWithInventory = false;
    
    payload.variants.forEach(variant => {
      // Check if variant quantities equal 0
      if (variant.inventory_quantity > 0) {
        hasVariantsWithInventory = true;
      }
    });

    if (hasVariantsWithInventory === false) {
      // We're done, call the next step!
      Mesa.output.next(payload);
    } else {
      Mesa.log.info("Variants have inventory. Unable to continue with next step.");
    }
  }
}