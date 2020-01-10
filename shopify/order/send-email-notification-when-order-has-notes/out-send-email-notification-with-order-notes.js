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
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    Mesa.log.debug('Payload', payload);
    Mesa.log.debug('Context', context);

    const orderNotes = payload.note;

    // if order notes is not empty
    if (orderNotes != '') {
      let emailAddress = context.shop.email;
      const orderNumber = payload.name;
      // if email not specified in storage, send to store owner
      // else send to email address specified in storage

      if (Mesa.storage.get('email-address')) {
        emailAddress = Mesa.storage.get('email-address');
        Mesa.log.debug('Using custom email address', emailAddress);
      } else {
        Mesa.log.debug('Using store email address', emailAddress);
      }

      // let emailBody = `Hello! ${emailAddress}`;

      // Send email
      Mesa.email.send(
        emailAddress,
        'Order ' + orderNumber + ' created with notes',
        'Hello ' +
          context.shop.name +
          ', \n \n' +
          payload.customer.first_name +
          ' ' +
          payload.customer.last_name +
          ' placed a new order with your store. \n Notes have been included in the order. They are the following: \n \n' +
          orderNotes +
          '\n \n View Order ' +
          orderNumber +
          ': ' +
          'https://' +
          context.shop.domain +
          '/admin/orders/' +
          payload.id
      );
    }
  };
})();
