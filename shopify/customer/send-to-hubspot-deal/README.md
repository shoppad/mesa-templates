# Send Customer To Hubspot Deal

Send customer from Shopify to HubSpot Deal when customer is created.

---
## Setup
- To allow this automation to create HubSpot data, get an API key from your HubSpot installation. You will need to be a HubSpot Super Admin to do this. Instructions: https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key
- Once you have the API key, go to the Mesa Dashboard, navigate to Automations > "Send Customer To HubSpot Deal"
- Under "Secrets", save the client ID as `hubspot-hapi`
- Enable the Automation by clicking the 'Enabled' switch on the right hand side beneath "Automation Details"
- Create a customer in your Shopify store, then check the Mesa logs and HubSpot

## Additional information
1. This automation will attempt to create a contact first
   - If the contact does not exist, contact will be created, and the contact ID will be used  
   - If the contact already exists, the automation will take the ID of the existing contact  
2. Automation will then create the deal using the contact ID from step 1

## Optional Customizations
- This automation covers standard HubSpot contact fields. If your HubSpot contacts are setup with additional properties, you can map these additional fields by editing the `shopify-hubspot-customer-contact-mapping.json` storage item
- This automation creates a simple HubSpot deal, using data defined in the "Storage" section. There are defaults as follows:
  - HubSpot deal type (`hubspot-deal-type`): default value = `newbusiness`  
  - HubSpot deal pipeline (`hubspot-deal-pipeline`): default value = `default`  
  - HubSpot deal stage (`hubspot-deal-stage`): default value = `appointmentscheduled`  
- To change these fields, see the sub-sections below
- You can add additional static data to `dealPostData` variable in the `out-create-hubspot-deal.js` script
- If you wish to map customer data to hubspot deal properties, you can add mappings to `shopify-hubspot-customer-deal-mapping.json` storage item

### Changing the HubSpot deal type
- To find your available HubSpot deal types, log into HubSpot, navigate to Settings (gear icon in top right corner, you may need admin privileges for this)
- Click on "Properties", and on the "Filter by" dropdown, select "Deal properties"
- Search for "Deal type", then click on "Deal type"
- On the "Field type" tab, look for the list of deal type values (in the table, with the columns "Label" and "With value")
- Click on the `</>` text for the deal type you wish to use, and copy the value under "Option value"
- Go to the Mesa Dashboard, navigate to Automations > "Send Customer To Hubspot Deal" 
- Under "Storage", update the value for "hubspot-deal-type" to the copied value, and click "Save".

### Changing the HubSpot deal pipeline
- To find your available HubSpot deal pipeline, log into HubSpot, navigate to Settings.
- Click on "Sales" then "Deals".
- Under "Deal Pipelines and Stages", click on the pipeline you want to send deals to.
- In your browser's address bar, copy the last part of the URL, after "deals". For example, for the URL "https://app.hubspot.com/sales-products-settings/6588559/deals/", copy "deals"
- Go to the Mesa Dashboard, navigate to Automations > "Send Customer To Hubspot Deal" 
- Under "Storage", update the value for "hubspot-deal-pipeline" to the copied value, and click "Save".

### Changing the HubSpot deal stage
- To find your available HubSpot deal pipeline, log into HubSpot, navigate to Settings.
- Click on "Sales" then "Deals".
- Under "Deal Pipelines and Stages", click on the pipeline you want to send deals to.
- Hover the mouse next to the stage you want to use, and you should see a link with `</>`.
- Click on this link. In the resulting popup, copy the text under "Stage id"
- Go to the Mesa Dashboard, navigate to Automations > "Send Customer To Hubspot Deal" 
- Under "Storage", update the value for "hubspot-deal-stage" to the copied value, and click "Save".
