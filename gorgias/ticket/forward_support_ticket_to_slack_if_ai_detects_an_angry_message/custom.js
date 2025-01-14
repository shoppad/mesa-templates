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
    // Get AI response
    let aiResponse = vars.ai.response;
    // Convert to JSON array
    let responseArray = JSON.parse(aiResponse);

    // Call the next step in this workflow
    // response will be the Variables Available from this step
    Mesa.output.next({ai_response: responseArray});
  }

}