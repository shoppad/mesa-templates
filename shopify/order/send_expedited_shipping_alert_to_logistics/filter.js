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

    Mesa.log.debug("metadata", context.trigger.metadata);

    let needle = context.trigger.metadata.a;
    let haystack = context.trigger.metadata.b;

    haystack = haystack.split(",").map(function(e){return e.toLowerCase().trim()});
    haystack = haystack.filter(function(elem) {
      return needle.toLowerCase().indexOf(elem) >= 0;
    });

    if (haystack.length) {
      // Passed the filter, call the next step and pass the original payload
      Mesa.log.debug(`Conditions passed: ${needle} is in ${haystack}`);
      Mesa.output.next(payload);
    }
    else {
      // Did not pass the filter, stop execution by doing nothing
      // Alternatively add code here if you would like something to happen when the conditions do not pass
      Mesa.log.warn(`Conditions (${needle} in ${haystack}) did not pass, stopping execution`);
    }
  }

}