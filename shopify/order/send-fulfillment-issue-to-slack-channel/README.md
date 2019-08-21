# Send Slack notification for unfulfilled orders
Checks orders and sends a Slack notification if order is not fulfilled after a set period of time.

[![Automate with Mesa](https://www.getmesa.com/images/integrate.png)<br>Get the Template](https://www.getmesa.com/install/shoppad/mesa-templates/shopify/order/send-slack-when-unfulfilled-for-n-days)

## Setup

### Slack Setup
- Install per the link above
- If you haven't done so previously, you will need to create a connected app in Slack (follow [these steps](https://developers.getmesa.com/libraries/Slack-1.0.0.html))
- Open up Mesa, then navigate to the Automations tab and locate this Automation
- Save the incoming Webhook URL as a secret, with the key being "slack-webhook-url"
- Save the slack channel name you wish to use (for example "#unfulfilled-orders"), with the key being "slack-channel"

### Optional Configuration
#### Changing the date range for unfulfilled orders
- By default, orders only 7 days or older will be sent to Slack if unfulfilled. 
- To change this, find Orders Virtual Output
- Under advanced, change the parameters to filter when orders should be checked for fulfillment
- For instance, to check for orders at least 3 days old, but no older than 1 month, type "limit=-1&created_at_min={date:1 month ago},created_at_max={date:3 days ago}". Further details on date syntax can be found under [Virtual Outputs](https://docs.getmesa.com/article/597-outputs#output4)
#### Slack message formatting
- Under Scripts you'll find the file `out-send-slack-notification.js`. By default this script will send a richly formatted Slack notification with buttons and text formatting. 
- If you prefer a simple Slack message, you can comment out the code in the block "BEGIN Comprehensive Slack request" and uncomment code under "BEGIN Simple slack request (uncomment code below to enable)"

## Developing 
[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem: