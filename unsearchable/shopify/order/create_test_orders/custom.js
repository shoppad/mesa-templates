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
    Mesa.log.info("payload: ", payload);
    Mesa.log.info("context: ", context.steps['transform']);

    let numRows = context.steps['transform']['Number Of Orders'];
    let array = []; // create an empty array to store the rows

    for (let i = 1; i <= numRows; i++) {
      // create a new row and add it to the array
      let row = [i, "some data", true];
      array.push(row);
    }

    payload.array = array;    

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
