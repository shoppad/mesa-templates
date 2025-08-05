const Mesa = require('vendor/Mesa.js');

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

    // Store updated ShipStation order
    let updatedShipstationOrder = vars.shipstation_1;

    // Remove line item properties starting with underscore of ShipStation order in items.options
    for (let item of updatedShipstationOrder.items) {
      item.options = item.options.filter(option => 
        option.name.toLowerCase().charAt(0) !== " "
      );
    }

    // Go to next step and pass updated ShipStation order
    Mesa.output.next({updatedShipstationOrder: updatedShipstationOrder});
  };
})();
