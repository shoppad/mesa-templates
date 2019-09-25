const Mesa = require('vendor/Mesa.js');
const Shiphawk = require('vendor/Shiphawk.js');

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

    // Your code goes here

    const shiphawk = new Shiphawk(Mesa.storage.get('shophawk-environment'), Mesa.secret.get('shiphawk-key'));

    let grams = 0;
    let totalValue = 0;
    let destination = shiphawk.sanitizeAddress(payload.destination, payload.email, payload.phone);
    let origin;
    payload.line_items.forEach(function(lineItem) {
      grams += lineItem.grams;
      totalValue += parseFloat(lineItem.price);
      origin = shiphawk.sanitizeAddress(lineItem.origin_location);
    });
    const pounds = grams * 0.00220462;

    const items = [
      {
        "type": "parcel",
        "weight": pounds,
        // Optionally set the package dimensions
        //"length": "10",
        //"width" : "10",
        //"height": "11",
        "value": totalValue,
      }
    ]

    const rates = shiphawk.createRateRequest({
      items: items,
      origin_address: {zip: origin.zip},
      destination_address: {zip: destination.zip},
    });

    if (!rates || !rates.rates) {
      throw 'ShipHawk did not return any rates for this parcel';
    }

    // Here you can adjust the logic to select the appropriate rate for your use case.
    // We just select the first rate returned, which is typically the cheapest
    const rate = rates.rates[0];

    const shipment = shiphawk.createShipment({
      rate_id: rate.id,
      origin_address: origin,
      destination_address: destination,
      order_id: payload.order_id,
      order_number: payload.name,
    });

    if (!shipment.label_url) {
      throw 'ShipHawk did not return a shipping label';
    }

    Mesa.output.send('out-update-shopify-order-notes', {
      shipment: shipment,
      fulfillment: payload,
    });

    Mesa.output.send('out-update-shopify-fulfillment', {
      shipment: shipment,
      fulfillment: payload,
    });

    // If the callback storage is set, we trigger another Automation (for example print with Google Cloud Print)
    const callback = Mesa.storage.get('callback', false);
    if (callback) {
      Mesa.automation.send(callback, {
        shipment: shipment,
        fulfillment: payload,
        file: shipment.label_url,
      });
    }

  }
}
