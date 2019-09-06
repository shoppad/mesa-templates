const Mesa = require('vendor/Mesa.js');
const Salesforce = require('vendor/Salesforce.js');
const Mapping = require('vendor/Mapping.js');
const ShopifySalesforceCustomerMap = require('./shopify-salesforce-contact-map.js');

module.exports = new class {
  script = (payload) => {

    // Init Salesforce
    const salesforce = new Salesforce('refresh_token');

    // Convert Shopify payload to SalesForce's contact format
    const postData = Mapping.convert(ShopifySalesforceCustomerMap, payload, 'shopify', 'salesforce');

    // Construct full API path / define options
    const path = `${Mesa.storage.get('salesforce-instance')}/services/data/v20.0/sobjects/Contact`;
    const options = { include_headers: true };

    // Create a contact in Salesforce
    const response = salesforce.post(path, postData, options);

    if (response.headers && response.headers.http_status_code !== "201") {
      throw new Error('Error creating contact in Salesforce. Possible cause: contact already exists.');
    }
  };
}();