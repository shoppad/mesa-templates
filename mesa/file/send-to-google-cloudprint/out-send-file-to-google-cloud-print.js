const Mesa = require('vendor/Mesa.js');
const Google = require('vendor/Google.js');

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

    const ticket = payload.ticket ? payload.ticket : Mesa.storage.get('google-cloudprint-ticket.json', {
      version: '1.0',
      print: {},
    });

    const data = {
      printerid: Mesa.storage.get('printerid'),
      title: `Printing ${payload.file} from Mesa`,
      ticket: JSON.stringify(ticket),
      content: payload.file,
      contentType: 'url',
    };

    // Google Print uses x-www-form-urlencoded, which is a post with querystring-like parameters
    const params = Object.keys(data).reduce(function(a, key){
      a.push(key+'='+encodeURIComponent(data[key]));
      return a;
    },[]).join('&');

    const url = `https://www.google.com/cloudprint/submit`;
    let options = {};
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const google = new Google();
    const response = google.request.post(url, params, options);

    if (!response.success) {
      throw response.message;
    }
  }
}
