const Mesa = require('vendor/Mesa.js');

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

    // Add your custom code here
    let options = {
      "headers": {
        "Content-Type": "application\/json",
        "Authorization": "Bearer " + Mesa.credential.get('airtable'),
      }
    }

    let record = context.steps.custom.record;
    let recordId = record.id;

    let base = context.steps.transform.Base;
    let table = context.steps.transform.Table;
    let url = 'https://api.airtable.com/v0/' + base + '/' + table + '/' + recordId;

    let data = {
        "fields": {
            "Available Inventory": payload[0].available,
        }
      }

    let results = Mesa.request.patch(url, data, options);    
    Mesa.log.info("results", results);

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
