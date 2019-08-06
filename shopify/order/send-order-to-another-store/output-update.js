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
            "host": Mesa.storage.get('shopify/order/send-order-to-another-store/host'),
            "username": Mesa.storage.get('shopify/order/send-order-to-another-store/key'),
            "password": Mesa.secret.get('shopify/order/send-order-to-another-store/password')
        };

        let orderMap = Mesa.storage.get('shopify/order/send-order-to-another-store/order-map.json');
        let foreignOrderID = orderMap[payload.id];

        Shopify.put('/admin/orders/' + foreignOrderID + '.json', payload, {debug:false}, connectionObj);

    }
};
