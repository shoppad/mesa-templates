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
    // Retrieve the Variables Available to this step
    const vars = context.steps;
    // Parse existing boost values from Shopify Retrieve Search Boost Metafield step
    let boostValues = (JSON.parse(vars.shopify_2.value) || [])
      .map(v => String(v).trim());
    // Parse new boost values from Shopify Retrieve Product Metafield step
    let newValues = (JSON.parse(vars.shopify_1.value) || [])
      .map(v => String(v).trim());
    // For storing updated boost values
    let updatedBoostValues = '';
    
    // Combine new boost values into the existing boost values
    boostValues.push(...newValues);

    // Get unique values so there aren't duplicates, filter empty strings
    boostValues = [...new Set(boostValues)].filter(Boolean);
    // Build comma-separated string for output
    updatedBoostValues = boostValues.join(', ');

    // Call the next step in this workflow with the updated boost values
    Mesa.output.next(updatedBoostValues);
  }
}
