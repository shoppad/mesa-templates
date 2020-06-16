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
    // Add your custom code here
    const lineItems = context.steps['shopify-order-created'].line_items;

    let variantIds = lineItems.map(lineItem => {
      return `'${lineItem.variant_id}'`;
    });

    
    payload.variant_ids = variantIds;
    payload.variant_ids_csv = variantIds.join();

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
