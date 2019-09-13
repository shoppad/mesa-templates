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
    Mesa.output.done({article: payload}, {blog_id: Mesa.storage.get('remote-blog-id')});
  }
};
