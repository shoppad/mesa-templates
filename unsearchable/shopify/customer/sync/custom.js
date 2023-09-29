const Mesa = require('vendor/Mesa.js');
const Shopify= require('vendor/Shopify.js');

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
    let customer = payload.customer;
    Mesa.log.info("customer before", customer);

    // do this before deleting the id field
    customer.email = "kalen+" + customer.id + "@theshoppad.com"

    delete customer.id;
    for (let i = 0; i < customer.addresses.length; i++) {
        delete customer.addresses[i].id;
        delete customer.addresses[i].customer_id;    
    }
    delete customer.default_address.id;
    delete customer.default_address.customer_id;    

    let response = Shopify.get('/admin/customers/search.json?query=email:' + encodeURIComponent(customer.email));
    if (response.customers.length != 0) {
        Mesa.output.next(response.customers[0]);
        return;
    }

    response = Shopify.post('/admin/customers.json', customer);
    Mesa.output.next(response.customer);
  }
}
