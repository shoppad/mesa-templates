const Mesa = require('vendor/Mesa.js');

/**
 * Send a webhook to Store B with the delta
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

    let url = 'https://webhooks.getmesa.com/v1/kalen-plus/trigger-webhook/65f88df955f638c5080a8072/65f88dfcb89e46b8a500a19f.json?apikey=5HyfifuT0m30k33qJ192hae8sOz3TDg57mEGVRCE';

    Mesa.request.post(url, {
      "sku": vars.loop.sku,
      "location": vars.loop_1.location.name,
      "delta": vars.custom_1.delta,
      "run_time": vars.custom.run_time,
    });

    Mesa.output.next(payload);
  }
}
