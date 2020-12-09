const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');

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

    // Prepare `notes_attributes` for shopify
    Mesa.log.debug('Calling shopify to get the latest order note_attributes');
    const order = Shopify.get(`admin/orders/${payload.fulfillment.order_id}.json`);
    let noteAttributes = order.order.note_attributes;

    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: `shiphawk_label_${payload.fulfillment.name}`,
      value: payload.shipment.label_url,
    });

    Mesa.log.debug('Saving Shopify notes_attributes', noteAttributes);
    const shopifyPayload = {
      order: {
        note_attributes: noteAttributes,
      }
    };
    Mesa.output.done(shopifyPayload, {order_id: payload.fulfillment.order_id});
  }
}
