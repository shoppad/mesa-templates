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

    // Loop through transactions on the refund, and total up the refund amount
    const refundPayload = vars.shopify;
    let refundAmount = 0;
    refundPayload.transactions.forEach(transaction => {
      refundAmount -= transaction.amount;
    });
     
    // Add to response
    response.total_refund_amount = refundAmount;

    // Call the next step in this workflow
    // response will be the Variables Available from this step
    Mesa.output.next(response);
  };
})();
