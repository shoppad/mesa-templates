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
    const vars = context.steps;
    
    // Get support tickets
    let supportTickets = vars.data_1;

    // Pull out the messages
    let supportTicketMessages = supportTickets.map(item => ({ "Message": item.Message }));

    // JSON stringify the messages
    let supportTicketMessagesString = JSON.stringify(supportTicketMessages);

    // We're done, call the next step!
    Mesa.output.next({support_ticket_messages_string: supportTicketMessagesString});
  }
}
