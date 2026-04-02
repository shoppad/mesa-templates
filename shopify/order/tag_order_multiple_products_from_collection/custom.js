const Mesa = require('vendor/Mesa.js');

/**
 * A MESA Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * MESA Script
   *
   * @param {object} prevResponse The response from the previous step
   * @param {object} context Additional context about this task
   */
  script = (prevResponse, context) => {
    // Retrieve the Variables Available to this step
    const vars = context.steps;

    // Add your custom code here
    let response = {};

    // Convert matching products' structure from Loop End
    const products = {
      loop_1: vars.loop_1.items
        .filter(id => id !== "")
        .map(id => ({ productId: id }))
    };

    // Count how many products
    const productsCount = products.loop_1.length;

    // Call the next step in this workflow
    // response will be the Variables Available from this step
    Mesa.output.next({products_count: productsCount});
  };
})();
