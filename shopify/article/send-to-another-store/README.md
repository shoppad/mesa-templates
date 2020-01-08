# Send Blog Article to Another Store

---

## Setup

1. Under the "Create Blog Article On Another Shopify Store" output, set `Site Hostname` to the myshopify.com domain you will sync the blog articles TO, and the `API Key` from your private app 
2. Set the `store-password` Secret Value to the "Password" from your private app
3. Set the `local-blog-id` Storage Value to the blog ID that you want to sync articles FROM
4. Set the `remote-blog-id` Storage Value to the blog ID that you want to sync articles TO
5. Set the automation to "Enabled" and press "Save"

### Creating a private app
1. [Create a private app](https://help.shopify.com/en/manual/apps/private-apps#generate-credentials-from-the-shopify-admin) on the store you want to sync articles TO. 
2. Set the private app name to "Mesa". The emergency developer email can be your email address. Make sure "Store content like articles, blogs, comments, pages, and redirects" have "Read and write" Admin API permissions

### Getting a blog ID
1. Log in to your Shopify dashboard
2. Click on the "Online Store" sales channel and then "Blog posts"
3. Click "Manage blogs"
4. Click on the name of the blog you would like to sync
5. The blog ID will be the number that's in the end of the URL in your browser. For example, if the URL in your browser is `https://store-name.myshopify.com/admin/blogs/25597182003` the blog ID is `25597182003` 

### Customizations
1. To update URLs in the blog article, you can uncomment the line of code at line 16 in `out-create-shopify-article.js`. 
2. You will need to replace the values `<from_url>` and `<to_url>` with actual values. 
3. *Note*: do not erase `/g` in the code, this is needed to allow the value to be found.
4. For instance if you use `mysite.com` for `<from_url>` and `yoursite.ca` for the `<to_url>`, all content with `mysite.com` will be replaced with `yoursite.ca` in the copied article.