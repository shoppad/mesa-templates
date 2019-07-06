# Salesforce - Create Contacts from Shopify Customers

[![Integrate with Mesa](https://www.getmesa.com/images/integrate.png)<br>Install this recipe now in Mesa](https://getmesa.com/install/shoppad/mesa-recipes/salesforce/contacts/out)

## Setup

Authorizing with Salesforce (password):
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