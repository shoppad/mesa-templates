const Mesa = require("vendor/Mesa.js");
const Google = require("vendor/Google.js");

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

    Mesa.output.send('out-send-to-google-sheets', payload);
  }

}
