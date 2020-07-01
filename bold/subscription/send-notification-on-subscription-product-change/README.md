## Setup

- Follow the help text in the `Bold Subscription Product Quantity Changed` Trigger. Make sure to select the 3 Bold Webhooks Events: "Product added", "Product removed", and "Product quantity changed", located in this [document](https://support.boldcommerce.com/hc/en-us/articles/360028881292-Using-Webhooks-with-Bold-Subscriptions). Under the "Select the event you would like to track." label.
- Find `{% assign shop = 'MYSHOP' %}` in the `Transform: Notification Message` Step and rreplace `MYSHOP` with your Shopify store name from https://`MYSHOP`.myshopify.com. Example: `https://shoppadteststore.myshopify.com`.
- Create a Slack Credential if you haven't done so already and enter the Slack channel you would like to post to under the `Slack` Step > `Advanced Options`.
- Optionally customize the slack notification message in the `Transform: Slack Message` Step.
