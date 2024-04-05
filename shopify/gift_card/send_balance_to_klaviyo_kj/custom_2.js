/**
 * Call workflow again recursively
 */
const Mesa = require('vendor/Mesa.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    Mesa.automation.send(context.automation.key);

    Mesa.output.next(payload);
  }
}
