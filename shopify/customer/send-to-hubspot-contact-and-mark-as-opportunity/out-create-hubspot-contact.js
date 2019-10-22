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

    // Add lifecyclestage to incoming payload. There is an entry in ShopifyHubSpotCustomerMap to ensure this outputs to HubSpot data
    payload.lifecyclestage = 'opportunity';

    // Map Shopify customer data to HubSpot data
    let postData = Mapping.convert(
      ShopifyHubSpotCustomerMap,
      payload,
      'shopify',
      'hubspot',
      processors
    );

    const response = hubspot.createContact(postData);

    // Optional logging
    if (response.error) {
      hubspot.logError(contactResponse, 'creating', 'Contact');
    } else {
      Mesa.log.info(
        'HubSpot contact created successfully with ID',
        response.vid
      );
    }
  };
})();
