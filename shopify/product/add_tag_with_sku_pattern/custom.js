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

    // Create an array of tags and patterns
    let array = [];
    for (let tag in vars.transform) {
      array.push({
        "tag": tag,
        "pattern": vars.transform[tag]
      });
    }

    // We're done, call the next step!
    Mesa.output.next({"array": array});
    
  }
}
