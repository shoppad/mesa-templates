## Setup
- To allow this automation access HubSpot, get an API key from your HubSpot installation. You will need to be a [HubSpot Super Admin to do this](https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key).
- Copy and paste your API key as the `hubspot-hapi` Secret value.
- Enable the Automation in the right sidebar and click **Save**.

## Different lifecycle stages
- By default, this automation will mark the contact as an opportunity. If you wish to set the contact to a different HubSpot lifecycle stage, go to "Storage" section on the Mesa dashboard, and change the value for the `hubspot-lifecycle-stage` Storage item to a different valid lifecycle stage. 
- Note that if you leave this value blank, the automation will mark the Contact as an Opportunity .
- More details on lifecycle stages [can be found here.](https://knowledge.hubspot.com/contacts/use-lifecycle-stages)
- More details on API values [can be found here, under "Optional Parameters."](https://developers.hubspot.com/docs/methods/contacts/update_contact)

## Additional data
- This automation covers standard HubSpot contact fields. If your HubSpot contacts are setup with additional properties, you can map these additional fields by editing the `customer-mapping.json` Storage item.
- This script will only create a contact. If you wish to also update the contact if it exists (based on the email address), do the following:
  - Remove the mapping for `email` in `customer-mapping.json`
  - Locate the line containing `const response = hubspot.createContact(postData);`
  - Replace this with `const response = hubspot.createOrUpdateContact(postData, payload.email);`
  - For accurate logs, you may also wish to update the text which is logged when the response is successful (`'HubSpot contact created successfully with ID'`)