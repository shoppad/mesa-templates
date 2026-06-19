const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    // Send to each "child" database step
    const refund = context.steps['shopify_refund'];

    if (refund.refund_line_items && refund.refund_line_items.length) {
      refund.refund_line_items.forEach((refundLineItem) => {
        Mesa.output.send(
          'data_record_1',
          {
            refund_line_item: {
              id: refundLineItem.id,
              line_item_id: refundLineItem.line_item_id,
              quantity: refundLineItem.quantity,
              restock_type: refundLineItem.restock_type,
              location_id: refundLineItem.location_id,
              subtotal: refundLineItem.subtotal,
              total_tax: refundLineItem.total_tax,
            },
          },
          true
        );
      });
    }

    if (refund.order_adjustments && refund.order_adjustments.length) {
      refund.order_adjustments.forEach((orderAdjustment) => {
        Mesa.output.send(
          'data_record_2',
          {
            order_adjustment: {
              id: orderAdjustment.id,
              amount: orderAdjustment.amount,
              tax_amount: orderAdjustment.tax_amount,
              kind: orderAdjustment.kind,
              reason: orderAdjustment.reason,
            },
          },
          true
        );
      });
    }

    if (refund.transactions && refund.transactions.length) {
      refund.transactions.forEach((transaction) => {
        Mesa.output.send(
          'data_record_3',
          {
            transaction: {
              id: transaction.id,
              kind: transaction.kind,
              gateway: transaction.gateway,
              status: transaction.status,
              message: transaction.message,
              created_at: transaction.created_at,
              test: transaction.test,
              authorization: transaction.authorization,
              location_id: transaction.location_id,
              user_id: transaction.user_id,
              parent_id: transaction.parent_id,
              processed_at: transaction.processed_at,
              device_id: transaction.device_id,
              error_code: transaction.error_code,
              source_name: transaction.source_name,
              amount: transaction.amount,
              currency: transaction.currency,
            },
          },
          true
        );
      });
    }
  };
})();
