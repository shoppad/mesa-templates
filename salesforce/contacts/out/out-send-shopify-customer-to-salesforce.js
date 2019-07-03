const Mesa = require('./vendor/Mesa1.js');
const Salesforce = require('./Salesforce.js');
const Mapping = require('./vendor/Mapping.js');
const ShopifySalesforceCustomerMap = require('./salesforce/maps/shopify-salesforce-customer-map.js');

module.exports = new class {
  script = (payload) => {
    // Init Salesforce
    const salesforce = new Salesforce('password', {
      username: Mesa.secret.get('salesforce_username'),
      password: Mesa.secret.get('salesforce_password'),
      client_id: Mesa.secret.get('salesforce_client_id'),
      client_secret: Mesa.secret.get('salesforce_client_secret')
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

    // Create or update a contact in Salesforce based on ShopifyCustomerID__c 
    salesforce.patch(path, postData, options);

    // Get updated contact from Salesforce
    const salesforceContact = salesforce.get(path, options);

    Mesa.log.info('salesforceContact', salesforceContact);
  };
}();
