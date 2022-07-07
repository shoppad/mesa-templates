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
    // Refer to the Loop step
    const loop = context.steps['loop'];

    // Set the title for the Salesforce Product
    loop.current_item.combined_title = loop.complete.title;

    // If product variant has a title other than 'Default Title', append to the Salesforce Product Name
    if (loop.current_item.title !== 'Default Title') {
      loop.current_item.combined_title += ' - ' + loop.current_item.title;
      payload.current_item.combined_title = loop.current_item.combined_title;
    } else {
      payload.current_item.combined_title = loop.complete.title;
    }

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
