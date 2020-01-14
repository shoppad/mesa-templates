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
    // Getting order notes.
    const orderNotes = payload.note;

    // Check if order has notes included.
    if (orderNotes != '') {
      let emailAddress = context.shop.email;
      const orderNumber = payload.name;
      Mesa.log.debug('Notes included in order', orderNotes);

      // Check if custom email address is applied.
      if (Mesa.storage.get('email-address')) {
        emailAddress = Mesa.storage.get('email-address');
        Mesa.log.debug('Using custom email address', emailAddress);
      } else {
        Mesa.log.debug('Using store email address', emailAddress);
      }

      // Send email notification.
      Mesa.email.send(
        emailAddress,
        `Order ${orderNumber} created with notes`,
        `
Hello ${context.shop.shop_owner},

${payload.customer.first_name} ${payload.customer.last_name} placed a new order with your store.

Notes have been included in the order. They are the following:

${orderNotes}

View Order ${orderNumber}: https://${context.shop.domain}/admin/orders/${payload.id}`.trim()
      );
    }
  };
})();
