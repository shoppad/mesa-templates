const Mesa = require('vendor/Mesa.js');

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
  script = (payload, context) => {   
    // Check if exact email match in Shopify payload. Explanation: 
    // - When filtering by email, Shopify's customer search (in previous step) returns customers matching anything before the + symbol
    // - For example, searching johndoe@gmail.com will return customers johndoe+1@gmail.com, johndoe+2@gmail.com)
    // This step loops through all of these customers and retains only the record with the exact matching email
    const hubspotEmail = context.steps['hubspot_contact']['properties'].email;
    
    if (payload && payload.length > 0) {
      Mesa.log.debug(
        'Checking exact match for email',
        hubspotEmail
      );
     

      const filtered = payload.filter(item => item.email === hubspotEmail);

      // Check if there are any customers after filtering by exact email
      if (filtered && filtered.length > 0) {
        // Have an existing customer in Shopify, call update customer mapping
        const existingCustomer = filtered[0];
        Mesa.log.debug(`Found a customer matching email ${hubspotEmail} sending to update customer`, existingCustomer);
        Mesa.output.send('shopify_customer_update', existingCustomer);
      } else {
        // No existing customers in Shopify, call create customer mapping
        Mesa.log.debug(`Did not find a customer matching email ${hubspotEmail} sending to create customer`, existingCustomer);
        Mesa.output.send('shopify_customer_create', payload);
      }
    } 
    // No customers found by the Shopify customer search, proceed straight to creating customer
    else {
      Mesa.log.debug(
        'No existing customers found, proceeding to create customer',
        hubspotEmail
      );

      Mesa.output.send('shopify_customer_create', payload);
    }
  }
}
