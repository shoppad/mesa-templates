const Mesa = require('vendor/Mesa1.js');
const Shopify = require('vendor/Shopify.js');
const Mapping = require('vendor/Mapping.js');
const ShopifySalesforceCustomerMap = require('./salesforce/maps/shopify-salesforce-customer-map.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload) => {
    // Decode payload
    const decoded = Mesa.xml.decode(payload);

    // Get contact from payload
    const contact = decoded.soapenv_Body.notifications.Notification.sObject;

    // Get Shopify customer ID
    const shopifyCustomerId = contact['sf_ShopifyCustomerID__c'];

    // Define processors for convert()
    const processors = {
      preProcess: [ this.trimKeys ],
      process: [ this.updateName ],
      postProcess: [ this.wrapCustomerOutput ],
    };

    const shopifyPayload = Mapping.convert(ShopifySalesforceCustomerMap, contact, 'salesforce', 'shopify', processors);

    const response = Shopify.put(`/admin/api/2019-04/customers/${shopifyCustomerId}.json`, shopifyPayload, {
      debug: true,
      skipJsonWrap: true,
    });

    Mesa.log.info('response', response);
  }

  //
  // Processor functions, these are called from the Mapping utility's convert() method
  //

  /**
   * Remove 'sf_' prefix from keys
   */
  trimKeys = (payload) => {
    let response = {}; 

    Object.keys(payload).forEach(key => {
      const newKey = key.replace('sf_', '');
      response[newKey] = payload[key];
    });

    return response;
  }

  /**
   * Wrap customer output for Shopify
   */
  wrapCustomerOutput = (payload) => {
    return { customer: payload };
  }

  /**
   * Update user's name
   */
  updateName = (fieldKey, inputValue) => {
    if (fieldKey === 'first_name' && !inputValue.includes('Mr. ')) {
      return 'Mr. ' + inputValue; 
    } else {
      return inputValue;
    }
  }
}
