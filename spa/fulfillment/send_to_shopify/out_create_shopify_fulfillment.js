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

    // We try to get the first line_item to set the location id.
    const order = Shopify.get(`/admin/orders/${payload.params.order_id}.json`);
    if (!order.order.line_items[0].variant_id) {
      Mesa.log.error('Could not find order with a line item', {
        payload,
        order
      });
    }
    const variantId = order.order.line_items[0].variant_id;

    const inventoryData = Shopify.getVariantInventoryData(variantId)
    if (!inventoryData || !inventoryData.inventory_levels || !inventoryData.inventory_levels.length) {
      Mesa.log.error('Inventory level missing', {
        payload,
        inventoryData
      });
      return;
    }

    // Get the first available location
    const fulfillable = inventoryData.inventory_levels
      .filter(location => true)
      .reduce((acc, cur) => cur || acc, null);

    if (!fulfillable) {
      Mesa.log.error('No location available has available inventory', {
        payload,
        inventoryData
      });
      return;
    }

    payload.data.location_id = fulfillable.location_id;
    Mesa.log.info('Mesa.output.done', [payload.data, payload.params])
    Mesa.output.done(payload.data, payload.params);
  }
}
