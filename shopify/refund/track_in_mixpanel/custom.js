const Mesa = require('vendor/Mesa.js');

/**
 * A MESA Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * MESA Script
   *
   * @param {object} prevResponse The response from the previous step
   * @param {object} context Additional context about this task
   */
  script = (prevResponse, context) => {
    // Retrieve the Variables Available to this step
    // Line items from a Shopify Order Created trigger would be available as something like `vars.shopify.line_items`
    const vars = context.steps;

    // For storing response
    let response = {};
    // Get refund payload and Shopify order
    const refundPayload = vars.shopify;
    const shopifyOrder = vars.shopify_1;

    // Loop through transactions on the refund, and total up the refund amount
    let refundAmount = 0;
    refundPayload.transactions.forEach(transaction => {
      refundAmount -= transaction.amount;
    });

    // Format refunded line items' titles to comma-separated list (i.e. Title 1, Title 2, ...)
    const refundedLineItemsTitles = refundPayload.refund_line_items.map(item => item.line_item.title).join(', ');
    // Sum total quantity of refunded line items' quantities
    const refundedLineItemsTotalQuantity = refundPayload.refund_line_items.reduce((sum, item) => sum + item.quantity, 0);

    // Extract line item ids (line_items.id) from shopifyOrder.line_items
    const lineItemsById = {};
    shopifyOrder.line_items.forEach(item => {
      lineItemsById[item.id] = item;
    });

    // Find SKUs for matching refunded line items (refund_line_items)
    // Format SKUs into comma-separated list (i.e. SKU1, SKU2, ...)
    const refundedLineItemsSkus = refundPayload.refund_line_items
      .map(refundItem => {
        const match = lineItemsById[refundItem.line_item_id];
        return match ? match.sku : null;
      })
      .filter(Boolean)
      .join(",");
     
    // Add to response
    response.total_refund_amount = refundAmount;
    response.refunded_line_items_titles = refundedLineItemsTitles;
    response.refunded_line_items_total_quantity = refundedLineItemsTotalQuantity;
    response.refunded_line_items_skus = refundedLineItemsSkus;

    // Call the next step in this workflow
    // response will be the Variables Available from this step
    Mesa.output.next(response);
  };
})();
