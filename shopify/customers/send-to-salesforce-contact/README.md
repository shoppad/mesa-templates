# Send Shopify Customers to Salesforce

Sends Shopify customers to Salesforce contacts when they're created and updates them if there are edits.

[![Automate with Mesa](https://www.getmesa.com/images/integrate.png)<br />Get the Template](https://www.getmesa.com/install/shoppad/mesa-templates/shopify/customers/send-to-salesforce-contact)

## Setup

### Authorizing with Salesforce (password):
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

@TODO: document Authorizing with Salesforce (refresh token):

## Developing 
[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=in-send-shopify-customer-to-salesforce \
    --outputs=out-send-shopify-customer-to-salesforce \
    --files=salesforce/out/in-send-shopify-customer-to-salesforce.js,salesforce/out/out-send-salesforce-contact-to-shopify.js,salesforce/contacts/out/shopify-salesforce-customer-map.js \
    --secrets=salesforce_client_id,salesforce_client_secret,salesforce_username,salesforce_password,salesforce_access_token
```