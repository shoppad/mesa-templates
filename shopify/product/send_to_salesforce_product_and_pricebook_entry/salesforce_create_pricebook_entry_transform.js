const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

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

    // Adjust `payload` here to alter data before we transform it.

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Adjust `output` here to alter data after we transform it.
    // If the 'Salesforce: Query Pricebook Entry' Output found an existing pricebook entry ID, pass this to the next output so the pricebook entry is updated
    // Remove fields which cannot be updated on an existing pricebook entry
    if (payload && payload.Id) {
      output.id = payload.Id;
      delete output.Product2Id;
    }

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
