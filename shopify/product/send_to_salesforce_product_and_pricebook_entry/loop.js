const Mesa = require("vendor/Mesa.js");
const Loop = require('vendor/Loop.js');

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

    // Loop over each item and enqueue child tasks for each matching item
    Loop.process(payload, context, (match, key) => {      
      match.key = match.key ? match.key : key;
      Mesa.output.nextOutput(match, {enqueue: true});
    });
    
  }
}
