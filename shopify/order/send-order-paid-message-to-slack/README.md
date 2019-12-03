## Setup

- [Create a connected app in Slack](https://api.slack.com/apps/new).
- Enable **Incoming Webhooks** from the settings page.
- Click **Add New Webhook to Workspace**.
- Select a channel that the app will post to and click Authorize.
- Click **Copy** near your Webhook URL and paste the value as a Secret, with the key as "slack-webhook-url."
- Save the slack channel name you wish to use (for example "#order-paid") as a Storage item, with the key as "slack-channel."
- Enable the automation.

## Slack message formatting

- Under Scripts you'll find the file `out-send-slack-notification.js`. By default this script will send a [richly formatted Slack notification](https://api.slack.com/docs/message-formatting#message_formatting) with buttons and text formatting.
- If you prefer a simple Slack message, you can click on the **out-send-slack-notifications.js** file. Comment out the code in the block "BEGIN Comprehensive Slack request" and uncomment the code under "BEGIN Simple slack request (uncomment code below to enable)".
