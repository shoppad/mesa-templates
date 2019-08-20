const Mesa = require('vendor/Mesa.js');
const Google = require('vendor/Google.js');

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
    // Initliazing Google Class.
    let google = new Google(
      payload.google.init.grantType,
      payload.google.init.secretKeys
    );
    let updateSheets = google.sheets.basicWriting(
      payload.google.sheets.id,
      'Sheet1',
      'A1',
      'D5',
      {
        range: 'Sheet1!A1:D5',
        majorDimension: 'ROWS',
        values: payload.google.sheets.payload
      }
    );
    Mesa.log.info('Complete Customer Update', updateSheets);
  };
}();
