## Connect to Salesforce with an oAuth refresh token (recommended):
- You will need to create a connected app in Salesforce.
    - Click on the Setup button (gear icon located in the top right corner of the Salesforce dashboard).
    - Navigate to "Apps" and "App Manager." 
    - Click on "New Connnected App" (located in the top right hand corner within Setup). 
    - Fill out the following fields: "Connected App Name," "API Name," and "Contact Email."
    - Mark the "Enable OAuth Settings" checkbox and add all oAuth scopes.
    - Add https://www.theshoppad.com/apps/mesa/oauth/ as a Callback URL.
    - Save the application, then obtain the Consumer key and Consumer secret.
- Navigate to https://www.theshoppad.com/apps/mesa/oauth/salesforce/shoppad/mesa-templates/salesforce/lead/send-to-shopify-customer.
- Enter your store's URL (e.g. mystore.myshopify.com), and paste the Consumer ID key and secret key. (May take some time for your connected app to establish)
- You will be redirected to your back to your "Send Order To Sales Opportunity" Automation in the Mesa Dashboard.
- Verify that your Secrets have been properly saved: `salesforce-client-id`, `salesforce-client-secret`, `salesforce-username`, `salesforce-password`.
- Save your Salesforce instance's URL as the `salesforce-instance` Storage item.

## Connect to Salesforce with using the username/password method:
- You will need to create a connected app in Salesforce.
    - Click on the Setup button (gear icon located in the top right corner of the Salesforce dashboard).
    - Navigate to "Apps" and "App Manager." 
    - Click on "New Connnected App" (located in the top right hand corner within Setup). 
    - Fill out the following fields: "Connected App Name," "API Name," and "Contact Email."
    - Mark the "Enable OAuth Settings" checkbox and add all oAuth scopes.
    - Add https://www.theshoppad.com/apps/mesa/oauth/ as a Callback URL.
    - Save the application, then obtain the Consumer key and Consumer secret.
- Under "Secrets", save the client ID as `salesforce_client_id`.
- Save the client secret as `salesforce_client_secret`.
- Save your Salesforce username as `salesforce_username`.
- Save your Salesforce password as `salesforce_password`.
- Save your Salesforce instance's URL as the `salesforce-instance` Storage item.

## Optional Customizations
- Map additional fields by editing the `shopify-salesforce-opportunity-map.js` script.