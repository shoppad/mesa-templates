const Mesa = require("vendor/Mesa.js");
const Shopify = require("vendor/Shopify.js");
// const Shopify = require('vendor/Shopify.js');

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

    // Getting items without shipment.
    let items = payload.line_items.filter(
      item => !item.requires_shipping
    );

    // Getting the first location id.
    let locationId = Shopify.get(
      `admin/api/2019-07/locations.json`
    ).locations.reduce((acc, cur) => acc || cur, null).id;

    // Updating fulfilment.
    Mesa.output.done(
      {
        fulfillment: {
          location_id: locationId,
          notify_customer: false,
          status: "success",
          line_items: items.map(item => {
            return { id: item.id };
          })
        }
      },
      { order_id: payload.id }
    );
  };
}();
