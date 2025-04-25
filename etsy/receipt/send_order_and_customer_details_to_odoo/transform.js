const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');
const odooLocation = require('./odooLocation.js');
const decodeHtml = require('./decodeHtml.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    const order = context.steps['etsy'];

    // Log base info
    const logBase = {
      receipt_id: order.receipt_id,
      order_id: order.receipt_id,
    };

    Mesa.log.info('Processing Etsy order', logBase);

    // Alter the order data based on our transform rules
    const output = Transform.convert(context, order);

    Mesa.log.info('output.lineItems', output.lineItems);

    // Adjust `output` here to alter data after we transform it.

    /**
     * Helper to build out log
     */
    const getLog = (lineItem = {}, additional = {}) =>
      Object.assign(
        {},
        logBase,
        additional,
        lineItem ? { line_item_title: lineItem.title } : {}
      );

    // Encode Odoo country + state codes
    output.address.countryCode = odooLocation.getOdooCountry(
      output.address.country_code
    );

    const checkProvince =
      output.address.state &&
      output.address.state.match(/^[0-9\-a-z]+$/i) &&
      odooLocation.odooCountryHasProvinces(output.address.country_code);

    if (checkProvince) {
      output.address.stateCode = odooLocation.getOdooProvince(
        output.address.country_code,
        output.address.state
      );
    }

    if (
      !output.address.countryCode ||
      (checkProvince && !output.address.stateCode)
    ) {
      Mesa.log.error('Error data', getLog(false, { address: output.address }));
      throw new Error('Failed to get Odoo country or state code');
    }

    // Set up our product codes
    output.productCodeMap = {};
    output.productCodes = [];

    order.transactions.forEach((lineItem, index) => {
      // Make sure we have SKU
      if (!output.lineItems[index].default_code) {
        Mesa.log.error('Error data', getLog(false));
        throw new Error('Some line items are missing skus');
      }

      // Update our product code mapping
      output.productCodeMap[output.lineItems[index].default_code] =
        output.lineItems[index].default_code;
      output.productCodes.push(output.lineItems[index].default_code);

      // Decode name
      output.lineItems[index].name = decodeHtml(output.lineItems[index].name);
    });

    // Set total_tax_cost, subtotal, and grandtotal
    output.total_tax_cost = order.total_tax_cost.amount;
    output.subtotal = order.subtotal.amount;
    output.grandtotal = order.grandtotal.amount;

    Mesa.log.info('output', { output });
    delete output.lineItems[''];
    // Call next step
    Mesa.output.next(output);
  };
})();
