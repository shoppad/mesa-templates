/**
 * Else Step From Filter
 */

const Mesa = require('vendor/Mesa.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    // Don't call the next step since this is an else
    // Mesa.output.next(payload);
  }
}
