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

    const salesforceProducts =
      vars.salesforce_query_multiple_product;

    let lineItems = vars.shopify_order_created.line_items;

    lineItems.forEach((lineItem, key) => {
      let salesforceProduct = salesforceProducts.filter(
        product =>
        product.Shopify_Variant_ID__c == lineItem.variant_id
      );

      if (salesforceProduct && salesforceProduct.length > 0) {
        lineItems[key]['salesforce_product_id'] = salesforceProduct[0].Id;
      }
    });

    const newPayload = {};

    newPayload.line_items = lineItems;

    // Call the next step in this workflow
    // newPayload will be the Variables Available from this step
    Mesa.output.next(newPayload);
  };
})();
