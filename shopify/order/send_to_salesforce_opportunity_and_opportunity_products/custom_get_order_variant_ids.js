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
    const vars = context.steps;

    // For storing payload
    let payload = {};

    // Get line items from Shopify order
    const lineItems = vars.shopify_order_created.line_items;

    // Create a list of variant IDs
    let variantIds = lineItems.map(lineItem => {
      return `'${lineItem.variant_id}'`;
    });

    // Add to response
    payload.variant_ids = variantIds;
    payload.variant_ids_csv = variantIds.join();

    // Call the next step in this workflow
    // payload will be the Variables Available from this step
    Mesa.output.next(payload);
  };
})();
