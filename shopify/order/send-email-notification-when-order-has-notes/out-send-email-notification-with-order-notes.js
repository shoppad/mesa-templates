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
    Mesa.log.debug('Testing 1 2 3');
    Mesa.log.debug('Payload:', payload);
    Mesa.log.debug('Context', context);

    const emailAddress = Mesa.storage.get('email-address');
    Mesa.log.debug(
      'Email Address',
      emailAddress ? emailAddress : 'No email specified in storage'
    );

    // if order notes in payload
    if (payload.note != '') {
      // if email not specified in storage, send to store owner
      // else send to email specified in storage
      if (!emailAddress) {
        Mesa.log.debug('Using Store Owner email');

        // Send email
        Mesa.email.send(
          context.shop.email,
          'Order ' + payload.name + ' created with notes',
          'Notes included: ' + payload.note
        );
      } else {
        Mesa.log.debug('Using email specified in storage');

        // Send email
        Mesa.email.send(
          emailAddress,
          'Order ' + payload.name + ' created with notes',
          'Notes included: ' + payload.note
        );
      }
    }
  };
})();
