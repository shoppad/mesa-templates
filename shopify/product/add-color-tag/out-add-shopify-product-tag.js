const Mesa = require("vendor/Mesa.js");

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    // Getting all colors from options.
    let colors = [];
    payload.options
      .filter(option => option.name === "Color")
      .forEach(color => {
        color.values.forEach(value => {
          colors.push(value);
        });
      });

    // Updating products tags.
    Mesa.output.done(
      {
        product: {
          id: payload.id,
          tags: payload.tags.split(',').concat(colors).join(", ")
        }
      },
      {
        product_id: payload.id
      }
    );
  };
})();
