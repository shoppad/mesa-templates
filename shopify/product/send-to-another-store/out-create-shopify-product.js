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

    let product = Shopify.post('/admin/products.json', payload, {}, connectionObj);

    let productMap = JSON.parse(Mesa.storage.get('product-map.json'));
    productMap[payload.id] = product.product.id;

    Mesa.storage.set('product-map.json', JSON.stringify(productMap));
  }
};
