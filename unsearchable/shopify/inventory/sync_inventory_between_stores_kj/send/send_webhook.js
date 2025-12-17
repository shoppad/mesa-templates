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

    // Get Shopify shop details
    const shopifyShopDetails = vars.shopify;

    let output = context.automation.outputs.find(object => object.key == 'send_webhook');
    let webhookUrl = output.metadata.webhook_url;

    Mesa.trigger.setTaskExternalData({
      "label": "Sent to: " + webhookUrl
    });

    Mesa.request.post(webhookUrl, {
      "sku": vars.loop.sku,
      "shop_name": shopifyShopDetails.name,
      "location": vars.loop_1.location.name,
      "delta": vars.custom_1.delta,
      "run_time": vars.custom.run_time,
    });

    Mesa.output.next(payload);
  }
}
