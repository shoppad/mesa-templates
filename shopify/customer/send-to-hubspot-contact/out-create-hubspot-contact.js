const Mesa = require('vendor/Mesa.js');
const Mapping = require('vendor/Mapping.js');
const ShopifyHubspotCustomerMap = require('./shopify-hubspot-customer-map.js');

module.exports = new (class {
  script = payload => {
    Mesa.log.debug('out-create-hubspot-contact: payload', payload);

    // @TODO map Shopify customer data to HubSpot data (use the mapping spreadsheet)
    // @TODO work out how to map to hubspot fields as they're embedded?
    const postData = Mapping.convert(
      ShopifyHubspotCustomerMap,
      payload,
      'shopify',
      'hubspot'
    );

    // @TODO use Mesa.request.post to post hubspot data, using HAPI
    const options = [];
    const basePath = '';

    const response = Mesa.request.post(basePath, postData, options, true);

    Mesa.log.debug('hubspotContact', response);
  };
})();
