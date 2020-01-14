const Mesa = require('vendor/Mesa.js');

/**
 * This script simply places each incoming payload onto a virtual output
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    Mesa.output.send('out-send-slack-notification', payload);
  };
})();
