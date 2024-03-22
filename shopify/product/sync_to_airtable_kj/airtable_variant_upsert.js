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
    let vars = context.steps;
    const {table_name, field_name, field_value} = context.trigger.metadata;

    let credentialKey = Airtable.credentialKey(context);
    let baseId = Airtable.baseId(context);
    let record = Airtable.upsert(credentialKey, baseId, table_name, field_name, field_value, payload);
    Util.stepLabel(`Upserted Variant ${record.fields.Title} (#${record.id})`);
    Mesa.output.next(record);
  }
}
