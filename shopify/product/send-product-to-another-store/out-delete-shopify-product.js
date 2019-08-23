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

    let productMap = JSON.parse(Mesa.storage.get('product-map.json'));
    let foreignProductID = productMap[payload.id];

    Shopify.delete('/admin/products/' + foreignProductID + '.json', {}, connectionObj);
  }
};
