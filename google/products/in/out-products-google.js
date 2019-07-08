const Mesa = require("vendor/Mesa.js");
const Shopify = require("vendor/Shopify.js");

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
    // Updating product title in Shopify.
    let outputPayload = Shopify.put(
      `/admin/api/2019-04/products/${payload[1][0]}.json`,
      {
        product: {
          id: payload[1][0],
          title: payload[1][3]
        }
      }
    );
    Mesa.log.info("outputPayload", outputPayload);
  };
}();
