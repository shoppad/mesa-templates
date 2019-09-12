const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');

/**
 * Send Blog Article to Another Store
 */
module.exports = new class {

  /**
   * Fetch all published articles from the local store and queue each article
   * to be sent to remote store
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    const lastArticleID = Mesa.storage.get('local-last-article-id', '');
    const localBlogID = Mesa.storage.get('local-blog-id');
    const remoteBlogID = Mesa.storage.get('remote-blog-id');
    let query = {published_status:'published'}
    if (lastArticleID) {
      query.since_id = lastArticleID
    }

    let url = '/admin/blogs/'+ localBlogID +'/articles.json';

    // Fetch the list of articles from Shopify
    const response = Shopify.get(url, {query: query});
    let articles = response.articles;

    // Sort articles by ID
    articles.sort((a, b) => (a.id > b.id) ? 1 : -1);

    // Iterate through the array of articles
    for (let i = 0; i < articles.length; i++) {

      // Stash the articleID and remove from object
      let articleID = articles[i].id;
      delete articles[i].id;

      // Update the blog_id from local to remote value
      articles[i].blog_id = remoteBlogID;

      // Send article to output
      Mesa.output.send('out-create-blog-article-on-another-shopify-store', articles[i]);

      // Save this article ID for subsequent runs
      Mesa.storage.set('local-last-article-id', articleID);
    }
  }
};