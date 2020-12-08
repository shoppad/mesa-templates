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
    const output = payload;

    let noteAttributes = [];
    Mesa.log.info('payload', payload);

    context.source.fields.forEach((item, index) => {
      if (item.value === output.original_image) {
        noteAttributes.push({
          'name': item.name,
          'value': payload.image
        });
      }
    });

    // We're done, call the next step!
    Mesa.output.next({
      note_attributes: noteAttributes,
    });
  }
}
