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
    Mesa.log.info("payload", payload);

    let text = "";

    // Add your custom code here
    for (let product of payload.products) {
      // strip html
      let description = product.body_html.replace(/<[^>]*>/g, '');
      text += product.title + "\n" + description + "\n\n";
    }    

    let newPayload = {};
    newPayload.text = text;
    Mesa.output.next(newPayload);
  }
}
