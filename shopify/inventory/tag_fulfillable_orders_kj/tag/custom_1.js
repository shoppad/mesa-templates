/**
 * Assign inventory
 */
const Mesa = require('vendor/Mesa.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;
    let order = vars.loop;

    for (let lineItem of order.line_items) {
      Mesa.database.query(`
        INSERT INTO assigned_inventory (order_id, line_item, sku, product_title, variant_id, quantity, mesa_updated_at) 
        VALUES (${order.id}, ${lineItem.id}, '${lineItem.sku}', '${lineItem.title}', '${lineItem.variant_id}', ${lineItem.quantity}, now())
      `);
    }

    Mesa.output.next(payload);
  }
}
