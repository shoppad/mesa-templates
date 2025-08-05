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

    // Get updated ShipStation order
    let updatedShipstationOrder = vars.custom.updatedShipstationOrder;

    // Get ShipStation credential
    // Will need to create a ShipStation credential before this will work
    let credential = JSON.parse(Mesa.credential.get('shipstation'));

    // Get authorization header
    let authHeader = Mesa.request.base64_encode(`${credential.key}:${credential.secret}`);

    // Set headers
    let options = {
      "headers": {
        "Content-Type": "application\/json",
        "Authorization": "Basic " + authHeader,
      }
    };

    // Make POST request to ShipStation Create/Update Order
    let url = 'https://ssapi.shipstation.com/orders/createorder';
    let results = Mesa.request.post(url, updatedShipstationOrder, options);   

    // Call the next step in this workflow
    // prevResponse will be the Variables Available from this step
    Mesa.output.next(prevResponse);
  };
})();
