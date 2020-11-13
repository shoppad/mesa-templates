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

    // Build out the {{line_item_properties}} token
    let value = '';
    payload.line_items.forEach(lineItem => {
      if (lineItem.properties.length) {
        // Add the product line in the format: {{product_title}}: {{sku}}
        value += `${lineItem.title} (${lineItem.sku})` + "\r\n";

        // Add each line item property in the format: {{name}}: {{value}}
        lineItem.properties.forEach(property => {
          value += ` - ${property.name}: ${property.value}` + "\r\n";
        });
        value += "\r\n";
      }
    });

    payload.line_item_properties = value;

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
