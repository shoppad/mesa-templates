const Mesa = require('vendor/Mesa.js');
const OpenWeatherMap = require('./vendor/OpenWeatherMap.js');
const Shopify = require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Add Weather to Orders
   * 
   * Use OpenWeatherMap to get the weather forecast at the destination address 
   * and add it to the order's note attributes
   *
   * @param {object} payload The Shopify order payload
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    // Get the API key from a secret with a key of "openweathermap-key"
    const key = Mesa.secret.get('openweathermap-key');

    // Create the Open Weather Map client using our API key
    const client = new OpenWeatherMap(key);

    // Get the destination address from the shipping address on the Shopify order
    const address = payload.shipping_address;

    // Query the OpenWeatherMap API and retrieve the weather forecast
    const response = client.getForecast(address.latitude, address.longitude);

    let debug = !!Mesa.storage.get('debug', false);

    if (debug) {
      // Log the raw response
      Mesa.log.info('OpenWeatherMap response', response);
    }

    // Format the data in a name/value pair
    const weather = response.list.map(item => {
      const dateString = Mesa.date.format('D, M j Y', item.dt);
      return {
        name: `${dateString} Forecast`,
        value: `${Math.round(item.temp.min)} - ${Math.round(item.temp.max)}°F ${item.weather[0].main}`
      };
    });

    const order = Shopify.get('/admin/orders/' + payload.id + '.json', {debug: debug});

    const noteAttributes = weather.concat(order.note_attributes ? order.note_attributes : []);

    // Format the data to match Shopify's API schema
    const data = {
      "order": {
        "note_attributes": noteAttributes,
      }
    };

    if (debug) {
      // Log the formatted object
      Mesa.log.info('data', data);
    }

    // Mark our output as complete and send the updated order data to Shopify
    Mesa.output.done(data, {'order_id': payload.id});
  }
};


