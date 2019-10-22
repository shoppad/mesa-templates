const Mesa = require('vendor/Mesa.js');
const Hubspot = require('vendor/Hubspot.js');
const Mapping = require('vendor/Mapping.js');
// const ShopifyHubSpotCustomerDealMap = require('./shopify-hubspot-customer-deal-map.js');

module.exports = new (class {
  script = payload => {
    Mesa.log.debug('out-create-hubspot-deal: payload', payload);

    const hubspot = new Hubspot(Mesa.secret.get('hubspot.hapi'));

    // Initialize data for the hubspot deal
    let dealPostData = {
      dealname: `${payload.first_name} ${payload.last_name}'s deal`,
      dealtype: Mesa.storage.get('hubspot_deal_deal_type'),
      pipeline: Mesa.storage.get('hubspot_deal_pipeline'),
      dealstage: Mesa.storage.get('hubspot_deal_deal_stage')
    };

    dealPostData = hubspot.structureOutgoingHubSpotData(dealPostData, 'name');

    dealPostData.associations = {
      associatedVids: [payload.contact_id]
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
