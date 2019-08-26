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
      payload.google.init.grandType,
      payload.google.init.secretKeys
    );

    // Reading Google Sheets.
    payload.google.sheets.payload = google.sheets.basicReading(
      payload.google.sheets.id,
      'Sheet1',
      'A1',
      'G5'
    ).values;

    // Adding new order.
    payload.google.sheets.payload.push([
      payload.shopify.id,
      payload.shopify.name,
      payload.shopify.total_price,
      payload.shopify.customer ? payload.shopify.customer.first_name : null,
      payload.shopify.customer ? payload.shopify.customer.last_name : null,
      payload.shopify.customer ? payload.shopify.customer.id : null,
      payload.shopify.email
    ]);

    // Updating Google Sheets.
    let updateSheets = google.sheets.basicWriting(
      payload.google.sheets.id,
      'Sheet1',
      'A1',
      'G5',
      {
        range: 'Sheet1!A1:G5',
        majorDimension: 'ROWS',
        values: payload.google.sheets.payload
      }
    );
    Mesa.log.debug('Successfully updated Google Sheets orders spreadsheet', payload.google.sheets.payload);
  };
}();