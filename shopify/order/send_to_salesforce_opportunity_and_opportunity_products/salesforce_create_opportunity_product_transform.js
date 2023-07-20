const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

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

    // Adjust `payload` here to alter data before we transform it.
    const currentItem = context.steps.loop;

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Adjust `output` here to alter data after we transform it.
    // Add discounts
    let totalDiscounts = parseFloat(currentItem.total_discount_set.shop_money.amount);

    if (currentItem.discount_allocations && currentItem.discount_allocations) {
      totalDiscounts = currentItem.discount_allocations.reduce((a, {amount}) => a + parseFloat(amount), 0);
    }

    if (totalDiscounts && totalDiscounts > 0) {
      // Get total price for line item (quantity * unit price, then divide by discount to get percentage)
      output['Discount'] = parseFloat(totalDiscounts / (output.UnitPrice * output.Quantity) * 100);
    }

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
