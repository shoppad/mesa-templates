const Mesa = require('vendor/Mesa.js');
const Hubspot = require('vendor/Hubspot.js');
const Mapping = require('vendor/Mapping.js');
const ShopifyHubSpotCustomerMap = require('./shopify-hubspot-customer-map.js');

module.exports = new (class {
  script = payload => {
    const hubspot = new Hubspot(Mesa.secret.get('hubspot.hapi'));

    // Define processors for convert() - pass this.structureOutgoingHubSpotData method to postProcess to stucture data into HubSpot format
    const processors = {
      preProcess: [],
      process: [],
      postProcess: [hubspot.structureOutgoingHubSpotData]
    };

    // Map Shopify customer data to HubSpot data
    const postData = Mapping.convert(
      ShopifyHubSpotCustomerMap,
      payload,
      'shopify',
      'hubspot',
      processors
    );

    const response = hubspot.createContact(postData);

    // Optional logging
    if (response.error) {
      hubspot.logError(response, 'creating', 'Contact');
    } else {
      Mesa.log.info(
        'HubSpot contact created successfully with ID',
        response.vid
      );
    }
  };
})();
