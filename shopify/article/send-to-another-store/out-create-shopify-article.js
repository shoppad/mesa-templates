const Mesa = require('vendor/Mesa.js');

/**
 * Send Blog Article to Another Store
 */
module.exports = new class {

  /**
   * Send a single article to the remote store
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    // Optional snippet to update urls in the blog article. Uncomment, and replace <from_url> and <to_url> with actual values.
    // payload.body_html = payload.body_html.replace(/<from_url>/g, '<to_url>');

    Mesa.output.done({article: payload}, {blog_id: Mesa.storage.get('remote-blog-id')});
  }
};
