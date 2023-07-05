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
    let product = context.steps.shopify;
    payload.record = this.airtableFindOrCreateProductById(product);
    Mesa.output.next(payload);
  }

  airtableFindOrCreateProductById = (product) => { 
    // Add your custom code here
    let options = {
      "headers": {
        "Content-Type": "application\/json",
        "Authorization": "Bearer " + Mesa.credential.get('airtable'),
      }
    }

    let filterByFormula = `{Product ID} = '${product.id}'`;
    let base = context.steps.transform.base;
    let table = context.steps.transform.table;
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
              "Product ID": product.id,
              "Title": product.title,
            },
          }
        ],
        "typecast": true,
      }
      let result = Mesa.request.post(url, data, options);
      Mesa.log.info('result', result);
      record = result.records[0];
    }

    return record;
  }
}
