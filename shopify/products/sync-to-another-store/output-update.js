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
            "host": Mesa.storage.get('shopify/products/sync-with-another-store/host'),
            "username": Mesa.storage.get('shopify/products/sync-with-another-store/key'),
            "password": Mesa.secret.get('shopify/products/sync-with-another-store/password')
        };

        let productMap = Mesa.storage.get('shopify/products/sync-with-another-store/product-map');
        productMap = JSON.parse(productMap);
        let foreignProductID = productMap[payload.id];

        let product = Shopify.put('/admin/products/' + foreignProductID + '.json', payload, {debug:false}, connectionObj);

    }
};
