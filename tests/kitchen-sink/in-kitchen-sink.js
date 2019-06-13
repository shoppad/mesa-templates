const Mesa = require('./vendor/Mesa1.js');

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
    
    const baseUrl = 'https://api.getmesa.com/v1/admin/dev-mesa';
    //const baseUrl = 'https://api.getmesa.com/staging/admin/dev-mesa';
    const apiKey = 'xHzLYbPh4EaGP7WUTNp0FaVcRfbiTi744IdRiC9k';

    // Our test payloads
    const data = {
      'hi': 'bye',
      'hello': 'goodbye',
    };
    const liquid = "hi-{{hi}}";

    Mesa.secret.set('api-key', apiKey);
    const options = {
      headers: {
        'x-api-key': Mesa.secret.get('api-key'),
      },
      debug: true,
    };
    let response = Mesa.request.get(`${baseUrl}/storage.json`, options);
    Mesa.log.info('request.get response', response);
    this.assert(JSON.stringify(response).indexOf('.json') !== -1, 'Testing Mesa.request.get(), Mesa.secret.set(), Mesa.secret.get()');

    Mesa.log.info('');
    payload = {
      "storage": {
        "name": "test",
        "value": Mesa.xml.encode(data),
      }
    }
    Mesa.request.post(`${baseUrl}/storage.json`, payload, options);
    response = Mesa.request.get(`${baseUrl}/storage/test.json`, options);
    Mesa.log.info('request.get response', response);
    this.assert(JSON.stringify(response).indexOf('<hi>bye') !== -1, 'Testing Mesa.request.post(), Mesa.xml.encode()');

    Mesa.log.info('', data);
    payload = {
      "storage": {
        "value": Mesa.csv.encode([data]),
      }
    }
    Mesa.request.put(`${baseUrl}/storage/test.json`, payload, options);
    response = Mesa.request.get(`${baseUrl}/storage/test.json`, options);
    Mesa.log.info('request.get response', response);
    this.assert(JSON.stringify(response).indexOf(',hello') !== -1, 'Testing Mesa.request.put(), Mesa.csv.encode()');

    Mesa.log.info('');
    response = Mesa.csv.decode(Mesa.csv.encode([data, data]));
    Mesa.log.info('csv.decoded()', response);
    this.assert(response[0].hi === 'bye', 'Testing Mesa.csv.encode(), Mesa.csv.decode()');

    Mesa.log.info('Testing Mesa.request.delete()');
    Mesa.request.delete(`${baseUrl}/storage/test.json`, options);

    Mesa.log.info('');
    response = Mesa.liquid.render(liquid, data);
    Mesa.log.info('rendered liquid', response);
    this.assert(response.indexOf('hi-bye') !== -1, 'Testing Mesa.liquid.render()');

    Mesa.log.info('');
    Mesa.log.info('Testing Mesa.email.send()');
    Mesa.email.send('jeff@theshoppad.com', 'MESA KITCHEN SINK', JSON.stringify(data));
    
    Mesa.log.info('');
    Mesa.log.info('Testing Mesa.vo.push()');
    Mesa.vo.push('out-kitchen-sink-vo', data);

    Mesa.log.info('');
    Mesa.log.info('Testing Mesa.output.send()');
    Mesa.output.send('out-kitchen-sink-ftp', Mesa.csv.encode([data, data]));
  }

  assert = (condition, message) => {
    if (!condition) {
      Mesa.log.error(`FAILED: ${message}`);
    }
    else {
      Mesa.log.info(`PASSED: ${message}`);
    }
  }

}
