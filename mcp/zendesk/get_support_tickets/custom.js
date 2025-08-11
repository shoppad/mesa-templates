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
    let response = {
      comment: ""
    };

    Mesa.log.info('Loop Details', vars.loop);

    let submitterId = vars.loop.submitter_id;

    // Getting all the comments.
    const comments = vars.zendesk_1.comments;

    const filteredComments = comments.filter(comment => comment.author_id === submitterId);

    // Fetching the last comment
    let lastComment = filteredComments[filteredComments.length - 1] || [];
    
    // Getting the last comment.
    if (lastComment && lastComment.plain_body) {
      response.comment = lastComment.plain_body;
    }

    Mesa.log.info('Process-comment', response);

    // Call the next step in this workflow
    // response will be the Variables Available from this step
    Mesa.output.next(response);
  }
}