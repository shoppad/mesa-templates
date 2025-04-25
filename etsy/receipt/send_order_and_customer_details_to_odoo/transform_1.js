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
    const lineItem = payload;

    const order = context.steps['etsy'];

    const odooProduct = context.steps['odoo'].reduce(
      (acc, product) => {
        if (acc) {
          return acc;
        } else if (product.default_code === lineItem.default_code) {
          return product;
        }
      },
      false
    );

    // This shouldn't happen
    if (!odooProduct) {
      Mesa.log.error('Error data', {
        receipt_id: order.receipt_id,
        order_id: order.receipt_id,
        line_item_title: lineItem.title,
        odoo_products: context.steps['odoo'],
      });
      throw new Error('Missing odoo product in line item transform');
    }

    Mesa.output.next({ product_id: odooProduct.id });
  };
})();
