const Mesa = require('vendor/Mesa.js');

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
    const customerEmailEnding = Mesa.storage.get(
      'customer-email-ending',
      '.edu'
    );

    const customerDiscountTag = Mesa.storage.get(
      'customer-discount-tag',
      'Educational Discount'
    );

    Mesa.log.debug('Check customer email', payload.email);

    if (payload.email.endsWith(customerEmailEnding)) {
      if (!payload.tags) {
        payload.tags = customerDiscountTag;
      } else {
        const splitTags = payload.tags.toUpperCase().split(', ');
        if (splitTags.includes(customerDiscountTag.toUpperCase())) {
          Mesa.log.debug(
            'Tag already exists. Ending script execution.',
            payload.tags
          );
          return;
        } else {
          Mesa.log.debug('Adding discount tag', payload.tags);
          payload.tags += ', ' + customerDiscountTag;
        }
      }

      Mesa.log.debug('Discount tag adding to shopify', payload.tags);
      const updateTags = payload.tags;

      Mesa.output.done({ tags: updateTags }, { customer_id: payload.id });
    }
  };
})();
