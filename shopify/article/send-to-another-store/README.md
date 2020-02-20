## Setup
- Under the **Create Blog Article On Another Shopify Store** output, set `External Site Hostname` to the myshopify.com domain you will sync the blog articles TO, and the `API Key` from your private app. 
- Set the `store-password` Secret Value to the "Password" from your private app.
- Set the `local-blog-id` Storage Item to the blog ID that you want to sync articles FROM.
- Set the `remote-blog-id` Storage Item to the blog ID that you want to sync articles TO.
- Enable the Automation in the right sidebar and click **Save**.

### Creating a private app
- [Create a private app](https://help.shopify.com/en/manual/apps/private-apps#generate-credentials-from-the-shopify-admin) on the store you want to sync articles TO. 
- Set the private app name to "Mesa". The emergency developer email can be your email address. Make sure "Store content like articles, blogs, comments, pages, and redirects" have "Read and write" Admin API permissions.

### Getting a blog ID
- On the Shopify dashboard, click on the "Online Store" sales channel and then "Blog posts."
- Click "Manage blogs."
- Click on the name of the blog you would like to sync.
- The blog ID will be the number that's in the end of the URL in your browser. For example, if the URL in your browser is `https://store-name.myshopify.com/admin/blogs/25597182003` the blog ID is `25597182003`.

### Customizations
- To update URLs in the blog article, you can uncomment the line of code at line 16 in `out-create-shopify-article.js`. 
- You will need to replace the values `<from_url>` and `<to_url>` with actual values. 
- For instance if you use `mysite.com` for `<from_url>` and `yoursite.ca` for the `<to_url>`, all content with `mysite.com` will be replaced with `yoursite.ca` in the copied article.
- **Note**: do not erase `/g` in the code, this is needed to allow the value to be found.