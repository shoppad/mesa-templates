const Mesa = require('vendor/Mesa.js');
const Util = require('./Util.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;
    let lineItemProperties = Util.lineItemPropertiesAsObject(vars.loop);

    const propertiesAsString = Object.entries(lineItemProperties)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    Util.stepLabel(propertiesAsString);

    Mesa.output.next(lineItemProperties);
  }
}
