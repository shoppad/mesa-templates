## Setup: Connect to Salesforce with an oAuth refresh token (recommended):
- You will need to create a connected app in Salesforce.
- Click on the Setup button (gear icon - top right).
- Navigate to "Apps" and "App Manager", then click "New Connnected App". Enter "Connected App Name", "API Name" and "Contact Email."
- Enable OAuth Settings, add all scopes.
- Add https://www.theshoppad.com/apps/mesa/oauth/ as a callback URL.
- Save the application, then get the client key and client secret.
- Navigate to https://www.theshoppad.com/apps/mesa/oauth/salesforce/shoppad/mesa-templates/shopify/customer/send-to-salesforce-contact.
- Enter your store's URL (e.g. mystore.myshopify.com), and the client ID key and secret key from step #6.
- Follow the steps, entering your salesforce username and password.
- You will be redirect to your new "Send Customer To Salesforce Contact" Automation in the Mesa Dashboard.
- Verify that your secrets have been properly saved: `salesforce-client-id`, `salesforce-client-secret`, `salesforce-username`, `salesforce-password`.

## Setup: Connect to Salesforce with using the username/password method:
- You will need to create a connected app in Salesforce.
- Click on the Setup button (gear icon - top right).
- Navigate to "Apps" and "App Manager", then click "New Connnected App". Enter "Connected App Name", "API Name" and "Contact Email."
- Enable OAuth Settings, add all scopes.
- Add https://www.theshoppad.com/apps/mesa/oauth/ as a callback URL.
- Save the application, then get the client key and client secret.
- In the Mesa Dashboard, navigate to Automations > "Send Customer To Salesforce Contact."
- Under "Secrets", save the client ID as `salesforce_client_id`.
- Save the client secret as `salesforce_client_secret`.
- Save your Salesforce username as `salesforce_username`.
- Save your Salesforce password as `salesforce_password`.`
