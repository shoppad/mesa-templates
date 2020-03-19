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

    // Adjust `payload` here to alter data before we transform it

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Adjust `output` here to alter data after we transform it.

    // Add client ID from note attributes
    if (payload.note_attributes) {
      Mesa.log.debug('note attributes');
      const result = payload.note_attributes.filter(attribute => attribute.name == 'cid');
      Mesa.log.debug('result', result);
      if (result && result.length > 0) {
        Mesa.log.debug('result[0]', result[0]);
        Mesa.log.debug('result[0].value', result[0].value);
        output.cid = result[0].value;
      }
    }
    
    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
