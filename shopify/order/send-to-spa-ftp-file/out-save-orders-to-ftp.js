const Mesa = require('vendor/Mesa.js');
const Spa = require('vendor/Spa.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  orders = [];

  /**
   * Map the carrier from the shipping line.
   * 
   * @param array shippingLines
   */
  getSPACarrierCodeFromShopifyShippingLines(shippingLines) {

    let shippingLine = shippingLines[0];
    let carrierCode;

    if (!shippingLine || shippingLine['title']) {
      return '';
    }

    switch (shippingLine['title'].toLowerCase()) {
      case "standard overnight shipping (next pm delivery)":
      case "standard overnight":
      case "fedex standard overnight":
        carrierCode = 'F06';
        break;
      default:
        carrierCode = 'R02';
    }

    return carrierCode;
  }

  /**
   * Apply shipping discounts.
   * 
   * @param object order
   */
  getTotalShipping(order) {
    let price = 0;
    order.shipping_lines.forEach((shippingLine, key) => {
      price += shippingLine.discounted_price;
    });

    return price;
  }


  /**
   * Mesa Script
   *
   * @param {array} payload: The payload data
   * @param {object {
   *   input: {},
   *   output: {},
   *   headers: {},
   *   filename: ""
   * }} context: Additional context about this task
   */
  script = (payload, context) => {

    const data = payload.map(order => {

      const shippingAddress = order.shipping_address;

      let spaOrderProperties = {
        'order_no': order.order_number,
        'ship_to_name': shippingAddress.name,
        'ship_to_address_line_1': shippingAddress.address1,
        'ship_to_address_line_2': shippingAddress.address2,
        'ship_to_city': shippingAddress.city,
        'ship_to_state': shippingAddress.province_code,
        'ship_to_zip': shippingAddress.zip,
        'ship_to_country_code': shippingAddress.country_code,
        'ship_to_phone_number': shippingAddress.phone,
        'carrier_code': this.getSPACarrierCodeFromShopifyShippingLines(order.shipping_lines),
        'ship_to_email_address': order.email,
        'customer_po_number': `${order.id}${order.name}`,
        'freight_amount': this.getTotalShipping(order),
        'sales_tax': order.total_tax
      };

      // Optional: Add User Defined Fields
      const udfFields = {
        //'User Defined Field 1': 'example value',
        //'User Defined Field 2': 'example value 2',
      };
      spaOrderProperties = Object.assign({}, spaOrderProperties, udfFields);

      const spaOrder = new Spa.Order(spaOrderProperties);

      order.line_items.forEach((lineItem, key) => {

        // Optional: Make sure line item uses SPA fulfillment before adding
        // if (lineItem.fulfillment_service.toLowerCase() != 'spa') {
        //   Mesa.log.info('lineItem.fulfillment_service is not "spa". Skipping.');
        //   return;
        // }

        spaOrder.addLineItem({
          'part_number': lineItem.sku,
          'quantity': lineItem.quantity,
          'unit_price': lineItem.price,
        });

      });

      spaOrder.validate();

      this.orders = [...this.orders, ...spaOrder.getMapped()];
    });
    //Mesa.log.info('this.orders', this.orders);

    const string = Mesa.csv.encode(this.orders, false);
    
    Mesa.output.done(string);

  } // script
}
