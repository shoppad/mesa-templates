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
    payload.record = this.airtableFindOrCreateVariantById(payload, context);
    Mesa.output.next(payload);
  }

  airtableFindOrCreateVariantById = (product) => { 
    let variant = context.steps.loop;

    let options = {
      "headers": {
        "Content-Type": "application\/json",
        "Authorization": "Bearer " + Mesa.credential.get('airtable'),
      }
    }

    let airtableProductId = context.steps.custom.record.id;
    let filterByFormula = `{Variant ID} = '${variant.id}'`;
    let base = context.steps.transform.base;
    let table = 'Variants';
    let url = 'https://api.airtable.com/v0/' + base + '/' + table + '?filterByFormula=' + encodeURIComponent(filterByFormula);

    let results = Mesa.request.get(url, options);    
    Mesa.log.info("results", results);

    let record = {};
    if (results.records.length > 0) {
      record = results.records[0];
    } else {
      let data = {
        "records": [
          {
            "fields": {
              "Variant ID": variant.id,
              "Title": variant.title,
              "Product": [airtableProductId],
              "Price": variant.price,
            },
          }
        ],
      }
      let result = Mesa.request.post(url, data, options);
      Mesa.log.info('result', result);
      record = result.records[0];
    }

    return record;
  }
}
