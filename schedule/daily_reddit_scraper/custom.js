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
    const cleanJsonResponse = (responseText) => {
      Mesa.log.info('responseText', responseText)
      // Trim whitespace
      let cleaned = responseText.trim();

      // If response starts and ends with ```json ... ```, strip it
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/i, ''); // remove opening ```json
        cleaned = cleaned.replace(/```$/i, ''); // remove closing ```
      }

      // If response starts and ends with generic ``` ... ```, strip it
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/i, ''); // remove opening ```
        cleaned = cleaned.replace(/```$/i, ''); // remove closing ```
      }

      return cleaned.trim();
    }
    // Retrieve the Variables Available to this step
    const vars = context.steps;

    // Add your custom code here
    let response = cleanJsonResponse(prevResponse.response);

    // Call the next step in this workflow
    // response will be the Variables Available from this step
    Mesa.output.next(response);
  };
})();
