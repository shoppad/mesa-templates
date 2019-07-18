const Mesa = require('./vendor/Mesa1.js');
const OpenWeatherMap = require('./vendor/OpenWeatherMap.js');

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
    
    // Log the raw response
    Mesa.log.info('OpenWeatherMap response', response);

    // Format the data in a name/value pair
    const weather = response.list.map(item => {
      const dateString = Mesa.date.format('D, M j Y', item.dt);
      return {
        name: `${dateString} Forecast`,
        value: `${Math.round(item.temp.min)} - ${Math.round(item.temp.max)}°F ${item.weather[0].main}`
      };
    });

    let noteAttributes = weather;
    noteAttributes.concat(payload.note_attributes ? payload.note_attributes : []);

    // Format the data to match Shopify's API schema
    const data = {
      "order": {
        "note_attributes": noteAttributes,
      }
    }
    
    // Log the formatted object
    Mesa.log.info('data', data);

    // Mark our output as complete and send the updated order data to Shopify
    Mesa.output.done(data, {'order_id': payload.id});
  }
}


