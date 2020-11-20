const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');
const Shopify = require("vendor/Shopify.js");


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

    let refundLineItemsHash = {};
    payload.refunds.forEach(function(refund){
      refund.refund_line_items.forEach(function(refundLineItem) {
        if (refundLineItemsHash[refundLineItem.id]) {
          refundLineItemsHash[refundLineItem.line_item.id] = refundLineItemsHash[refundLineItem.line_item.id] + refundLineItem.quantity;
        } else {
          refundLineItemsHash[refundLineItem.line_item.id] = refundLineItem.quantity;
        }
      });
    });

    if (payload.line_items) {
      const items = payload.line_items.filter(function(item) {

        // In the case there is not items lets return false
        if (!refundLineItemsHash[item.id.toString()]) return true;
        let remainQuantity = item.quantity - refundLineItemsHash[item.id.toString()];

        if (remainQuantity === 0) {
            return false;
        }
        
        return true;
      }).map(function(item) {
        let productImages = Shopify.get(`/admin/api/2020-10/products/${item.product_id}/images.json`);
        // Checking we have an image.
        let imageUrl = productImages && productImages.images && productImages.images[0] && productImages.images[0].src ? productImages.images[0].src : '';
        let {name, sku, quantity, notes} = item;

        if (refundLineItemsHash[item.id.toString()]) {
          quantity = quantity - refundLineItemsHash[item.id.toString()];
        }

        let taxAmount = 0.00;
        item.tax_lines.forEach(tax => {
          taxAmount = taxAmount + parseFloat(tax.price);
        });

        return {
         lineItemKey: null,
          sku,
          name,
          imageUrl,
          weight: {
            value: item.grams,
            units: "grams"
          },
          quantity,
          unitPrice: item.price,
          options: item.properties,
          taxAmount,
        }
      });

      let customerNotes = payload.note;

      if (payload.note_attributes.length > 0) {
        payload.note_attributes.forEach(noteAttribute => {
          customerNotes = customerNotes + `<br/> ${noteAttribute.name}: ${noteAttribute.value}`
        });
      }

      output['customerNotes'] = customerNotes;
      output['items'] = items;
    }
    

    // Adjust `output` here to alter data after we transform it.

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
