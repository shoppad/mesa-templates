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
    // The metafield query returns no match when the product has no boosts yet
    const boostMetafield = (vars.shopify_2.metafields || [])[0] || {};
    let boostValues = this.toList(boostMetafield.value)
      .map(v => String(v).trim());
    // Parse new boost values from Shopify Retrieve Product Metafield step
    let newValues = this.toList(vars.shopify_1.value)
      .map(v => String(v).trim());
    // For storing updated boost values
    let updatedBoostValues = '';
    
    // Combine new boost values into the existing boost values
    boostValues.push(...newValues);

    // Get unique values so there aren't duplicates, filter empty strings
    boostValues = [...new Set(boostValues)].filter(Boolean);
    // Build a JSON array string, the format list metafields expect
    updatedBoostValues = JSON.stringify(boostValues);

    // Call the next step in this workflow with the updated boost values
    Mesa.output.next(updatedBoostValues);
  }

  /**
   * List metafield values arrive as a JSON string or as an already parsed array
   *
   * @param {string|array} value The metafield value
   * @return {array} The list values
   */
  toList = (value) => {
    if (Array.isArray(value)) {
      return value;
    }
    return JSON.parse(value || 'null') || [];
  }
}
