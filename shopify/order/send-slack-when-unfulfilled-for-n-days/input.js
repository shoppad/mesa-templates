const Mesa = require('vendor/Mesa.js');

/**
 * This script simply places each incoming payload onto a virtual output of the same name
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
    Mesa.vo.push(`${context.input.key.replace('in-', 'out-')}-vo`, payload);
  }
}
