const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');
const Mapping = require('vendor/Mapping.js');
const ShopifySalesforceCustomerMap = require('./salesforce/leads/create-shopify-customer/shopify-salesforce-customer-map.js');

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

    // Get lead from payload
    const lead = decoded.soapenv_Body.notifications.Notification.sObject;

    // Define processors for convert()
    const processors = {
      preProcess: [ this.trimKeys ],
      process: [ this.splitAddress ],
      postProcess: [ this.wrapCustomerOutput ],
    };

    // Convert to Shopify contact
    const shopifyPayload = Mapping.convert(ShopifySalesforceCustomerMap, lead, 'salesforce', 'shopify', processors);

    Mesa.log.info('shopifyPayload', shopifyPayload);
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
   * Split address field into two seperate fields
   */
  splitAddress = (fieldKey, inputValue) => {
    if (fieldKey === 'address1') {
      const address = inputValue.split("\n");
      Mesa.log.info('address', address);
      return address[0];
    } else if (fieldKey === 'address2') {
      const address = inputValue.split("\n");
      Mesa.log.info('address1', address[1]);
      return address[1];
    } else {
      return inputValue;
    }
  }
}
