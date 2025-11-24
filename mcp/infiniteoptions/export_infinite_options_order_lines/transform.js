const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

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
    const output = [];
    const ioProps =
      context.steps.skill.infiniteoptions_field &&
      context.steps.skill.infiniteoptions_field !==
        'all_infinite_options_options'
        ? [context.steps.skill.infiniteoptions_field]
        : [];

    if (!context.steps.infiniteoptions) {
      Mesa.log.warn('No infiniteoptions data found');
      return Mesa.output.next({ data_export: [] });
    }

    if (!ioProps.length) {
      //  We're in "all props" mode, build our fields
      context.steps.infiniteoptions.forEach((order) => {
        order.fields.forEach(({ name }) => {
          if (!ioProps.find((prop) => prop == name)) {
            ioProps.push(name);
          }
        });
      });
    }

    // Process our hits
    context.steps.infiniteoptions.forEach(({ order, line_items }) => {
      line_items.forEach((line) => {
        const address = order.shipping_address || order.billing_address || {};
        const lineValues = {
          'Order URL': `https://admin.shopify.com/store/${context.steps.shopify.myshopify_domain.replace(
            '.myshopify.com',
            ''
          )}/orders/${order.id}`,
          'Order Name': order.name,
          Email: order.email,
          'Shipping Name': `${address.first_name || ''} ${
            address.last_name || ''
          }`,
          Address: address.address1 || '',
          City: address.city || '',
          Province: address.province || '',
          Zip: address.zip || '',
          Country: address.country || '',
          'Product Name': line.title,
          'Product SKU': line.sku,
          'Product Price': line.price,
        };

        // Build a map of property values
        const propValues = line.properties.reduce(
          (propValues, { name, value }) => {
            propValues[name] = value;
            return propValues;
          },
          {}
        );

        // Add our IO props so we preserve any order
        ioProps.forEach((prop) => {
          lineValues[prop] = propValues[prop] || '';
        });

        output.push(lineValues);
      });
    });

    // We're done, call the next step!
    Mesa.output.next({ data_export: output });
  };
})();
