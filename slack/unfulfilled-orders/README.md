# Salesforce - Contacts - In
Send Slack alerts for unfulfilled orders after a configurable period of time

[![Integrate with Mesa](https://www.getmesa.com/images/integrate.png)<br>Install this library now in Mesa](https://getmesa.com/install/shoppad/mesa-actions/slack/unfulfilled-orders)

## Setup

### Slack Setup
- Install per the link above
- If you haven't done so previously, you will need to create a connected app in Slack (follow [these steps](https://developers.getmesa.com/libraries/Slack-1.0.0.html))
- Open up Mesa, then navigate to the Secrets tab
- Save the incoming Webhook URL as a secret, with the key being "slack-webhook-url"
- Navigate to the Storage tab
- Save the slack channel name you wish to use (for example "#unfulfilled-orders"), with the key being "slack-unfulfilled-orders-channel"

### Optional Configuration
- Navigate to the Outputs tab and expand "Orders Slack Created'
- Under advanced, change the parameters to filter when orders should be checked for fulfillment
- For instance, to check for orders at least 1 week old, type "limit=-1&created_at_max={date:7 days ago}". Further details on date syntax can be found under [Virtual Outputs](https://docs.getmesa.com/article/597-outputs#output4)
- Under Scripts you'll find the file `out-orders-slack-check-fulfilled.js`. By default this script will send a richly formatted Slack notification with buttons and text formatting. 
- If you prefer a simple Slack message, you can comment out the code in the block "BEGIN Comprehensive Slack request" and uncomment code under "BEGIN Simple slack request (uncomment code below to enable)".

## Developing 
[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize 
    --inputs=in-orders-slack-created \
    --outputs=out-orders-slack-created-vo,out-orders-slack-check-fulfilled \
    --files=slack/unfulfilled-orders/in-orders-slack-created.js,slack/unfulfilled-orders/out-orders-slack-created.js,slack/unfulfilled-orders/out-orders-slack-check-fulfilled.js \
    --storage=slack-unfulfilled-orders-channel \
    --secrets=slack-webhook-url
```