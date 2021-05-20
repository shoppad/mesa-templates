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

    // Add your custom code here

    // Setting variable
    let isReadyToSendOrder = true;

    // Looping through each fulfillment item
    payload.line_items.forEach((item)=> {
        // Checking if fulfillment is fulfilled and requires shipping
        Mesa.log.info('item', item)
        if (item.fulfillment_status == null && item.requires_shipping == true) {
            // If so, set variable to false
            Mesa.log.info('false')
            isReadyToSendOrder = false;
        }
    })

    // If variable is true, proceed to next Step!
    if (isReadyToSendOrder) {
        Mesa.output.next(payload);
    // If false, log this statement.
    } else {
        Mesa.log.info('One of the packages in the order is not fulfilled or requires shipping');
    }
}
}
