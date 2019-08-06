const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   */
  script = (payload) => {
    payload.forEach(function(order) {
      const response = Shopify.delete(`/admin/api/2019-07/draft_orders/${order.id}.json`);
      Mesa.log.warn('response', response);
      // @todo: figure out a way to get response headers
      // @todo: clearOne if 200
      // @todo: clearOne + log if 404 (order was most likely deleted outside of mesa)
    });
  }
}
