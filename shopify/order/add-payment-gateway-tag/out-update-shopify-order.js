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
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    let debug = Mesa.storage.get('debug', false);
    debug = !!debug;

    const order = Shopify.get('/admin/orders/' + payload.id + '.json', {debug: debug});

    if (debug) {
      Mesa.log.info('Order:', order);
    }

    const tags = order.tags ? order.tags + "," + payload.gateway : payload.gateway;

    const data = {
      order: {
        tags: tags
      }
    };

    Mesa.output.done(data, { order_id: payload.id });
  }
};
