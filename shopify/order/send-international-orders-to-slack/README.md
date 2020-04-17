## Setup
- [Create a connected app in Slack](https://api.slack.com/apps/new).
- Enable **Incoming Webhooks** from the settings page.
- Click **Add New Webhook to Workspace**.
- Select a channel that the app will post to and click **Authorize**.
- Click **Copy** near your Webhook URL and paste the value in the `slack-webhook-url` Credential (located under the Credentials tab).
- Save the slack channel name you wish to use (for example "#order-paid") as a Storage Item, with the key as `slack-channel`.
- Enable the Automation in the right sidebar and click **Save**.

## Optional Customizations
- Change the country to filter by changing the the two-letter country code in the Filter Step. For example: **US** for the United States, **FR** for France, etc. [View a list of country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Current_codes).