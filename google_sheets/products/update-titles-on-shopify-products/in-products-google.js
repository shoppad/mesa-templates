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
          id: Mesa.storage.get("google_sheets_products_id"),
          payload: []
        }
      }
    };

    // Initliazing Google Class.
    const google = new Google(
      payload.google.init.grandType,
      payload.google.init.secretKeys
    );

    // Getting google sheets.
    payload.google.sheets.payload = google.sheets.basicReading(
      payload.google.sheets.id,
      "Sheet1",
      "A1",
      "D5"
    ).values;

    //
    Mesa.log.info("Google Sheets Response Basic Reading", payload);
    Mesa.output.send("out-products-google", payload);
  };
}();
