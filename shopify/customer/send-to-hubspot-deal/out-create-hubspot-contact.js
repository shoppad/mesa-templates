const Mesa = require('vendor/Mesa.js');
const Hubspot = require('vendor/Hubspot.js');
const Mapping = require('vendor/Mapping.js');
const ShopifyHubSpotCustomerContactMap = require('./shopify-hubspot-customer-contact-map.js');
// const ShopifyHubSpotCustomerDealMap = require('./shopify-hubspot-customer-deal-map.js');

module.exports = new (class {
  script = payload => {
    Mesa.log.debug('out-create-hubspot-contact: payload', payload);

    const hubspot = new Hubspot(Mesa.secret.get('hubspot.hapi'));

    // First create the contact

    // Define processors for convert() - pass hubspot.structureOutgoingHubSpotData method to postProcess to stucture data into HubSpot format
    const processors = {
      preProcess: [],
      process: [],
      postProcess: [hubspot.structureOutgoingHubSpotData]
    };

    // Map Shopify customer data to HubSpot data
    const customerPostData = Mapping.convert(
      ShopifyHubSpotCustomerContactMap,
      payload,
      'shopify',
      'hubspot',
      processors
    );

    const contactResponse = hubspot.createContact(customerPostData);

    let contactId = 0;
    // Optional logging
    if (contactResponse.error || contactResponse.status === 'error') {
      // If customer has already been created, get the ID of existing contact here
      if (
        contactResponse.message === 'Contact already exists' &&
        contactResponse.identityProfile &&
        contactResponse.identityProfile.vid
      ) {
        contactId = contactResponse.identityProfile.vid;
        Mesa.log.debug('HubSpot contact already exists with ID', contactId);
      } else {
        // Error is for something else, cannot proceed with creating deal, so return here
        hubspot.logError(contactResponse, 'creating', 'Contact');
        return;
      }
    } else {
      Mesa.log.info(
        'HubSpot contact created successfully with ID',
        contactResponse.vid
      );

      contactId = contactResponse.vid;
    }

    // Now create the deal by calling the deal script
    payload.contact_id = contactId;
    Mesa.output.send('out-create-hubspot-deal', payload);
  };
})();
