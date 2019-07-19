# Send Salesforce Contact to Shopify Customer

Sends a Salesforce contact to a Shopify customer record.

[![Automate with Mesa](https://www.getmesa.com/images/integrate.png)<br />Get the Template](https://www.getmesa.com/install/shoppad/mesa-templates/salesforce/contacts/send-to-shopify-customer)

## Setup

###Authorizing with Salesforce (password auth):
1. You will need to create a connected app in Salesforce
2. Click on the Setup button (gear icon - top right)
3. Navigate to "Apps", then click "New Connnected App"
4. Enable OAuth Settings, add all scopes
5. Add https://www.theshoppad.com/apps/oauth/ as a callback URL
6. Save the application, then get the client ID and client secret
7. Open up Mesa, then navigate to the Secrets tab
8. Save the client ID, with the key being "salesforce_client_id"
9. Save the client secret, with the key being "salesforce_client_secret"
10. Save your Salesforce username, with the key being "salesforce_username"
11. Save your Salesforce password, with the key being "salesforce_password"

###Setting up workflows in Salesforce in order to recieve webhooks:
1. Open up your Salesforce instance
2. Click on the Setup button (gear icon - top right)
3. Head over to "Process Automation", then to "Workflow Actions"
4. Create an "Outbound Message"
5. Create a "WorkFlow Rule"
6. Tie the "WorkFlow Rule" to the "Outbound Message"

@TODO: document Authorizing with Salesforce (refresh token auth):

## Developing 
[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=in-send-salesforce-contact-to-shopify \
    --outputs=out-send-salesforce-contact-to-shopify \
    --files=salesforce/in/in-send-salesforce-contact-to-shopify.js,salesforce/in/in-send-salesforce-contact-to-shopify.js \
    --secrets=salesforce_client_id,salesforce_client_secret,salesforce_username,salesforce_password
```