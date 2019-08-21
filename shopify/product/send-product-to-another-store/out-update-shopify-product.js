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

        // Delete the variants to avoid a Shopify id mismatch error. In the future we may want to do more with this
        delete payload.variants;

        Shopify.put('/admin/products/' + foreignProductID + '.json', payload, {debug:true}, connectionObj);

    }
};
