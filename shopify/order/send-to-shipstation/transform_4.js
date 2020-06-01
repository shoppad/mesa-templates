const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');
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

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Get inventory information from util
    const fulfillmentTrackingUpdateData = Shopify.buildFulfillmentTrackingUpdate(
      payload.id, 
      payload.line_items[0].variant_id,
      {
        line_items: payload.line_items.map(item => ({
          id: item.id,
          quantity: Number(item.quantity),
        })),
        tracking_numbers: [ output.trackingNumber ],
        notify_customer: true
      }
    );

    // Adjust `output` here to alter data after we transform it.

    // We're done, call the next step!
    Mesa.output.next(fulfillmentTrackingUpdateData.fulfillment);
  }
}
