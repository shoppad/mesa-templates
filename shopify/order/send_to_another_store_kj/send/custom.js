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
    const vars = context.steps;

    let webhookUrl = context.automation.outputs[0].metadata.webhook_url;
    Mesa.request.post(webhookUrl, vars.shopify);

    Mesa.trigger.setTaskExternalData({
      "label": "Sending order to other store: " + webhookUrl
    });  

    Mesa.output.next(payload);
  }
}
