const Mesa = require('vendor/Mesa.js');
const Shopify= require('vendor/Shopify.js');

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
    let order = context.steps.loop;
    let existing = this.findExistingOrder(order, context);

    if (existing) {
      Mesa.trigger.setTaskExternalData({"label": "Existing order: " + existing.id});
      Mesa.output.next(existing);
      return;
    }

    Mesa.trigger.setTaskExternalData({"label": "Creating new order"});
    let newOrder = this.createOrder(order, context);
    Mesa.output.next(newOrder);
  }

  findExistingOrder = (order, context) => {
    let customer = context.steps.custom;
    let options = {
      query: {
        status: 'any',
      }
    };
    let response = Shopify.get('/admin/customers/' + customer.id + '/orders.json', options);

    options = {
      query: {
        name: order.name.substring(1),
      }
    };
    response = Shopify.get('/admin/orders.json', options);

    Mesa.log.info("Existing Orders", response.orders);
    for (let orderToCheck of response.orders) {      
      if (orderToCheck.name == order.name) {
        return orderToCheck;
      }
    }

    return null;
  }

  createOrder = (order, context) => {
    let customer = context.steps.custom;

    //Mesa.log.info("order before", order.id);
    //Mesa.log.info("customer", context.steps.custom.id);

    let line_items = order.line_items;
    for (let i = 0; i < line_items.length; i++) {
      delete line_items[i].id;
      delete line_items[i].product_id;
      delete line_items[i].variant_id;
    }

    let data = {
      "name": order.name,
      "email": customer.email,  
      "line_items": line_items,
      "customer": {
        "id": customer.id,
      },
      "currency": order.currency,
      "total_shipping_price_set": order.total_shipping_price_set,
      "total_tax": order.total_tax,
      "total_discounts": order.total_discounts,
      "total_discounts_set": order.total_discounts_set,
      "current_total_price": order.current_total_price,
      "total_price": order.total_price,
      "total_price_set": order.total_price_set,
      "currency": order.currency,
      "subtotal_price": order.subtotal_price,
      "tags": order.tags ? order.tags : null,
      "fulfillment_status": order.fulfillment_status,
      "billing_address": order.billing_address,
      "shipping_address": order.shipping_address,
      "payment_details": order.payment_details,
      "shipping_lines": order.shipping_lines,
    }

    // Mesa.log.info("order", data);
    let response = Shopify.post('/admin/orders.json', data);
    return response.order;
  }
}
