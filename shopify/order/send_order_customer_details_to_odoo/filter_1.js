const Mesa = require('vendor/Mesa.js');
const Filter = require('vendor/Filter.js');

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

    let {a, b, comparison} = context.trigger.metadata;

    if (Filter.process(a, b, comparison)) {
      // Passed the filter, call the next step and pass the original payload
      Mesa.log.debug(`Conditions passed: ${a} ${comparison} ${b}`);
      Mesa.output.send('transform_mapping', payload);
    } else {
      // Did not pass the filter, stop execution by doing nothing
      // Alternatively add code here if you would like something to happen when the conditions do not pass
      Mesa.log.warn(`Conditions (${a} ${comparison} ${b}) did not pass, sending to create`);
      Mesa.output.send('odoo_custom', payload);
    }
  }

}