# Salesforce - Leads
Create a Shopify Customer when a Salesforce Lead is converted to Contact

[![Integrate with Mesa](https://www.getmesa.com/images/integrate.png)<br>Install this library now in Mesa](https://getmesa.com/install/shoppad/mesa-recipes/salesforce/leads/create-shopify-customer)

## Setup

Authorizing with Salesforce (password auth):
- You will need to create a connected app in Salesforce
- Click on the Setup buutton (gear icon - top right)
- Navigate to "Apps", then click "New Connnected App"
- Enable OAuth Settings, add all scopes
- Add https://dev-www.theshoppad.com/apps/oauth/ as a callback URL @TODO: what is the production URL?
- Save the application, then get the client ID and client secret
- Open up Mesa, then navigate to the Secrets tab
- Save the client ID, with the key being "salesforce_client_id"
- Save the client secret, with the key being "salesforce_client_secret"
- Save your Salesforce username, with the key being "salesforce_username"
- Save your Salesforce password, with the key being "salesforce_password"

@TODO: document Authorizing with Salesforce (refresh token auth):

Setting up workflows in Salesforce in order to recieve webhooks:
- Open up your Salesforce instance
- Click on the Setup buutton (gear icon - top right)
- Head over to "Process Automation", then to "Workflow Actions"
- Create an "Outbound Message" for the "Lead" object, and set the "Endpoint URL" to the webhook URL that is seen in your the Mesa Input's settings
- Create a "WorkFlow Rule" for "Lead" object
- Set the "Rule Criteria" to "Lead: Converted EQUALS True"
- Tie the "WorkFlow Rule" to the "Outbound Message"

## Developing 
[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=in-send-salesforce-contact-to-shopify \
    --outputs=out-send-salesforce-contact-to-shopify \
    --files=salesforce/in/in-send-salesforce-contact-to-shopify.js,salesforce/in/in-send-salesforce-contact-to-shopify.js \
    --secrets=salesforce_client_id,salesforce_client_secret,salesforce_username,salesforce_password
```