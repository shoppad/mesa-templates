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
    // Adjust `payload` here to alter data before we transform it.

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Adjust `output` here to alter data after we transform it.
    const shopifyOrders = context.steps['shopify_order'];

    // Run through orders
    if (shopifyOrders && shopifyOrders.length) {
      const productsCount = {};

      payload.forEach((order) => {
        // Orders Total
        output.orders_total = (output.orders_total || 0) + 1;

        // Orders over $100
        if (order.total_price > 100) {
          output.orders_over_100 = (output.orders_over_100 || 0) + 1;
        }

        // Orders paid
        if (order.financial_status === 'paid') {
          output.orders_paid = (output.orders_paid || 0) + 1;
        }

        // Orders pending
        if (order.financial_status === 'pending') {
          output.orders_pending = (output.orders_pending || 0) + 1;
        }

        // Orders fulfilled
        if (order.fulfillment_status === 'fulfilled') {
          output.orders_fulfilled = (output.orders_fulfilled || 0) + 1;
        }

        // Count popular products
        order.line_items.forEach((lineItem) => {
          productsCount[lineItem.title] =
            (productsCount[lineItem.title] || 0) + 1;
        });
      });

      // Sort the products by count, set popular
      const productTitles = Object.keys(productsCount);
      if (productTitles.length) {
        const orderedProducts = productTitles
          .map((key) => ({
            title: key,
            count: productsCount[key],
          }))
          .sort((a, b) => {
            if (b.count < a.count) {
              return -1;
            }
            if (a.count < b.count) {
              return 1;
            }
            return 0;
          });

        // All products that match the most popular count
        const mostSold = orderedProducts[0].count;
        output.most_popular_product = orderedProducts
          .filter((product) => product.count == mostSold)
          .map((product) => product.title)
          .join(', ');
      }
    }

    // Add the workflow id
    output.workflow_id = context.trigger.automation;

    // We're done, call the next step!
    Mesa.output.next(output);
  };
})();
