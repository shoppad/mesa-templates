const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

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

    // Adjust `payload` here to alter data before we transform it.

    // Set the title for the Salesforce Product
    context.steps.loop.combined_title = context.steps['shopify-product-created-or-updated'].title;

    // If product variant has a title other than 'Default Title', append to the Salesforce Product Name
    if (context.steps.loop.title !== 'Default Title') {
      context.steps.loop.combined_title += ' - ' + context.steps.loop.title;
    }

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Adjust `output` here to alter data after we transform it.

    // If the 'Salesforce: Query Product' Output found an existing product ID, pass this to the next output so the product is updated
    if (payload && payload.Id) {
      output.id = payload.Id;
    }

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
