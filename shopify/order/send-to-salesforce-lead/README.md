# Send Order To Salesforce Lead

Send Order from Shopify to Salesforce Lead when order is created.

---
## Setup

### Connect to Salesforce
1. You will need to create a connected app in Salesforce.
2. Click on the Setup button (gear icon - top right)
3. Navigate to "Apps" and "App Manager", then click "New Connnected App". Enter "Connected App Name", "API Name" and "Contact Email"
4. Enable OAuth Settings, add all scopes
5. Add https://www.theshoppad.com/apps/mesa/oauth/ as a callback URL
6. Save the application, then get the client key and client secret
7. In your Mesa Automation, scroll down to "Secrets", click "Add", then select "OAuth Token"
8. In the dropdown, select "Salesforce - Custom Applications"
9. For Client ID and Secret, enter the client key and secret from Salesforce
10. For Authorization URL, enter "https://login.salesforce.com/services/oauth2/authorize"
11. For Token URL, enter "https://login.salesforce.com/services/oauth2/token"
12. Click "Add OAuth Token", then follow the steps to login to your store (if you are not logged in already)
13. Verify the following secret has been created: `salesforce.oauth`
14. In the output, select this secret from the dropdown for "Authenticate" and save the automation