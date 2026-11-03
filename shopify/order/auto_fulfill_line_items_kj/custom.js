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
    // Fulfillment orders returned by the Get Fulfillment Orders step
    const order = (context.steps.shopify_2 || {}).order || {};
    const fulfillmentOrders = ((order.fulfillmentOrders || {}).nodes) || [];

    // Flatten to one entry per line item that still has quantity to fulfill
    const lineItems = [];
    fulfillmentOrders.forEach(fulfillmentOrder => {
      (((fulfillmentOrder.lineItems || {}).nodes) || []).forEach(lineItem => {
        if (lineItem.remainingQuantity > 0) {
          lineItems.push({
            fulfillment_order_id: fulfillmentOrder.id,
            id: lineItem.id,
            quantity: lineItem.remainingQuantity,
            sku: lineItem.sku,
            requires_shipping: lineItem.requiresShipping,
            line_item_id: lineItem.lineItem ? lineItem.lineItem.id : null
          });
        }
      });
    });

    // Call the next step in this workflow
    Mesa.output.next({ line_items: lineItems });
  }
}
