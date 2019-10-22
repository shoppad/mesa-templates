# Send Order To Hubspot Deal

Send order from Shopify to HubSpot Deal when order is created.

---
## Setup
1. To allow this automation to create HubSpot data, get an API key from your HubSpot installation. You will need to be a HubSpot Super Admin to do this. Instructions: https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key
2. Once you have the API key, go to the Mesa Dashboard, navigate to Automations > "Send Order To HubSpot Deal"
3. Under "Secrets", save the client ID as `hubspot.hapi`
4. Enable the Automation by clicking the 'Enabled' switch on the right hand side beneath "Automation Details"
5. Create an order in your Shopify store, then check the Mesa logs and HubSpot

## Additional information
- If the order has an email associated with it, the automation will check if a HubSpot contact exists and associate the contact with the deal being created. 
- If no contact is found, and `hubspot_create_deal_without_contact` is set to `true`, the deal will still be created. If `hubspot_create_deal_without_contact`is set to `false`, then the deal will not be created and an error will be logged. By default, the `hubspot_create_deal_without_contact` is set to `true`.
- If you wish to create a contact for any new customers (based on the order's email address), please install and enable one of the "Send Customer To HubSpot Contact" or "Send Customer To HubSpot Contact and Mark as Opportunity" automations. If the customer is new, Shopify will send the customer data first, then the order data, so when this automation runs, the contact will be created already in HubSpot.

## Optional Customizations
- This automation creates a simple HubSpot deal, using Shopify order data (see `shopify-hubspot-customer-deal-map.js`), and data defined in the "Storage" section.
- The following defaults are used
  - HubSpot deal type (`hubspot_deal_deal_type`): default value = `newbusiness`  
  - HubSpot deal pipeline (`hubspot_deal_pipeline`): default value = `default`  
  - HubSpot deal stage (`hubspot_deal_deal_stage`): default value = `closedwon`  
- To change these fields, see the sub-sections below
- You can add additional static data to `dealPostData` variable in the `out-create-hubspot-deal.js` script
- If you wish to map additional order data to hubspot deal properties, you can add mappings to `shopify-hubspot-customer-deal-map.js`


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
