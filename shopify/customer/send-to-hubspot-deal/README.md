## Setup
- To allow this automation access HubSpot, get an API key from your HubSpot installation. You will need to be a [HubSpot Super Admin to do this](https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key).
- Copy and paste your API key as the `hubspot-hapi` Secrets value.
- Enable the Automation in the right sidebar and click **Save**.

## Additional information
- First Step: Automation will attempt to create a contact first.
   - If the contact does not exist, contact will be created, and the contact ID will be used.  
   - If the contact already exists, the automation will take the ID of the existing contact.  
- Second Step: Automation will then create the deal using the contact ID from the first step.

## Optional Customizations
- This automation covers standard HubSpot contact fields. If your HubSpot contacts are setup with additional properties, you can map these additional fields by editing the `customer-contact-mapping.json` Storage item.
- This automation creates a simple HubSpot deal, using data defined in the "Storage" section. 
- The following defaults are used:
  - HubSpot deal type (`hubspot-deal-type`): default value = `newbusiness`  
  - HubSpot deal pipeline (`hubspot-deal-pipeline`): default value = `default`  
  - HubSpot deal stage (`hubspot-deal-stage`): default value = `appointmentscheduled`  
- To change these fields, you can edit the Storage items below. 
- You can add additional static data to `dealPostData` variable in the `out-create-hubspot-deal.js` script.
- If you wish to map customer data to hubspot deal properties, you can add mappings to `customer-deal-mapping.json` Storage item.

### Changing the HubSpot deal type
- To find your available HubSpot deal types, go to your HubSpot dashboard, and navigate to Settings (gear icon in the top banner, you may need admin privileges for this).
- Click on `Properties`, `Filter by` dropdown, and then select `Deal properties`.
- Search for "Deal type", then click on `Deal type`.
- On the "Field type" tab, look for the list of deal type values (in the table, with the columns "Label" and "With value").
- Click on the `</>` text for the deal type you wish to use, and copy the value under "Internal name."
- On the Mesa dashboard, update the value for the `hubspot-deal-type` Storage item to the copied value, and click `Save`.

### Changing the HubSpot deal pipeline
- To find your available HubSpot deal pipeline, go to your HubSpot dashboard, and navigate to Settings (gear icon in the top banner, you may need admin privileges for this).
- Click on `Sales` then `Deals`.
- Under "Deal Pipelines and Stages", click on the pipeline you want to send deals to.
- In your browser's address bar, copy the last part of the URL, after "deals". For example, for the URL "https://app.hubspot.com/sales-products-settings/6588559/deals/", copy "deals."
- On the Mesa dashboard, update the value for the `hubspot-deal-pipeline` Storage item to the copied value, and click `Save`.

### Changing the HubSpot deal stage
- To find your available HubSpot deal pipeline, go to your HubSpot dashboard, and navigate to Settings (gear icon in the top banner, you may need admin privileges for this).
- Click on `Sales` and then `Deals`.
- Under "Deal Pipelines and Stages", click on the pipeline you want to send deals to.
- Hover the mouse next to the stage you want to use, and you should see a link with `</>`.
- Click on this link. In the resulting popup, copy the text under "Internal id."
- On the Mesa dashboard, update the value for the `hubspot-deal-stage` Storage item to the copied value, and click `Save`.
