/**
 * Look up order by tag
 */

const Mesa = require('vendor/Mesa.js');
const ShopifyUtil = require('./ShopifyUtil.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    let order = ShopifyUtil.ordersByTag('source-id-' + vars.webhook.id, 1);
    Mesa.output.next(order);
  }
}
