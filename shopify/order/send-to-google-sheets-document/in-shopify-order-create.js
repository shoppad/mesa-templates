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
    // Passing out all the information need it.
    payload = {
      shopify: payload,
      google: {
        init: {
          grandType: 'refresh_token',
          secretKeys: {
            access_token: 'google-access-token',
            client_secret: 'google-client-secret',
            client_id: 'google-client-id',
            expired_at: 'google-expired-at',
            refresh_token: 'google-refresh-token'
          }
        },
        sheets: {
          id: Mesa.storage.get('google-sheets-id'),
          payload: []
        }
      }
    };
    Mesa.output.send('out-send-to-google-sheets', payload);
  };
}();
