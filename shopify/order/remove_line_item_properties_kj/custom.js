const Mesa = require('vendor/Mesa.js');
const ShopifyUtil = require('./ShopifyUtil.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {
  script = (payload, context) => {
    let vars = context.steps;

    let calculatedOrder = ShopifyUtil.orderEditBegin(vars.shopify.id);
    let lineItemPosition = vars.shopify.line_items.findIndex(object => object.id == vars.loop.id);
    let calculatedLineItem = calculatedOrder.lineItems.nodes[lineItemPosition];

    ShopifyUtil.setOrderQuantity(calculatedOrder, calculatedLineItem, 0);
    ShopifyUtil.orderEditCommit(calculatedOrder);

    Mesa.output.next({
      "calculated_order": calculatedOrder,
    });
  }
}
