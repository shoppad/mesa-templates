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

    let productId = payload.current_item.id;
    let filterByFormula = `{Product ID} = '${productId}'`;
    let base = context.steps.transform.Base;
    let table = context.steps.transform.Table;
    let url = 'https://api.airtable.com/v0/' + base + '/' + table + '?filterByFormula=' + encodeURIComponent(filterByFormula);

    let results = Mesa.request.get(url, options);    
    Mesa.log.info("results", results);

    if (results.records.length > 0) {
      payload.record = results.records[0];
    } else {
      let data = {
        "records": [
          {
            "fields": {
              "Product ID": productId,
            }
          }
        ]
      }
      let result = Mesa.request.post(url, data, options);
      Mesa.log.info('result', result);
      payload.record = result.records[0];
    }

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
