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
    const a = aUnsorted.split(',').sort()
    const b = bUnsorted.split(',').sort().join(',');

    a.forEach((sku)=> {
      if (!Filter.process(sku, b, comparison)) {
        throw new Error(`Conditions (${a} ${comparison} ${b}) did not pass, stopping execution`);
      }
    })

    // Passed the filter, call the next step and pass the original payload
    Mesa.log.debug(`Conditions passed: ${a} ${comparison} ${b}`);
    Mesa.output.next(payload);
  }

}