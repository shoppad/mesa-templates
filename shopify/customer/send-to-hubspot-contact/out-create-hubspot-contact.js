const Mesa = require('vendor/Mesa.js');
const Hubspot = require('vendor/Hubspot.js');
const Mapping = require('vendor/Mapping.js');
const ShopifyHubSpotCustomerMap = require('./shopify-hubspot-customer-map.js');

module.exports = new (class {
  script = payload => {
    Mesa.log.debug('out-create-hubspot-contact: payload', payload);

    // Define processors for convert() - pass this.structureOutgoingHubSpotData method to postProcess to stucture data into HubSpot format
    const processors = {
      preProcess: [],
      process: [],
      postProcess: [this.structureOutgoingHubSpotData]
    };

    // Map Shopify customer data to HubSpot data
    const postData = Mapping.convert(
      ShopifyHubSpotCustomerMap,
      payload,
      'shopify',
      'hubspot',
      processors
    );

    const hubspot = new Hubspot(Mesa.secret.get('hubspot.hapi'));

    const response = hubspot.createContact(postData);

    // Optional logging
    if (response.error) {
      Mesa.log.error('Error creating HubSpot contact:', [
        response.error,
        response.errors ? { Errors: response.errors } : []
      ]);
    } else {
      Mesa.log.info(
        'HubSpot contact created successfully with ID',
        response.vid
      );
    }
  };

  /**
   * Stuctures payload to match required schema for posting to HubSpot
   *
   * @example
   * // For this input
   * {
   *   'firstname': 'John',
   *   'lastname': 'Doe',
   * }
   *
   * // Method will return
   * {
   *   'properties': [
   *     {
   *       'property': 'firstname',
   *       'value': 'John',
   *     },
   *     {
   *       'property': 'lastname',
   *       'value': 'Farr',
   *     },
   *   ]
   * }
   *
   * @param payload
   * @returns {*}
   */
  structureOutgoingHubSpotData = payload => {
    let hubSpotProperties = [];

    Object.keys(payload).forEach(key => {
      hubSpotProperties.push({
        property: key,
        value: payload[key]
      });
    });

    return {
      properties: hubSpotProperties
    };
  };
})();
