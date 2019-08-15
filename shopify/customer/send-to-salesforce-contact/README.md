# Send Customer To Salesforce Contact

Send Customer from Shopify to Salesforce contact when customer is created.

[![Automate with Mesa](https://www.getmesa.com/images/integrate.png)<br />Get the Template](https://www.getmesa.com/install/shoppad/mesa-templates/shopify/customer/send-to-salesforce-contact)
---
## Setup

### Authorizing with Salesforce (password):
1. You will need to create a connected app in Salesforce
2. Click on the Setup button (gear icon - top right)
3. Navigate to "Apps" and "App Manager", then click "New Connnected App". Enter "Connected App Name", "API Name" and "Contact Email"
4. Enable OAuth Settings, add all scopes
5. Add https://www.theshoppad.com/apps/mesa/oauth/ as a callback URL
6. Save the application, then get the client key and client secret
7. Navigate to https://www.theshoppad.com/apps/mesa/oauth/salesforce.
8. Enter your store's URL (e.g. mystore.myshopify.com), and the client ID / key and secret
9. Follow the steps, entering your salesforce username and password.
9. Open up Mesa, navigate to Automations, then "Send Customer To Salesforce Contact" tab
9. In "Secrets", save the client ID, with the key being "salesforce_client_id"
10. Save the client secret, with the key being "salesforce_client_secret"
11. Save your Salesforce username, with the key being "salesforce_username"
12. Save your Salesforce password, with the key being "salesforce_password"

@TODO: document Authorizing with Salesforce (refresh token):