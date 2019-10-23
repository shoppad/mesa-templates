const Mesa = require('vendor/Mesa.js');
const Mapping = require('vendor/Mapping.js');
const Hubspot = require('vendor/Hubspot.js');

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

    const hubspot = new Hubspot('hapi_key');

    // Define processors for convert()
    const processors = {
      preProcess: [hubspot.flattenHubspotProperties],
      process: [],
      postProcess: [this.wrapCustomerOutput]
    };

    const hubspotShopifyCustomerMap = JSON.parse(
      Mesa.storage.get('hubspot-shopify-customer-mapping.json')
    );

    Mesa.log.debug(
      'HubSpot to Shopify Customer mapping',
      hubspotShopifyCustomerMap
    );

    // Convert to Shopify contact
    const shopifyPayload = Mapping.convert(
      hubspotShopifyCustomerMap,
      payload,
      'hubspot',
      'shopify',
      processors
    );

    Mesa.log.debug('Shopify customer payload', shopifyPayload);

    // Post
    Mesa.output.done(shopifyPayload);
  };

  //
  // Processor functions, these are called from the Mapping utility's convert() method
  //
  /**
   * Wrap customer output for Shopify
   */
  wrapCustomerOutput = payload => {
    return { customer: payload };
  };
})();
