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

    Mesa.output.done({
      tracking_number: payload.shipment.tracking_number,
      tracking_company: payload.shipment.carrier,
    }, {
      order_id: payload.fulfillment.order_id,
      fulfillmen_id: payload.fulfillment.id,
    })
  }
}
