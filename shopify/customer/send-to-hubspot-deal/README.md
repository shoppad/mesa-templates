# Send Customer To Hubspot Deal

Send customer from Shopify to HubSpot Deal when customer is created.

---
## Setup
1. To allow this automation to create HubSpot contacts, get an API key from your HubSpot installation. You will need to be a HubSpot Super Admin to do this. Instructions: https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key
2. Once you have the API key, go to the Mesa Dashboard, navigate to Automations > "Send Customer To HubSpot Deal"
3. Under "Secrets", save the client ID as `hubspot.api`
4. Enable the Automation by clicking the 'Enabled' switch on the right hand side beneath "Automation Details"
5. Create a customer in your Shopify store, then check the Mesa logs and HubSpot

## Additional information
1. This automation will attempt to create a contact first
   - If the contact does not exist, contact will be created, and the contact ID will be used  
   - If the contact already exists, the automation will take the ID of the existing contact  
2. Automation will then create the deal using the contact ID from step 1

## Optional Customizations
- This automation covers standard HubSpot contact fields. If your HubSpot contacts are setup with additional properties, you can map these additional fields by editing the `shopify-hubspot-customer-map.js` script
- This automation creates a simple HubSpot deal, using data defined in the "Storage" section. There are defaults as follows:
  - HubSpot deal type (`hubspot_deal_deal_type`): default value = `newbusiness`  
  - HubSpot deal type (`hubspot_deal_pipeline`): default value = `default`  
  - HubSpot deal type (`hubspot_deal_deal_stage`): default value = `appointmentscheduled`  
- To change these fields, see the sub-sections below
- You can add additional static data to `dealPostData` variable in the `out-create-hubspot-deal.js` script
- If you wish to map customer data to hubspot deal properties, you can add mappings to `shopify-hubspot-customer-deal-map.js`

### Changing the HubSpot deal type
1. To find your available HubSpot deal types, log into HubSpot, navigate to Settings (gear icon in top right corner, you may need admin privileges for this)
2. Click on "Properties", and on the "Filter by" dropdown, select "Deal properties"
3. Search for "Deal type", then click on "Deal type"
4. On the "Field type" tab, look for the list of deal type values (in the table, with the columns "Label" and "With value")
5. Click on the `</>` text for the deal type you wish to use, and copy the value under "Option value"
6. Go to the Mesa Dashboard, navigate to Automations > "Send Customer To Hubspot Deal" 
7. Under "Storage", update the value for "hubspot_deal_deal_type" to the copied value, and click "Save".

### Changing the HubSpot deal pipeline
1. To find your available HubSpot deal pipeline, log into HubSpot, navigate to Settings.
2. Click on "Sales" then "Deals".
3. Under "Deal Pipelines and Stages", click on the pipeline you want to send deals to.
4. In your browser's address bar, copy the last part of the URL, after "deals". For example, for the URL "https://app.hubspot.com/sales-products-settings/6588559/deals/", copy "deals"
5. Go to the Mesa Dashboard, navigate to Automations > "Send Customer To Hubspot Deal" 
6. Under "Storage", update the value for "hubspot_deal_pipeline" to the copied value, and click "Save".

### Changing the HubSpot deal stage
1. To find your available HubSpot deal pipeline, log into HubSpot, navigate to Settings.
2. Click on "Sales" then "Deals".
3. Under "Deal Pipelines and Stages", click on the pipeline you want to send deals to.
4. Hover the mouse next to the stage you want to use, and you should see a link with `</>`.
5. Click on this link. In the resulting popup, copy the text under "Stage id"
6. Go to the Mesa Dashboard, navigate to Automations > "Send Customer To Hubspot Deal" 
7. Under "Storage", update the value for "hubspot_deal_deal_stage" to the copied value, and click "Save".
