const Mesa = require("vendor/Mesa.js");
const Google = require("vendor/Google.js");

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
          grandType: "refresh_token",
          secretKeys: {
            access_token: "google_access_token",
            client_secret: "google_client_secret",
            client_id: "google_client_id",
            expired_at: "google_expired_at",
            refresh_token: "google_refresh_token"
          }
        },
        sheets: {
          id: Mesa.storage.get("google_sheets_customers_id"),
          payload: []
        }
      }
    };
    Mesa.output.send("out-google-sheets-read", outputPayload);
  };
}();
