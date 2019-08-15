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
    const tags = payload.tags + "," + payload.currency;

    const data = {
      order: {
        tags: tags
      }
    };

    Mesa.output.done(data, { order_id: payload.id });
  }
};
