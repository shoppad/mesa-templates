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

        let product = Shopify.post('/admin/products.json', payload, {debug:false}, connectionObj);

        let productMap = Mesa.storage.get('shopify/products/sync-with-another-store/product-map');
        productMap = JSON.parse(productMap);
        productMap[payload.id.toString()] = product.product.id;

        JSON.stringify(productMap);
        Mesa.storage.set('shopify/products/sync-with-another-store/product-map', productMap);
    }
};
