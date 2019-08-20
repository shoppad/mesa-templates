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

    // Updating the google sheets payload.
    payload.google.sheets.payload = google.sheets.addOrUpdate(
      [
        payload.shopify.id,
        `${payload.shopify.first_name} ${payload.shopify.last_name}`,
        payload.shopify.email,
        payload.shopify.phone
      ],
      payload.google.sheets.payload,
      0,
      'customer_id',
      payload.shopify.id
    );

    Mesa.log.info('Updating Google Sheets', payload);
    Mesa.output.send('out-update-customer-in-google-sheets', payload);
  };
}();
