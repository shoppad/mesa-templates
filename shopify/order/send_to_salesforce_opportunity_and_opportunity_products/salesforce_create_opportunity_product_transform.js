const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

/**
 * Minimum schema version required to enable object preservation.
 * When enabled, tokens that resolve to objects/arrays will be extracted
 * directly (bypassing Liquid) to preserve their structure.
 */
const OBJECT_PRESERVATION_MIN_SCHEMA = 4;

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
    const vars = context.steps;
    const currentItem = vars.loop;

    // Enable object preservation for schema >= 4
    const schemaVersion = context.trigger && context.trigger.schema ? context.trigger.schema : 0;
    Transform.enableObjectPreservation = schemaVersion >= OBJECT_PRESERVATION_MIN_SCHEMA;

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Reset to default after processing
    Transform.enableObjectPreservation = false;

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
  };
})();
