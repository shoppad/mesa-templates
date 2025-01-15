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

    // Get pattern and tag
    let pattern = vars.loop_2.pattern;
    let tag = vars.loop_2.tag;

    // Check regex match of pattern and tag
    // Product variant must have a SKU, otherwise an error will occur and a message displays about adding a SKU
    let regex = new RegExp(`${pattern}.*`, 'g');
    if (
      vars &&
      vars.loop &&
      vars.loop.sku
    ) {
      let match = vars.loop.sku.match(regex);
      Mesa.log.info("match", match);

      let isMatch = (match !== null);    
      Mesa.trigger.setTaskExternalData({
        label: "SKU " + vars.loop.sku + " matches pattern " + pattern + ": " + isMatch,
      });  

      // We're done, call the next step!
      Mesa.output.next({"is_match": isMatch});
    } else {
      throw new Error(`No product variant SKU found. Please add a SKU for product variant ${vars.loop.title}. Then replay this task.`);
      Mesa.log.error(`No product variant SKU found. Please add a SKU for product variant ${vars.loop.title}. Then replay this task.`);
    }
  }
}
