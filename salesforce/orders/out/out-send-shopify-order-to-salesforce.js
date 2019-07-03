const Mesa = require("./vendor/Mesa1.js");
const Mapping = require("./vendor/Mapping.js");
const Salesforce = require("./Salesforce.js");
const ShopifySalesforceCustomerMap = require('./salesforce/maps/shopify-salesforce-customer-map.js');
const ShopifySalesforceOrderMap = require('./salesforce/maps/shopify-salesforce-order-map.js');

module.exports = new class {
  script = (payload, context) => {
    // Init Salesforce
    const salesforce = new Salesforce('password', {
      username: Mesa.secret.get('salesforce_username'),
      password: Mesa.secret.get('salesforce_password'),
      client_id: Mesa.secret.get('salesforce_client_id'),
      client_secret: Mesa.secret.get('salesforce_client_secret')
    });

    // Base path / options for Salesforce APIs
    const orderBasePath = 'https://na19.salesforce.com/services/data/v20.0/sobjects/Order';
    const customerBasePath = 'https://na19.salesforce.com/services/data/v20.0/sobjects/Contact';
    const options = { include_headers: true };

    // Full API paths
    const customerApiPath = `${customerBasePath}/ShopifyCustomerID__c/${payload.customer.id}`;
    const orderApiPath = `${orderBasePath}/ShopifyOrderID__c/${payload.id}`;

    //
    // Create or update contact
    //

    // Get contact data for Salesforce from Shopify
    const contactPostData = Mapping.convert(ShopifySalesforceCustomerMap, payload.customer, 'shopify', 'salesforce');

    Mesa.log.info('~~~~~~~contactPostData~~~~~~~', contactPostData);

    // Create or update a contact in Salesforce based on ShopifyCustomerID__c
    const contactResponse = salesforce.patch(customerApiPath, contactPostData, options);

    if (
      contactResponse.headers.http_status_code !== '200' &&
      contactResponse.headers.http_status_code !== '201' &&
      contactResponse.headers.http_status_code !== '204'
    ) {
      Mesa.log.error('Error processing contact. Salesforce response:', contactResponse);      
      return;
    }

    //
    // Create order
    //

    const existingContactResp = salesforce.get(customerApiPath, options);

    if (!existingContactResp || !existingContactResp.body.Id) {
      Mesa.log.error(
        'Error finding Salesforce contact with ShopifyCustomerID__c value of ',
        payload.customer.id
      );

      // @todo: do we want a max retries for ordwers which fail? Or fail immediately?
      return;
    }

    // Get order data for Salesforce from Shopify
    const postData = Mapping.convert(ShopifySalesforceOrderMap, payload, 'shopify', 'salesforce');

    // Add in extra fields
    // @todo: this will come from creating / updating contact with customer data from the order
    postData.BillToContactId = existingContactResp.body.Id;

    // @todo: account ID will come from the contact data / once we've implemented accounts
    postData.AccountId = '0012E00001rpVHXQA2';

    // Draft status must be provided. Can only set to 'Activated' if there are no order items. C
    postData.Status = 'Draft';

    // Send order
    const orderResponse = salesforce.patch(orderApiPath, payload.id, postData);

    // check if error, if so, output
    if (
      orderResponse.headers.http_status_code !== '200' &&
      orderResponse.headers.http_status_code !== '201' &&
      orderResponse.headers.http_status_code !== '204'
    ) {
      Mesa.log.error('Error processing order. Salesforce response:', orderResponse.body);

      // @todo: do we want a max retries for ordwers which fail? Or fail immediately?
    }
  };
}();
