## Setup
- [Create a private app](https://help.shopify.com/en/manual/apps/private-apps#generate-credentials-from-the-shopify-admin) on the store you want to sync products to if you have not done so yet.
    - Set the private app name to "Mesa."
    - The emergency developer email can be your email. 
    - Make sure "Store content like articles, blogs, comments, pages, and redirects" Admin API permissions.
    - Save your changes. 
    - Stay on the window that includes a green banner that says "Private app created successfully." 
- On the Mesa dashboard, in the `Outputs` section, you will see the `Create Blog Article On Another Shopify Store` output. 
    - Set `Site Hostname` (located under **Show Advanced Options**) to the myshopify.com domain you will sync the blog articles to.
    - Copy and paste the API Key obtained from your private app as the `API Key` value. 
- Set the `store-password` Secret to the password obtained from your private app. 
- Set the `local-blog-id` Storage Item to the blog ID that you want to sync articles FROM. (See directions below to obtain your blog ID)
- Set the `remote-blog-id` Storage Item to the blog ID that you want to sync articles TO.
- Enable the Automation in the right sidebar and click **Save**.			

## Getting a blog ID
- From your Shopify Admin, click on the "Online Store" sales channel and then "Blog posts."
- Click on "Manage blogs."
- Click on the name of the blog you would like to sync.
- The blog ID will be the number that's in the end of the URL in your browser. For example, if the URL in your browser is `https://store-name.myshopify.com/admin/blogs/25597182003`, the blog ID is `25597182003`.