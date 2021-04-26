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

    // Loop through transactions on the refund, and total up the refund amount
     let refundAmount = 0;
     payload.transactions.forEach(transaction => {
       refundAmount -= transaction.amount;
     });
     
     // Add to payload
     payload.total_refund_amount = refundAmount;
    
    // We're done, call the next step!
  }
}
