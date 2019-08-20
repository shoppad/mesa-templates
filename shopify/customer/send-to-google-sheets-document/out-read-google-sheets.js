const Mesa = require('vendor/Mesa.js');
const Google = require('vendor/Google.js');

/**
 * A Mesa Script exports a class with a script() method.
 * @type {class}
 */
module.exports = new class {
  script = (payload, context) => {
    // Initliazing Google Class.
    let google = new Google(
      payload.google.init.grantType,
      payload.google.init.secretKeys
    );

    // Getting google sheets.
    payload.google.sheets.payload = google.sheets.basicReading(
      payload.google.sheets.id,
      'Sheet1',
      'A1',
      'D5'
    ).values;

    Mesa.log.info('Google Sheets Response Basic Reading', payload);
    Mesa.output.send('out-update-google-sheets', payload);
  };
}();
