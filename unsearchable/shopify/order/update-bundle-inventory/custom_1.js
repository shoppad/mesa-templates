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
    let airtable = context.steps.airtable;

    payload.depends_on_sku = airtable.records[0].fields['Depends On SKU'][0];
    payload.depends_on_quantity = airtable.records[0].fields['Quantity'];
    Mesa.log.info("sku", payload.depends_on_sku);

    let dependsOnRecordId = airtable.records[0].fields['Depends On'][0];


    // update depends on variant decrement quantity available by bundle variant quantity

    // Loop over 

    Mesa.output.next(payload);
  }
}
