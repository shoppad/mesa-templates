# Send Product To Shopify Product

Send product from Salesforce to Shopify Product when product is created.

---
## Setup

### Connect to Salesforce with an oAuth refresh token (recommended):
1. You will need to create a connected app in Salesforce
2. Click on the Setup button (gear icon - top right)
3. Navigate to "Apps" and "App Manager", then click "New Connnected App". Enter "Connected App Name", "API Name" and "Contact Email"
4. Enable OAuth Settings, add all scopes
5. Add https://www.theshoppad.com/apps/mesa/oauth/ as a callback URL
6. Save the application, then get the client key and client secret
7. Navigate to https://www.theshoppad.com/apps/mesa/oauth/salesforce/shoppad/mesa-templates/salesforce/product/send.
8. Enter your store's URL (e.g. mystore.myshopify.com), and the client ID key and secret key from step #6
9. Follow the steps, entering your salesforce username and password.
10. You will be redirect to your new "Send Product To Shopify Product" Automation in the Mesa Dashboard
11. Verify that your secrets have been properly saved: `salesforce-client-id`, `salesforce-client-secret`, `salesforce-username`, `salesforce-password`
12. Save your Salesforce instance's URL as the `salesforce-instance` Storage item

### Setting up workflows in Salesforce in order to recieve webhooks:
1. Open up your Salesforce instance
2. Click on the Setup button (gear icon - top right)
3. Head over to "Process Automation", then to "Workflow Actions"
4. Create an "Outbound Message"
5. Create a "WorkFlow Rule"
6. Tie the "WorkFlow Rule" to the "Outbound Message"

## Optional Customizations

- Map additional fields by editing the `salesforce-shopify-product-map.js` script.