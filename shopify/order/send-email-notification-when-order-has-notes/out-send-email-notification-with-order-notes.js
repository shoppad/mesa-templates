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

    const customEmailAddress = Mesa.storage.get('email-address');
    const storeEmailAddress = context.shop.email;

    const orderNumber = payload.name;
    const orderNotes = payload.note;

    Mesa.log.debug(
      'Email address in storage',
      customEmailAddress
        ? customEmailAddress
        : 'No email address specified in storage'
    );

    // if order has notes in payload
    if (orderNotes != '') {
      // if email not specified in storage, send to store owner
      // else send to email address specified in storage
      if (!customEmailAddress) {
        Mesa.log.debug('Using store email address');
        Mesa.log.debug('Store email address', storeEmailAddress);

        // Send email
        Mesa.email.send(
          storeEmailAddress,
          'Order ' + orderNumber + ' created with notes',
          'Hello ' +
            context.shop.name +
            ', \n' +
            payload.customer.first_name +
            ' ' +
            payload.customer.last_name +
            ' placed a new order with your store. \n' +
            // List products in order
            'There are notes included. ' +
            orderNotes
        );
      } else {
        Mesa.log.debug('Using email address specified in storage');
        Mesa.log.debug('Custom email address', customEmailAddress);

        // Send email
        Mesa.email.send(
          customEmailAddress,
          'Order ' + orderNumber + ' created with notes',
          'Notes included: ' + orderNotes
        );
      }
    }
  };
})();
