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

    // Add your custom code here
    let response = {}

    const threads = vars.helpscout_1.threads.filter((thread) => thread.type === 'customer');

    let thread = threads[threads.length -1];
    if (thread && thread.body) {
      thread.body = thread.body.replace(/<[^>]*>/g, '');
    }

    response.thread = thread;

    // Call the next step in this workflow
    // response will be the Variables Available from this step
    Mesa.output.next(response);
  }

}