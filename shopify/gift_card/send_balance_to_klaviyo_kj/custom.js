/**
 * Save pagination
 */
const Mesa = require('vendor/Mesa.js');
const Util = require('./Util.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    let lastRow = vars.data[vars.data.length - 1];
    if (lastRow) {
      Mesa.storage.set('mesa_id', lastRow.mesa_id);
    } else {
      // When no rows are found, that's how we know we're done - the automation will stop calling itself and we'll
      // reset mesa_id to zero for the next time it runs
      Mesa.storage.set('mesa_id', 0);
    }

    Util.stepLabel("new mesa_id: " + Mesa.storage.get('mesa_id'));

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
