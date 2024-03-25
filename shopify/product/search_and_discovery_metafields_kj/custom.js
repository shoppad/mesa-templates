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

    let boostValues = JSON.parse(vars.shopify_1.value) ? JSON.parse(vars.shopify_1.value) : [];

    let newValue = vars.shopify_3.value;
    boostValues.push(newValue);

    // Get unique values so there aren't duplicates
    boostValues = [...new Set(boostValues)];

    Mesa.trigger.setTaskExternalData({
      "label": boostValues.join(', ')
    })

    Mesa.output.next(boostValues);
  }
}
