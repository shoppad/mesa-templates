/**
 * Discount amount
 */

const Mesa = require('vendor/Mesa.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    let discountAmount = context.automation.outputs[0].metadata.discount_amount;

    Mesa.trigger.setTaskExternalData({
      "label": "Discount amount: " + discountAmount
    })

    Mesa.log.info(JSON.stringify(context));

    // We're done, call the next step!
    Mesa.output.next({
      "discount_amount": discountAmount
    });
  }
}
