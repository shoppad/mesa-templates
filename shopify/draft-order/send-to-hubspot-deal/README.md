# Send Draft Order To Hubspot Deal

Send draft order from Shopify to HubSpot Deal when draft order is created.

---
## Setup
- To allow this automation to create HubSpot data, get an API key from your HubSpot installation. You will need to be a HubSpot Super Admin to do this. Instructions: https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key
- Once you have the API key, go to the Mesa Dashboard, navigate to Automations > "Send Draft Order To HubSpot Deal"
- Under "Secrets", save the client ID as `hubspot-hapi`
- Enable the Automation by clicking the 'Enabled' switch on the right hand side beneath "Automation Details"
- Create a draft order in your Shopify store, then check the Mesa logs and HubSpot

## Additional information
- If the draft order has an email associated with it, the automation will check if a HubSpot contact exists and associate the contact with the deal being created. 
- If no contact is found, and `hubspot-create-deal-without-contact` is set to `true`, the deal will still be created. If `hubspot-create-deal-without-contact`is set to `false`, then the deal will not be created and an error will be logged. By default, the `hubspot-create-deal-without-contact` is set to `true`.
- If you wish to create a contact for any new customers (based on the draft order's email address), please install and enable one of the "Send Customer To HubSpot Contact" or "Send Customer To HubSpot Contact and Mark as Opportunity" automations. If the customer is new, Shopify will send the customer data first, then the draft order data, so when this automation runs, the contact will be created already in HubSpot.

## Optional Customizations
- This automation creates a simple HubSpot deal, using Shopify draft order data (see `shopify-hubspot-draft-order-mapping.json` in "Storage"), and data defined in the "Storage" section.
- The following defaults are used
  - HubSpot deal type (`hubspot-deal-type`): default value = `newbusiness`  
  - HubSpot deal pipeline (`hubspot-deal-pipeline`): default value = `default`  
  - HubSpot deal stage (`hubspot-deal-stage`): default value = `closedwon`  
- To change these fields, see the sub-sections below
- You can add additional static data to `dealPostData` variable in the `out-create-hubspot-deal.js` script
- If you wish to map additional draft order data to hubspot deal properties, you can add mappings to `shopify-hubspot-draft-order-mapping.json` in "Storage"


### Changing the HubSpot deal type
- To find your available HubSpot deal types, log into HubSpot, navigate to Settings (gear icon in top right corner, you may need admin privileges for this)
- Click on "Properties", and on the "Filter by" dropdown, select "Deal properties"
- Search for "Deal type", then click on "Deal type"
- On the "Field type" tab, look for the list of deal type values (in the table, with the columns "Label" and "With value")
- Click on the `</>` text for the deal type you wish to use, and copy the value under "Option value"
- Go to the Mesa Dashboard, navigate to Automations > "Send Draft Order To Hubspot Deal" 
- Under "Storage", update the value for "hubspot-deal-type" to the copied value, and click "Save".

### Changing the HubSpot deal pipeline
- To find your available HubSpot deal pipeline, log into HubSpot, navigate to Settings.
- Click on "Sales" then "Deals".
- Under "Deal Pipelines and Stages", click on the pipeline you want to send deals to.
- In your browser's address bar, copy the last part of the URL, after "deals". For example, for the URL "https://app.hubspot.com/sales-products-settings/6588559/deals/", copy "deals"
- Go to the Mesa Dashboard, navigate to Automations > "Send Draft Order To Hubspot Deal" 
- Under "Storage", update the value for "hubspot-deal-pipeline" to the copied value, and click "Save".

### Changing the HubSpot deal stage
- To find your available HubSpot deal pipeline, log into HubSpot, navigate to Settings.
- Click on "Sales" then "Deals".
- Under "Deal Pipelines and Stages", click on the pipeline you want to send deals to.
- Hover the mouse next to the stage you want to use, and you should see a link with `</>`.
- Click on this link. In the resulting popup, copy the text under "Stage id"
- Go to the Mesa Dashboard, navigate to Automations > "Send Draft Order To Hubspot Deal" 
- Under "Storage", update the value for "hubspot-deal-stage" to the copied value, and click "Save".
