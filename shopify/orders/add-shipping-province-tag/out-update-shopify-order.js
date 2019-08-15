const Mesa = require('vendor/Mesa.js');

/**
 * Tag order with state or province
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    // shipping_address won't be set on orders that do not require shipping
    if ('shipping_address' in payload === false || 'province' in payload.shipping_address === false) {
      return;
    }

    const tags = payload.tags + ',' + payload.shipping_address.province;
    
    const data = {
      "order": {
        "tags": tags
      }
    };

    Mesa.output.done(data, {'order_id': payload.id});
  }
};
