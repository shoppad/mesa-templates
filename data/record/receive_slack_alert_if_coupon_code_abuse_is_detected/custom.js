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

    let newPayload = {};
    newPayload.json_results = JSON.stringify(payload);
    
    // We're done, call the next step!
    Mesa.output.next(newPayload);
  }
}
