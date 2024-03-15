const Mesa = require('vendor/Mesa.js');
const Airtable = require('./Airtable.js');
const Util = require('./Util.js');

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
    // Mesa.log.info("payload", payload);

    let baseId = Airtable.baseId(context);
    let record = Airtable.upsert(baseId, 'Products', "Product ID", product.id, payload);
    Util.stepLabel(`Upserted Product ${record.fields.Title} (#${record.id})`);
    Mesa.output.next(record);
  }
}
