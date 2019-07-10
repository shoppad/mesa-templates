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

    // Check if customer with same email address alreadys exists in Shopify
    const response = Shopify.get(`/admin/api/2019-04/customers/search.json?query=${shopifyPayload['customer']['email']}`);
    const customers = response['customers'];

    // Update or create the customer in Shopify
    if (customers.length === 0) {
      // Add tags to customer
      shopifyPayload['customer']['tags'] = 'salesforceLeadConverted,salesforceIsNewCustomer';

      // POST
      Shopify.post('/admin/api/2019-04/customers.json', shopifyPayload, {
        skipJsonWrap: true,
      });
    } else if (customers.length === 1 && customers[0]['email'] === shopifyPayload['customer']['email']) {
      const customer = customers[0];

      // Add tags to customer
      shopifyPayload['customer']['tags'] = customer['tags']
        ? response['customers'][0]['tags'].concat(',salesforceLeadConverted,salesforceIsExistingCustomer')
        : 'salesforceLeadConverted,salesforceIsExistingCustomer';

      // PUT
      Shopify.put(`/admin/api/2019-04/customers/${customer['id']}.json`, shopifyPayload, {
        skipJsonWrap: true,
      });
    } else {
      Mesa.log.warn('Multiple customers found when querying Shopify by email, not updating.');
    }
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
      return address[0];
    } else if (fieldKey === 'address2') {
      const address = inputValue.split("\n");
      return address[1];
    } else {
      return inputValue;
    }
  }
}
