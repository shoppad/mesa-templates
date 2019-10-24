const Mesa = require('vendor/Mesa.js');
const Hubspot = require('vendor/Hubspot.js');

module.exports = new (class {
  script = payload => {
    const hubspot = new Hubspot(Mesa.secret.get('hubspot-hapi'));

    // Initialize data for the hubspot deal
    let postData = {
      dealname: `${payload.first_name} ${payload.last_name}'s deal`,
      dealtype: Mesa.storage.get('hubspot-deal-type'),
      pipeline: Mesa.storage.get('hubspot-deal-pipeline'),
      dealstage: Mesa.storage.get('hubspot-deal-stage')
    };

    postData = hubspot.structureOutgoingHubSpotData(postData, 'name');

    postData.associations = {
      associatedVids: [payload.contact_id]
    };

    Mesa.log.debug('HubSpot deal payload', postData);

    const dealResponse = hubspot.createDeal(postData);

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
