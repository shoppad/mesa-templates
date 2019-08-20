const Mesa = require('vendor/Mesa.js');
const Salesforce = require('vendor/Salesforce.js');
const Mapping = require('vendor/Mapping.js');
const ShopifySalesforceCustomerMap = require('./shopify-salesforce-customer-map.js');

module.exports = new class {
  script = (payload) => {
    // Init Salesforce
    const salesforce = new Salesforce('password', {
      username: 'salesforce-username',
      password: 'salesforce-password',
      client_id: 'salesforce-client-id',
      client_secret: 'salesforce-client-secret',
      access_token: 'salesforce-access-token',
    });

    // Convert Shopify payload to SalesForce's contact format
    const postData = Mapping.convert(ShopifySalesforceCustomerMap, payload, 'shopify', 'salesforce');

    // Base path for Salesforce's contact API
    const basePath = 'https://na19.salesforce.com/services/data/v20.0/sobjects/Contact';

    // Define an addtional field for Salesforce
    const externalFieldName = 'ShopifyCustomerID__c';
    const extenalFieldValue = payload.id;

    // Construct full API path / define options
    const path = `${basePath}/${externalFieldName}/${extenalFieldValue}`;
    const options = { include_headers: true };

    // Create a contact in Salesforce based on ShopifyCustomerID__c 
    salesforce.patch(path, postData, options);

    // Get updated contact from Salesforce
    const salesforceContact = salesforce.get(path, options);

    Mesa.log.info('salesforceContact', salesforceContact);
  };
}();
