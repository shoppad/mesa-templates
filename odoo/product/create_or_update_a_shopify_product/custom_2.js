const Mesa = require('vendor/Mesa.js');

/**
 * A MESA Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * MESA Script
   *
   * @param {object} prevResponse The response from the previous step
   * @param {object} context Additional context about this task
   */
  script = (prevResponse, context) => {

    // Retrieve the Variables Available to this step
    const vars = context.steps;

    let response = {};
    // Get Odoo product variant
    const odooProductVariant = vars.loop_2;
    // Get display name
    let displayNameProductVariant = vars.loop_2.display_name;

    // Extracting variant title
    let variantTitle = this.extractVariantTitle(displayNameProductVariant);

    // Add to response
    response.variant_title = variantTitle;

    // Call the next step in this workflow
    // response will be the Variables Available from this step
    Mesa.output.next(response);
  }

  /**
   * Extract the variant title
   *
   * @param {string} displayName
   */
  extractVariantTitle = (displayName) => {
    const match = displayName.match(/\(([^)]+)\)/); // Matches text inside parentheses
    return match ? match[1] : null; // Returns the matched text or null if no match
  }

}