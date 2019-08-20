# Send Customer To Salesforce Contact

Send Customer from Shopify to Salesforce contact when customer is created.

---
## Setup

### Connect to Salesforce with an oAuth refresh token (recommended):
1. You will need to create a connected app in Salesforce
2. Click on the Setup button (gear icon - top right)
3. Navigate to "Apps" and "App Manager", then click "New Connnected App". Enter "Connected App Name", "API Name" and "Contact Email"
4. Enable OAuth Settings, add all scopes
5. Add https://www.theshoppad.com/apps/mesa/oauth/ as a callback URL
6. Save the application, then get the client key and client secret
7. Navigate to https://www.theshoppad.com/apps/mesa/oauth/salesforce/shoppad/mesa-templates/shopify/customer/send-to-salesforce-contact.
8. Enter your store's URL (e.g. mystore.myshopify.com), and the client ID key and secret key from step #6
9. Follow the steps, entering your salesforce username and password.
10. You will be redirect to your new "Send Customer To Salesforce Contact" Automation in the Mesa Dashboard
11. Verify that your secrets have been properly saved: `salesforce-client-id`, `salesforce-client-secret`, `salesforce-username`, `salesforce-password`

### Connect to Salesforce with using the username/password method:
1. You will need to create a connected app in Salesforce
2. Click on the Setup button (gear icon - top right)
3. Navigate to "Apps" and "App Manager", then click "New Connnected App". Enter "Connected App Name", "API Name" and "Contact Email"
4. Enable OAuth Settings, add all scopes
5. Add https://www.theshoppad.com/apps/mesa/oauth/ as a callback URL
6. Save the application, then get the client key and client secret
7. In the Mesa Dashboard, navigate to Automations > "Send Customer To Salesforce Contact"
8. Under "Secrets", save the client ID as `salesforce_client_id`
9. Save the client secret as `salesforce_client_secret`
10. Save your Salesforce username as `salesforce_username`
11. Save your Salesforce password as `salesforce_password`
