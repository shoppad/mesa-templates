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
    const lineItem = payload;

    const order = context.steps['shopify_order'];

    const odooProduct = context.steps['odoo_product_product'].reduce(
      (acc, product) => {
        if (acc) {
          return acc;
        } else if (product.default_code === lineItem.sku) {
          return product;
        }
      },
      false
    );

    // Product not found, something went wrong
    if (!odooProduct) {
      Mesa.log.error('Error data', {
        order_name: order.name,
        order_id: order.id,
        line_item_title: lineItem.title,
        odoo_products: context.steps['odoo_product_product'],
      });
      throw new Error('Missing odoo product in line item transform');
    }

    Mesa.output.next({product_id: odooProduct.id});
  }
}
