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

    let {a, b, comparison, additional} = context.trigger.metadata;

    // Set the removeWhiteSpace flag if the schema is 4.1 or greater
    if (context.trigger.schema >= 4.1) {
      Filter.removeWhiteSpace = true;
    }

    if (context.task.source === 'ignore') {
      // Support the ignore button when testing MESA
      Mesa.trigger.setTaskExternalData({label: 'Replaying and ignoring filter check'});
      Mesa.output.next(payload);
    }
    else if (Filter.process(a, b, comparison, additional)) {
      // Passed the filter, call the next step and pass the original payload
      Mesa.log.debug(`Conditions passed: ${Filter.stringify(a, b, comparison, additional)}`);
      Mesa.output.next(payload);
    }
    else {
      Mesa.output.send('custom_2');
    }
  }
}