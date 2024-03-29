/**
 * Calculate the inventory delta
 */
const Mesa = require('vendor/Mesa.js');
const Util = require('./Util.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    let delta = this.delta(vars);
    let status = this.status(vars);

    Util.stepLabel(`SKU ${vars.loop.sku}: Delta: ${delta}`);
    
    Mesa.output.next({
      "delta": delta,
      "status": status,
    });
  }

  delta = (vars) => {
    if (vars.data.length == 0) {
      return 0;
    }

    let current = vars.loop_1.quantities[0].quantity;
    let previous = parseInt(vars.data[0].available);

    return (current - previous);
  }

  status = (vars) => {
    if (vars.data.length == 0) {
      return "Initial Level";
    }

    let delta = this.delta(vars);
    if (delta == 0) {
      return "No Change";
    }

    return "Found Change";
  }
}
