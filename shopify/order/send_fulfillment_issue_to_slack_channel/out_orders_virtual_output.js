const Mesa = require('vendor/Mesa.js');

/**
 * Processes virtual output for created orders, based on the criteria defined in the virtual output definition
 *
 * Creates a custom output task for each order. The custom output will then do the necessary calls to Shopify
 *  and, if necessary, Slack
 *
 * @type {{script}}
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    const customOutput = 'out-send-slack-notification';

    if (payload.length > 0) {
      // Loop through the virtual output and enqueue custom output tasks
      payload.forEach(function(element) {
        Mesa.output.send(customOutput, element);
      });
          
    }

    Mesa.log.info(`Enqueued ${payload.length} orders to custom output ${customOutput}`);
  }
}
