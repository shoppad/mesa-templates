const Mesa = require('vendor/Mesa.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    // Your code goes here
    Mesa.log.debug('Store Information', payload);
    Mesa.output.send('out-shopify-customer-update', payload);
  };
})();
