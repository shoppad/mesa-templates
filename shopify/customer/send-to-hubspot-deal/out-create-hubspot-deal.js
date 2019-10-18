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

    // Define processors for convert() - pass this.structureOutgoingHubSpotData method to postProcess to stucture data into HubSpot format
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

    // Now create the deal

    // Initial data here
    let dealPostData = {
      dealname: `${payload.first_name} ${payload.last_name}'s deal`,
      dealtype: Mesa.storage.get('hubspot_deal_deal_type'),
      pipeline: Mesa.storage.get('hubspot_deal_pipeline'),
      dealstage: Mesa.storage.get('hubspot_deal_deal_stage')
    };

    dealPostData = hubspot.structureOutgoingHubSpotData(dealPostData, 'name');

    dealPostData.associations = {
      associatedVids: [contactId]
    };

    Mesa.log.debug('deal params', dealPostData);

    const dealResponse = hubspot.createDeal(dealPostData);

    // Optional logging
    if (dealResponse.error) {
      hubspot.logError(dealResponse, 'creating', 'deal');
    } else {
      Mesa.log.info(
        'HubSpot deal created successfully with ID',
        dealResponse.dealId
      );
    }
  };
})();
