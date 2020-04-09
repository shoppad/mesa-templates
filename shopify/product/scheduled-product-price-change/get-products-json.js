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
    // Add your custom code here
    const output = {
      products: JSON.parse(Mesa.storage.get('products.json'))
    };
    
    Mesa.log.info('Processing sale products', output);

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
