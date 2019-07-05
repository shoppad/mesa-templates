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
    const customOutput = 'out-orders-slack-check-fulfilled';

    if (payload.length > 0) {
      // Loop through the virtual output and enqueue custom output tasks
      payload.forEach(function(element) {
        Mesa.output.send(customOutput, element);
      });
          
      // Clear the virtual output as we have pushed each of these orders to their own custom output
      Mesa.vo.clear(context.output.key);
    }

    Mesa.log.info(`Enqueued ${payload.length} orders to custom output ${customOutput}`);

    return `Processed ${payload.length} orders from virtual output ${context.output.key}`;
  }
}
