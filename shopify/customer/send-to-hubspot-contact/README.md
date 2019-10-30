# Send Customer To HubSpot Contact

Send customer from Shopify to HubSpot Contact when customer is created.

---

## Setup
- To allow this automation to access HubSpot, get an API key from your HubSpot installation. You will need to be a HubSpot Super Admin to do this. [Instructions](https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key).
- Under "Secrets", save the client ID as `hubspot-hapi`
- Enable the Automation in the right sidebar and click Save.
- Create a customer in your Shopify store, then check the Mesa logs and HubSpot. 

## Optional Customizations
- This automation covers standard HubSpot contact fields. If your HubSpot contacts are setup with additional properties, you can map these additional fields by editing the `customer-mapping.json` storage item.
- This script will only create a contact. If you wish to also update the contact if it exists (based on the email address), do the following:
  - Remove the mapping for `email` in `customer-mapping.json`
  - Locate the line containing `const response = hubspot.createContact(postData);`
  - Replace this with `const response = hubspot.createOrUpdateContact(postData, payload.email);`
  - For accurate logs, you may also wish to update the text which is logged when the response is successful (`'HubSpot contact created successfully with ID'`)
