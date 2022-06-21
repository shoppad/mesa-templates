const Mesa = require("vendor/Mesa.js");

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    // Add your custom code here
    // Add client ID from note attributes
    if (payload.note_attributes) {
      Mesa.log.info('Has payload.note_attributes');
      const result = payload.note_attributes.filter(
        (attribute) => attribute.name == "cid"
      );
      if (result && result.length > 0) {
         Mesa.log.info('result[0].value', result[0].value);
        payload.cid = result[0].value;
      }
    }

    // We're done, call the next step!
    Mesa.output.next(payload);
  };
})();
