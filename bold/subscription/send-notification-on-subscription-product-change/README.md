## Setup

- Follow the help text in `Bold Subscription Product Quantity Changed`, but select 3 Bold webhooks to point to the automation: "Product added", "Product removed", and "Product quantity changed"
- Find `{% assign shop = 'MYSHOP' %}` in the `Transform: Notification Message` Step and replace `MYSHOP` with your Shopify store name from https://`MYSHOP`.myshopify.com
- Enter the Slack channel you would like to post to under the `Slack` Step > `Advanced Options`.
- Optionally customize the slack notification message in the `Transform: Slack Message` Step.
