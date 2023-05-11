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

    let decoded = Mesa.csv.decode(payload);
    Mesa.log.info("decoded: ", decoded);
    let newPayload = {
      "rows": decoded
    };

    // We're done, call the next step!
    Mesa.output.next(newPayload);
  }
}
