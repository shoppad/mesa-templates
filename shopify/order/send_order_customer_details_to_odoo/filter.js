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

    let {a: aUnsorted, b: bUnsorted, comparison} = context.trigger.metadata;

    // Need to order these
    const a = aUnsorted.split(',').sort().join(',');
    const b = bUnsorted.split(',').sort().join(',');

    if (Filter.process(a, b, comparison)) {
      // Passed the filter, call the next step and pass the original payload
      Mesa.log.debug(`Conditions passed: ${a} ${comparison} ${b}`);
      Mesa.output.next(payload);
    }
    else {
      // Did not pass the filter, stop execution by doing nothing
      // Alternatively add code here if you would like something to happen when the conditions do not pass
      throw new Error(`Conditions (${a} ${comparison} ${b}) did not pass, stopping execution`);
    }
  }

}