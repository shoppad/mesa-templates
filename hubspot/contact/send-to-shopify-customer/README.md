# Send Contact To Shopify Customer

Send contact from HubSpot to Shopify Customer when contact is created or updated.

---
## Setup 
- To allow this automation to access HubSpot, get an API key from your HubSpot installation. You will need to be a HubSpot Super Admin to do this. Instructions: https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key
- Once you have the API key, go to the Mesa Dashboard, navigate to Automations > "Send Contact To Shopify Customer"
- Under "Secrets", save the client ID as `hubspot-hapi`
- Enable the Automation by clicking the "Enabled" switch on the right hand side beneath "Automation Details"
- Go to the Input named "Install" and click "Test" (leave "Pass a Payload to the Test" unchecked"). This will install a workflow in HubSpot, which will call our own webhook, and then create the customer in HubSpot 
- To verify that the installation, check in HubSpot that a workflow named 'Mesa Contact Created' and 'Mesa Contact Updated' workflows have been created and is enabled (in HubSpot, go to "Automation" and "Workflows" at the top)
- If the workflows are not there, please check the logs for any errors.
- Once you create a HubSpot contact, you should start receiving data within a few minutes.

## Optional Customizations
- You may map additional fields from HubSpot to Shopify by editing the `hubspot-shopify-create-customer-mapping.json` and / or `hubspot-shopify-update-customer-mapping.json` data under "Storage".

## Additional Notes
- If a HubSpot contact's email is changed, this will create a new customer in Shopify.