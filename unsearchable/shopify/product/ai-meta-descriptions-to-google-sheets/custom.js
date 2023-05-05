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

    // Add your custom code here

    Mesa.log.info("payload: ", payload.body_html);
    
    payload.body_text = payload.body_html.replace(/<\/?[^>]+>/gi, '');
    Mesa.log.info("body text: ", payload.body_text);

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
