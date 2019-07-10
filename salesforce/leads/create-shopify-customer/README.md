# Salesforce - Leads
Creates or updates a Shopify Customer when a Salesforce Lead is converted to a Contact

[![Integrate with Mesa](https://www.getmesa.com/images/integrate.png)<br>Install this library now in Mesa](https://getmesa.com/install/shoppad/mesa-recipes/salesforce/leads/create-shopify-customer)

## Setup

Authorizing with Salesforce (password auth):
- You will need to create a connected app in Salesforce
- Click on the Setup buutton (gear icon - top right)
- Navigate to "Apps", then click "New Connnected App"
- Enable OAuth Settings, add all scopes
- Add https://dev-www.theshoppad.com/apps/oauth/ as a callback URL @TODO: what is the production URL?
- Save the application, then get the client ID and client secret
- Open up Mesa, then navigate to the "Secrets" tab
- Save the client ID, with the key being "salesforce_client_id"
- Save the client secret, with the key being "salesforce_client_secret"
- Save your Salesforce username, with the key being "salesforce_username"
- Save your Salesforce password, with the key being "salesforce_password"

@TODO: document Authorizing with Salesforce (refresh token auth):

Setting up workflows in Salesforce in order to recieve webhooks:
- Open up your Salesforce instance
- Click on the Setup button (gear icon - top right)
- Head over to "Process Automation", then to "Workflow Actions"
- Create an "Outbound Message" for the "Lead" object, and set the "Endpoint URL" to the webhook URL that is seen in the "Create Shopify Customer On Salesforce Lead Conversion" Input
- Create a "Workflow Rule" for "Lead" object
- Set the "Rule Criteria" to "Lead: Converted EQUALS True"
- Navigate to the new "Workflow Rule" and click on the "Add Worflow action" > "Select Existing Action", then select the newly created "Outbound Message"

## Developing 
[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=in-create-shopify-customer-on-salesforce-lead-conversion \
    --outputs=out-create-shopify-customer-on-salesforce-lead-conversion \
    --files=salesforce/leads/create-shopify-customer/in-create-shopify-customer-on-salesforce-lead-conversion.js,salesforce/leads/create-shopify-customer/out-create-shopify-customer-on-salesforce-lead-conversion.js \
```