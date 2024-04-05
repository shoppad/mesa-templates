/**
 * Get pagination for query
 */
const Mesa = require('vendor/Mesa.js');
const Util = require('./Util.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    let mesaId = Util.getMesaStorage('mesa_id', 0);
    Util.stepLabel("mesa_id: " + mesaId);

    Mesa.output.next({
      "mesa_id": mesaId
    });
  }
}
