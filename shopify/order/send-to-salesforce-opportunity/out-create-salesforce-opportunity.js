const Mesa = require('vendor/Mesa.js');
const Salesforce = require('vendor/Salesforce.js');
const Mapping = require('vendor/Mapping.js');
const ShopifySalesforceCustomerMap = require('./shopify-salesforce-opportunity-map.js');

module.exports = new class {
  script = (payload) => {

    // Init Salesforce
    const salesforce = new Salesforce('refresh_token');

    // Convert Shopify payload to SalesForce's opportunity format
    const postData = Mapping.convert(ShopifySalesforceCustomerMap, payload, 'shopify', 'salesforce');

    // Append additional fields
    postData['StageName'] = 'Closed Won';
    postData['Name'] = 'Shopify Order';
    postData['Description'] = `Shopify order ID: ${payload.id}`;

    // Construct full API path / define options
    const path = `${Mesa.storage.get('salesforce-instance')}/services/data/v20.0/sobjects/Opportunity`;
    const options = { include_headers: true };

    // @todo: add Description, Name field

    // Create a opportunity in Salesforce
    const response = salesforce.post(path, postData, options);

    if (response.headers && response.headers.http_status_code !== "201") {
      throw new Error('Error creating opportunity in Salesforce');
    }
  };
}();
