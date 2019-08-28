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
    let google = new Google('google.oauth');
    let googleSheetsId = Mesa.storage.get('google-sheets-id');
    
    // Reading Google Sheets.
    const response = google.sheets.read(
      googleSheetsId,
      'Sheet1',
      'A1',
      'G5'
    );
    let data = response.values;

    // Adding new order.
    data.push([
      payload.id,
      payload.name,
      payload.total_price,
      payload.customer ? payload.customer.first_name : null,
      payload.customer ? payload.customer.last_name : null,
      payload.customer ? payload.customer.id : null,
      payload.email
    ]);

    // Updating Google Sheets.
    const updateSheets = google.sheets.write(
      googleSheetsId,
      'Sheet1',
      'A1',
      'G5',
      {
        range: 'Sheet1!A1:G5',
        majorDimension: 'ROWS',
        values: data
      }
    );
    Mesa.log.debug('Successfully updated Google Sheets orders spreadsheet', data);
  };
}();
