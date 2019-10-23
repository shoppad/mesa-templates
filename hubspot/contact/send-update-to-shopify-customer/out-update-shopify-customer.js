const Mesa = require('vendor/Mesa.js');
const Mapping = require('vendor/Mapping.js');
const HubspotShopifyCustomerMap = require('hubspot-shopify-customer-map.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   */
  script = payload => {
    // Decode payload
    Mesa.log.debug('payload', payload);

    // Define processors for convert()
    const processors = {
      preProcess: [this.flattenHubspotProperties],
      process: [],
      postProcess: [this.wrapCustomerOutput]
    };

    // Convert to Shopify contact
    const shopifyPayload = Mapping.convert(
      HubspotShopifyCustomerMap,
      payload,
      'hubspot',
      'shopify',
      processors
    );

    // Post
    Mesa.output.done(shopifyPayload);
  };

  //
  // Processor functions, these are called from the Mapping utility's convert() method
  //
  /**
   * Flatten hubspot data
   */
  flattenHubspotProperties = payload => {
    let data = {};

    if (payload.properties) {
      Object.keys(payload.properties).forEach(key => {
        data[key] = payload.properties[key].value;
      });
    }

    return data;
  };

  /**
   * Wrap customer output for Shopify
   */
  wrapCustomerOutput = payload => {
    return { customer: payload };
  };
})();
