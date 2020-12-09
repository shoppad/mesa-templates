const Mesa = require('vendor/Mesa.js');

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
    const salesforceProducts =
      context.steps['salesforce-query-multiple-product'];

    let lineItems = context.steps['shopify-order-created'].line_items;

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

    // We're done, call the next step!
    Mesa.output.next(newPayload);
  };
})();
