const Mesa = require('vendor/Mesa.js');
const Hubspot = require('vendor/Hubspot.js');
const Mapping = require('vendor/Mapping.js');
const ShopifyHubSpotDraftOrderDealMap = require('./shopify-hubspot-draft-order-deal-map.js');
// const ShopifyHubSpotCustomerDealMap = require('./shopify-hubspot-customer-deal-map.js');

module.exports = new (class {
  script = payload => {
    const hubspot = new Hubspot(Mesa.secret.get('hubspot.hapi'));

    // Check if hubspot contact exists, pass ID to out-create-hubspot-deal if available
    const contactResponse = hubspot.getContactByEmail(payload.email);

    // Check if a contact was found
    if (contactResponse.error || contactResponse.status === 'error') {
      if (
        !contactResponse.category ||
        contactResponse.category !== 'OBJECT_NOT_FOUND'
      ) {
        // Error encountered, log error and stop execution
        hubspot.logError(contactResponse, 'finding', 'Contact');
        return;
      }
      // Contact was not found with the provided email address, check deal should still be craeted
      else if (
        Mesa.storage.get('hubspot_create_deal_without_contact') === 'true'
      ) {
        Mesa.log.info(
          `No contact found for email ${payload.email}, hubspot_create_deal_without_contact is true, will create deal without contact`
        );
      } else {
        Mesa.log.error(
          `No contact found for email ${payload.email}, hubspot_create_deal_without_contact is not true, will not create deal`
        );
        return;
      }
    }

    // Include additional data in payload
    const additionalData = {
      dealname: `Shopify draft order ${payload.name}`,
      dealtype: Mesa.storage.get('hubspot_deal_deal_type'),
      pipeline: Mesa.storage.get('hubspot_deal_pipeline'),
      dealstage: Mesa.storage.get('hubspot_deal_deal_stage')
    };

    payload = { ...payload, ...additionalData };

    const processors = {
      preProcess: [],
      process: [hubspot.convertShopifyDateToTimestamp],
      postProcess: [this.structureOutgoingHubSpotDataWithNameProperty]
    };

    // Map Shopify order data to HubSpot data
    const dealPostData = Mapping.convert(
      ShopifyHubSpotDraftOrderDealMap,
      payload,
      'shopify',
      'hubspot',
      processors
    );

    // Add contact ID if available
    if (contactResponse.vid) {
      dealPostData.associations = {
        associatedVids: [contactResponse.vid]
      };
    }

    // Now create the deal
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

  /**
   * Wraps Hubspot.structureOutgoingHubSpotData() method by passing 'name' as the property value
   *
   * @param {object} payload
   * @return {object}
   */
  structureOutgoingHubSpotDataWithNameProperty = payload => {
    const hubspot = new Hubspot(Mesa.secret.get('hubspot.hapi'));
    return hubspot.structureOutgoingHubSpotData(payload, 'name');
  };
})();
