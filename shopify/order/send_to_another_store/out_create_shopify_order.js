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

    const connectionObj = {
      "host": Mesa.storage.get('store-host'),
      "username": Mesa.storage.get('store-key'),
      "password": Mesa.secret.get('store-password')
    };

    // We need to do some cleanup to prevent errors from the Shopify API call
    if (!payload.tags || !payload.tags.length) {
      delete payload.tags;
    }
    delete payload.source_name;

    // Taxes can be set on the line items, or on the order, but not both. We assume that it will be added to the line items.
    delete payload.tax_lines;

    let order = Shopify.post('/admin/orders.json', payload, {}, connectionObj);

    let orderMap = JSON.parse(Mesa.storage.get('order-map.json'));
    orderMap[payload.id] = order.order.id;

    Mesa.storage.set('order-map.json', JSON.stringify(orderMap));
  }
};
