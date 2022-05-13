const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

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

    // Adjust `payload` here to alter data before we transform it.

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Adjust `output` here to alter data after we transform it.
    output.order_lines.forEach((lineItem, index) => {
      // Odoo (or just xmlrpc) has this crazy contruct for sending this information (many2many)
      output.order_lines[index].tax_id = [
        [6, 0, []]
      ];
    });

    // Add to the end of the orders our dummy products
    output.order_lines.push(output.discount);
    output.order_lines.push(output.shipping);
    output.order_lines.push(output.taxes);

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
