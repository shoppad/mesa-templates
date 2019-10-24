# Send Customer To Hubspot Contact And Mark As Opportunity

Send customer from Shopify to HubSpot Contact and mark as opportunity when customer is created.

---
## Setup
- To allow this automation to create HubSpot data, get an API key from your HubSpot installation. You will need to be a HubSpot Super Admin to do this. Instructions: https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key
- Once you have the API key, go to the Mesa Dashboard, navigate to Automations > "Send Customer To HubSpot Contact And Mark as Opportunity"
- Under "Secrets", save the client ID as `hubspot-hapi`
- Enable the Automation by clicking the 'Enabled' switch on the right hand side beneath "Automation Details"
- Create a customer in your Shopify store, then check the Mesa logs and HubSpot. 

## Optional Customizations

### Different lifecycle stages
- By default, this automation will mark the contact as an opportunity. If you wish to set the contact to a different HubSpot lifecycle stage, go to "Storage", and change the value for `hubspot-lifecycle-stage` to a different valid lifecycle stage. 
- Note that if you leave this value blank, the automation will mark the Contact as an Opportunity .
- More details on lifecycle stages can be found here: https://knowledge.hubspot.com/contacts/use-lifecycle-stages. API values can be found here, under "Optional Parameters": https://developers.hubspot.com/docs/methods/contacts/update_contact.

### Additional data
- This automation covers standard HubSpot contact fields. If your HubSpot contacts are setup with additional properties, you can map these additional fields by editing the `shopify-hubspot-customer-mapping.json` storage item.
- This script will only create a contact. If you wish to also update the contact if it exists (based on the email address), do the following:
  - Remove the mapping for `email` in `shopify-hubspot-customer-mapping.json`
  - Locate the line containing `const response = hubspot.createContact(postData);`
  - Replace this with `const response = hubspot.createOrUpdateContact(postData, payload.email);`
  - For accurate logs, you may also wish to update the text which is logged when the response is successful (`'HubSpot contact created successfully with ID'`)