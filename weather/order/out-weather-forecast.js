const Mesa = require('./vendor/Mesa1.js');
const OpenWeatherMap = require('./vendor/OpenWeatherMap.js');

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
    let params = {
      order_id: payload.order_id
    };

    // Get weather forecast from OpenWeatherMap
    const key = Mesa.secret.get('openweathermap-key');
    const address = payload.shipping_address;
    const client = new OpenWeatherMap(key);
    const response = client.getForecast(address.latitude, address.longitude);
    Mesa.log.info('OpenWeatherMap response', response);

    const weather = response.list.map(item => {
      const dateString = Mesa.date.format('D, M j Y', item.dt);
      return {
        name: `${dateString} Forecast`,
        value: `${Math.round(item.temp.min)} - ${Math.round(item.temp.max)}°F ${item.weather[0].main}`
      };
    });

    let noteAttributes = weather;
    noteAttributes.concat(payload.note_attributes ? payload.note_attributes : []);

    const data = {
      "order": {
        "note_attributes": noteAttributes,
      }
    }
    Mesa.log.info('data', data);

    Mesa.output.done(data, {'order_id': payload.id});
  }
}


