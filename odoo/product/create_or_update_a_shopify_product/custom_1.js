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
    
    // For storing response
    let response = {};

    // Find a matching Shopify item based on SKU
    // Add has_shopify_match and Shopify variant ID and product ID if a match is found
    let updatedOdooProductVariants = vars.odoo_2.map(odooItem => {
      let shopifyMatch = vars.shopify_7.find(shopifyItem => shopifyItem.sku === odooItem.default_code);

      return {
        ...odooItem,
        has_shopify_match: shopifyMatch ? "yes" : "no",
        shopify_variant_id: shopifyMatch ? shopifyMatch.id : null,
        shopify_product_id: shopifyMatch ? shopifyMatch.product_id : null
      };
    });

    // Add to response
    response.updated_odoo_product_variants = updatedOdooProductVariants;

    // Call the next step in this workflow
    // response will be the Variables Available from this step
    Mesa.output.next(response);
  }

}