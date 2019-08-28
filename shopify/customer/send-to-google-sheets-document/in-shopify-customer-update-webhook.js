const Mesa = require('vendor/Mesa.js');

/**
 * A Mesa Script exports a class with a script() method.
 * @type {class}
 */
module.exports = new class {
  script = (payload, context) => {
    // Passing out all the information need it.
    let outputPayload = {
      shopify: payload,
      google: {
        init: {
          grantType: 'refresh_token',
          secretKeys: {
            access_token: 'google-access-token',
            client_secret: 'google-client-secret',
            client_id: 'google-client-id',
            expires_at: 'google-expires-at',
            refresh_token: 'google-refresh-token'
          }
        },
        sheets: {
          id: Mesa.storage.get('google-sheets-id'),
          payload: []
        }
      }
    };
    Mesa.output.send('out-read-google-sheets', outputPayload);
  };
}();
