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
    const sheetId = ""; // Add your spreadsheet id.

    // Initliazing Google Class.
    const google = new Google("refresh_token", {
      access_token: "google_access_token",
      client_secret: "google_client_secret",
      client_id: "google_client_id",
      expired_at: "google_expired_at",
      refresh_token: "google_refresh_token"
    });

    // Getting google sheets.
    payload = google.sheets.basicReading(sheetId, "Sheet1", "A1", "D5").values;
    Mesa.log.info("Google Sheets Response Basic Reading", payload);
    Mesa.output.send("out-products-google", payload);
  };
}();
