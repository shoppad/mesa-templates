## Setup
- In the **Outputs** section, you will see the "Create Blog Article On Another Shopify Store" output. Set `Site Hostname` to the myshopify.com domain you will sync the blog articles TO, and the `API Key` from your private app 
- Set the `store-password` Secret Value to the "Password" from your private app
- Set the `local-blog-id` Storage Value to the blog ID that you want to sync articles FROM
- Set the `remote-blog-id` Storage Value to the blog ID that you want to sync articles TO
- Set the automation to "Enabled" and press "Save"

## Creating a private app
- [Create a private app](https://help.shopify.com/en/manual/apps/private-apps#generate-credentials-from-the-shopify-admin) on the store you want to sync articles TO. 
- Set the private app name to "Mesa". The emergency developer email can be your email address. Make sure "Store content like articles, blogs, comments, pages, and redirects" have "Read and write" Admin API permissions

## Getting a blog ID
- Log in to your Shopify dashboard
- Click on the "Online Store" sales channel and then "Blog posts"
- Click "Manage blogs"
- Click on the name of the blog you would like to sync
- The blog ID will be the number that's in the end of the URL in your browser. For example, if the URL in your browser is `https://store-name.myshopify.com/admin/blogs/25597182003` the blog ID is `25597182003` 