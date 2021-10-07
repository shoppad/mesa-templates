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

    // Get current line item
    const lineItem = context.steps['iterator'];
    // Get IO parent order group ID
    const ioParentOrderGroupId = lineItem.fields['_io_parent_order_group'];

    // Find parent line item
    const allLineItems = context.steps['infinite_options_order_created']['line_items'];

    const filteredLineItems = allLineItems.filter(lineItem => {
      // Now find the line item that has the same ID in _io_order_group
      return lineItem.fields && lineItem.fields['_io_order_group'] && lineItem.fields['_io_order_group'] === ioParentOrderGroupId
    });

    const output = {};

    if (filteredLineItems && filteredLineItems.length > 0) {
      const parentProductLineItem = filteredLineItems[0];

      output.parent_product_name = parentProductLineItem.name;
      output.parent_product_sku = parentProductLineItem.sku;
      output.parent_product_variant_id = parentProductLineItem.variant_id;
      output.parent_product_line_item_id = parentProductLineItem.id;
    }

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
