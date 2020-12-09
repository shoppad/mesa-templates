const Mesa = require('vendor/Mesa.js');

/**
 * 
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    const output = payload;
    const baseUrl = 'https://api.getmesa.com/v1/admin/dev-mesa';
    const httpBaseUrl = 'https://httpbin.org';
    //const baseUrl = 'https://api.getmesa.com/staging/admin/dev-mesa';

        // Our test payloads
    const data = {
      'hi': 'bye',
      'hello': 'goodbye',
    };
    const liquid = "hi-{{hi}}";

  

    // Testing Secrets
    const secretKey = 'test-kitchen-sink-test-secret';
    const secretValue = 'test';

    Mesa.secret.set(secretKey, secretValue);
    this.assert(Mesa.secret.get(secretKey) === secretValue, 'Testing Mesa.secret.set(), Mesa.secret.get()');
    Mesa.secret.set(secretKey, '');
    Mesa.log.info('');

    // Testing Request 
    const options = {
      headers: {
        'x-api-key': Mesa.secret.get('test-api-key'),
      },
      debug: true,
    };
    let response = Mesa.request.get(`${baseUrl}/storage.json`, options);
    Mesa.log.info('request.get response', response);
    this.assert(JSON.stringify(response).indexOf('.json') !== -1, 'Testing Mesa.request.get()');
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
    this.assert(JSON.stringify(response).indexOf('bye,') !== -1, 'Testing Mesa.request.get()');

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
    Mesa.email.send(output.email, 'MESA KITCHEN SINK', JSON.stringify(data), 'contact@theshoppad.net');

    Mesa.log.info('');
    Mesa.log.info('Testing Mesa.vo.push()');

    Mesa.log.info('');
    Mesa.log.info('Testing Mesa.output.send()');    

    // We're done, call the next step!
    Mesa.output.next(output);
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
