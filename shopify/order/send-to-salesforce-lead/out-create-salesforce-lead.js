const Mesa = require('vendor/Mesa.js');
const Salesforce = require('vendor/Salesforce.js');
const Mapping = require('vendor/Mapping.js');
const ShopifySalesforceCustomerMap = require('./shopify-salesforce-lead-map.js');

module.exports = new class {
  script = (payload) => {

    // Init Salesforce
    const salesforce = new Salesforce('refresh_token');

    // Define processor for convert()
    const processors = {
      process: [ this.setCompany ],
    };

    // Convert Shopify payload to SalesForce's contact format
    const postData = Mapping.convert(ShopifySalesforceCustomerMap, payload, 'shopify', 'salesforce', processors);

    // Construct full API path / define options
    const path = 'https://na19.salesforce.com/services/data/v20.0/sobjects/Lead';
    const options = { include_headers: true };

    // Create a lead in Salesforce
    const response = salesforce.post(path, postData, options);

    if (response.headers && response.headers.http_status_code !== "201") {
      Mesa.log.error('Error posting lead', response);
    }
  };

  /**
   * Set company to placeholder value if not set in Shopify
   */
  setCompany = (fieldKey, inputValue) => {
    if (fieldKey === 'company' && inputValue === null) {
      return 'Shopify Customer';
    }

    return inputValue;
  }
}();
