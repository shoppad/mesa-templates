const Mesa = require("vendor/Mesa.js");
const Shopify = require("vendor/Shopify.js");
const Google = require("vendor/Google.js");

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   *
   * Payload Example:
   *
   *  product_id,   variant_id,    price, title
   *  344241831971, 4538718715939, 10,    Best Product
   */
  script = (payload, context) => {
    let outputPayload = {};
    let updatedProducts = [];
    const headerId = 0;
    // Initliazing Google Class.
    let google = new Google(
      payload.google.init.grandType,
      payload.google.init.secretKeys
    );

    // Saving header.
    google.sheets.saveHeaders(payload.google.sheets.payload[headerId]);

    // Updating product title in Shopify.
    payload.google.sheets.payload.forEach((e, i) => {
      if (i === headerId) {
        return;
      }

      let productId = google.sheets.getRowValue(e, "product_id");
      try {
        outputPayload = Shopify.put(
          `/admin/api/2019-04/products/${productId}.json`,
          {
            product: {
              id: productId,
              title: google.sheets.getRowValue(e, "title")
            }
          }
        );
      } catch (e) {
        Mesa.log.error("Failed to update product", e.getMessage());
      }
    });

    Mesa.log.info("Updated Products", updatedProducts);
  };
}();
