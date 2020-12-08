const Mesa = require('vendor/Mesa.js');
const Darksky = require('./vendor/Darksky.js');
const Shopify = require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Add Weather to Orders
   * 
   * Use Dark Sky to get the weather forecast at the destination address 
   * and add it to the order's note attributes
   *
   * @param {object} payload The Shopify order payload
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    // Get the API key from a secret with a key of "darksky-key"
    const key = Mesa.secret.get('darksky-key');

    // Create the Dark Sky client using our API key
    const client = new Darksky(key);

    // Get the destination address from the shipping address on the Shopify order
    const address = payload.shipping_address;

    // Query the Dark Sky API and retrieve the weather forecast
    const response = client.getForecast(address.latitude, address.longitude);

    // Format the data in a name/value pair
    const weather = response.daily.data.map(item => {
      const dateString = Mesa.date.format('D, M j Y', item.time);
      return {
        name: `${dateString} Forecast`,
        value: `${Math.round(item.temperatureLow)} - ${Math.round(item.temperatureHigh)}°F ${item.summary}`
      };
    });

    const order = Shopify.get('/admin/orders/' + payload.id + '.json');

    const noteAttributes = weather.concat(order.note_attributes ? order.note_attributes : []);

    // Format the data to match Shopify's API schema
    const data = {
      "order": {
        "note_attributes": noteAttributes,
      }
    };

    // Log the formatted object
    Mesa.log.debug('data', data);

    // Mark our output as complete and send the updated order data to Shopify
    Mesa.output.done(data, {'order_id': payload.id});
  }
};


