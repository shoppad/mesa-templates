const Mesa = require('vendor/Mesa.js');
const ShopifyUtil = require('./ShopifyUtil.js');

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
    const vars = context.steps;

    let locations = ShopifyUtil.companyLocationsForCustomer(vars.shopify.id);

    Mesa.output.next(locations);
  }
}
