const Mesa = require('vendor/Mesa.js');
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

    // Make request to HubSpot, using the api key defined in Secrets and the prepared post data
    const options = [];
    const apiKey = Mesa.secret.get('hubspot.hapi');
    const basePath =
      'https://api.hubapi.com/contacts/v1/contact/?hapikey=' + apiKey;

    const response = Mesa.request.post(basePath, postData, options, true);

    // Optional logging
    if (response.errors) {
      Mesa.log.error('Error creating HubSpot contact:', response.errors);
    } else {
      Mesa.log.info(
        'HubSpot contact created sucessfully with ID',
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
