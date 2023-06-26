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
    let inventory = 0
    // Add your custom code here
    for (let variant of context.steps['shopify'].variants) {
      inventory += variant.inventory_quantity
    }    

    Mesa.output.next(inventory);
  }
}
