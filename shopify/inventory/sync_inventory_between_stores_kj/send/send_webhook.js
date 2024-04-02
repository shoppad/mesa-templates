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

    let output = context.automation.outputs.find(object => object.key == 'send_webhook');
    let webhookUrl = output.metadata.webhook_url;
    Mesa.request.post(webhookUrl, vars.shopify);

    let url = vars.transform.Webhook;

    Mesa.request.post(url, {
      "sku": vars.loop.sku,
      "location": vars.loop_1.location.name,
      "delta": vars.custom_1.delta,
      "run_time": vars.custom.run_time,
    });

    Mesa.output.next(payload);
  }
}
