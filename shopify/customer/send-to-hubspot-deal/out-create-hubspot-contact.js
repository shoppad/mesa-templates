const Mesa = require('vendor/Mesa.js');
const Hubspot = require('vendor/Hubspot.js');
const Mapping = require('vendor/Mapping.js');

module.exports = new (class {
  script = payload => {
    const hubspot = new Hubspot(Mesa.secret.get('hubspot-hapi'));

    // First create the contact

    // Define processors for convert() - pass hubspot.structureOutgoingHubSpotData method to postProcess to stucture data into HubSpot format
    const processors = {
      preProcess: [],
      process: [],
      postProcess: [hubspot.structureOutgoingHubSpotData]
    };

    const shopifyHubSpotCustomerContactMap = JSON.parse(
      Mesa.storage.get('customer-contact-mapping.json')
    );

    // Map Shopify customer data to HubSpot data
    const postData = Mapping.convert(
      shopifyHubSpotCustomerContactMap,
      payload,
      'shopify',
      'hubspot',
      processors
    );

    Mesa.log.debug('HubSpot contact payload', postData);

    const contactResponse = hubspot.createContact(postData);

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
