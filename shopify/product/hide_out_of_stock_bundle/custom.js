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

    let upsellPayload = Shopify.get(`/admin/api/2021-07/products/${payload.upsell_product_id}.json`).product;
    const tagUpsellInStock = "upsell-in-stock";
    const productTags = payload.main_product_tags;

    if (productTags.includes(tagUpsellInStock) && upsellPayload.variants[0].inventory_quantity > 0) {
      // Do nothing. 
      Mesa.log.debug(`Already have the correct tag, skipping update.`);
    } else {
      let newTags = productTags.split(",").filter(item => item.trim() !== tagUpsellInStock).join(",");

      // Adding the upsell tag if needed
      if (upsellPayload.variants[0].inventory_quantity > 0) {
        newTags = `${newTags}, ${tagUpsellInStock}`;
      }

      // Let's continue only if there has been a change.
      if (productTags !== newTags) {
        // We're done, call the next step!
        Mesa.output.next({
          tags: newTags
        });
      } else {
        Mesa.log.debug(`No changes need it.`)
      }
    }
  }
}
