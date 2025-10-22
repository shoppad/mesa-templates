const Mesa = require("vendor/Mesa.js");

/**
 * A MESA Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * MESA Script
   *
   * @param {object} prevResponse The response from the previous step
   * @param {object} context Additional context about this task
   */
  script = (prevResponse, context) => {
    // Retrieve the Variables Available to this step
    const vars = context.steps;

    // Setting variable
    let isReadyToSendOrder = true;
    // Get Shopify order
    let shopifyOrder = vars.shopify;

    // Looping through each fulfillment item
    shopifyOrder.line_items.forEach(item => {
      // Checking if fulfillment is fulfilled and requires shipping
      Mesa.log.info("item", item);
      if (item.fulfillment_status == null && item.requires_shipping == true) {
        // If so, set variable to false
        Mesa.log.info("false");
        isReadyToSendOrder = false;
      }
    });

    // If variable is true, proceed to next step
    if (isReadyToSendOrder) {
      Mesa.output.next(shopifyOrder);
      // If false, log this statement.
    } else {
      Mesa.log.info(
        "One of the packages in the order is not fulfilled or requires shipping"
      );
    }
  };
})();
