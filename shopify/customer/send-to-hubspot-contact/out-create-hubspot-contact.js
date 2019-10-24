const Mesa = require('vendor/Mesa.js');
const Hubspot = require('vendor/Hubspot.js');
const Mapping = require('vendor/Mapping.js');

module.exports = new (class {
  script = payload => {
    const hubspot = new Hubspot(Mesa.secret.get('hubspot-hapi'));

    // Define processors for convert() - pass this.structureOutgoingHubSpotData method to postProcess to stucture data into HubSpot format
    const processors = {
      preProcess: [],
      process: [],
      postProcess: [hubspot.structureOutgoingHubSpotData]
    };

    const hubspotShopifyCustomerMap = JSON.parse(
      Mesa.storage.get('shopify-hubspot-customer-mapping.json')
    );

    // Map Shopify customer data to HubSpot data
    const postData = Mapping.convert(
      hubspotShopifyCustomerMap,
      payload,
      'shopify',
      'hubspot',
      processors
    );

    Mesa.log.debug('HubSpot contact payload', postData);

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
