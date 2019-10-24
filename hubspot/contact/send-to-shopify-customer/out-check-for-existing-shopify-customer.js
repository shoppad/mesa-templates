const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   */
  script = payload => {
    // Decode payload
    Mesa.log.debug('payload', payload);

    //Check if customer exists
    const email = payload.properties.email.value;

    // Fetch the list of articles from Shopify
    const response = Shopify.get('/admin/customers/search.json', {
      query: { email: email },
      fields: 'id'
    });

    Mesa.log.debug('Shopify customer search response', response);

    // TODO how to handle when email is changed (could check hubpot value history)
    if (response.customers && response.customers.length > 0) {
      Mesa.log.debug(
        'Customer found for email, sending to output out-update-shopify-customer',
        email
      );

      Mesa.log.debug('response.customers[0].id;', response.customers[0].id);
      Mesa.log.debug('response.customers[0];', response.customers[0]);

      payload.shopify_customer_id = response.customers[0].id;

      Mesa.output.send('out-update-shopify-customer', payload);
    } else {
      Mesa.log.debug(
        'Customer not found for email, will create customer',
        email
      );

      Mesa.output.send('out-create-shopify-customer', payload);
    }
  };
})();
