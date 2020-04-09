const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

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

    // Adjust `payload` here to alter data before we transform it.

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Adjust `output` here to alter data after we transform it.

    // Add our sale price to the output
    const saleProducts = JSON.parse(Mesa.storage.get('products.json'));
    const reduceOrReset = Mesa.storage.get('reduce_or_reset_price');
    saleProducts
      .forEach(product => {
        if (product.id == output.id) {
          output.variants = output.variants.map(variant => ({
            id: variant.id,
            price: reduceOrReset === 'reset' ? product.compare_at_price : product.price,
            compare_at_price: product.compare_at_price,
          }));
        }
      });

    Mesa.log.info('Sale priced product', output);

    const skipSendToShopify = Mesa.storage.get('skip_send_to_shopify_true_or_false');
    if (skipSendToShopify && skipSendToShopify != 'false') {
      const errorMessage = `Skipping send to Shopify, set Storage item "skip_send_to_shopify_true_or_false" to "false" to enable send.`;
      throw new Error(errorMessage);
    }

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
