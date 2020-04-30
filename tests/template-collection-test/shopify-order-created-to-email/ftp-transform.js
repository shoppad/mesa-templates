const Mesa = require('vendor/Mesa.js');

/**
 * 
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    // Add your custom code here
    // Note: for FTP destinations, you need to pass a string by calling `Mesa.csv.encode()`
    const output = payload;

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
