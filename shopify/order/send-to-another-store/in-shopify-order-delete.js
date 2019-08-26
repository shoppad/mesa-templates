const Mesa = require('vendor/Mesa.js');

/**
 * This utility script can be used by an Input to call an Output of the same name.
 *
 * For example if you have an input with the name "Slack Send", which defaults to the key `in-slack-send`), it will call
 * the output with the key `out-slack-send`.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    Mesa.output.send('out-delete-shopify-order', payload);
  }
}
