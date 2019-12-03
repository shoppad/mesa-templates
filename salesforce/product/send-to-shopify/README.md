## Setup
- Enable the Automation in the right sidebar and click **Save**.

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
- You will be redirected to your back to your "Send Salesforce Lead To Shopify Customer" Automation in the Mesa Dashboard.
- Verify that your Secrets have been properly saved: `salesforce-client-id`, `salesforce-client-secret`, `salesforce-username`, `salesforce-password`.
- Save your Salesforce instance's URL as the `salesforce-instance` Storage Item.

## Setting up workflows in Salesforce in order to recieve webhooks:
- Open up your Salesforce instance.
- Click on the Setup button (gear icon located in the top right corner of the Salesforce dashboard).
- Navigate to "Process Automation", click on "Workflow Actions."
- Click on Outbound Messages.
- Click on "New Outbound Message."
- Tie the "WorkFlow Rule" to the "Outbound Message."

## Optional Customizations
- Map additional fields by editing the `salesforce-shopify-customer-map.js` script.