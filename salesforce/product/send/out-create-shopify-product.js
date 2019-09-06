const Mesa = require('vendor/Mesa.js');
const Mapping = require('vendor/Mapping.js');
const ShopifySalesforceCustomerMap = require('./salesforce/product/send/salesforce-shopify-product-map.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   */
  script = (payload) => {
    // Decode payload
    const decoded = Mesa.xml.decode(payload);

    // Get lead from payload
    const product = decoded.soapenv_Body.notifications.Notification.sObject;

    // Define processors for convert()
    const processors = {
      preProcess: [ this.trimKeys ],
      postProcess: [ this.wrapProductOutput ],
    };

    // Convert to Shopify contact
    const shopifyPayload = Mapping.convert(ShopifySalesforceCustomerMap, product, 'salesforce', 'shopify', processors);

    // Post
    Mesa.output.done(shopifyPayload);
  }

  //
  // Processor functions, these are called from the Mapping utility's convert() method
  //

  /**
   * Remove 'sf_' prefix from keys
   */
  trimKeys = (payload) => {
    let response = {}; 

    Object.keys(payload).forEach(key => {
      const newKey = key.replace('sf_', '');
      response[newKey] = payload[key];
    });

    return response;
  }

  /**
   * Wrap customer output for Shopify
   */
  wrapProductOutput = (payload) => {
    return { product: payload };
  }
}
