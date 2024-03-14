const Mesa = require('vendor/Mesa.js');
const Util = require('./Util.js');

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
    let lineItemProperties = Util.lineItemProperties(vars.loop);

    const propertiesAsString = Object.entries(lineItemProperties)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    Util.stepLabel(propertiesAsString);

    Mesa.output.next(lineItemProperties);
  }
}
