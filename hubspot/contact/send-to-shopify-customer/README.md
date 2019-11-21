## Setup 
- To allow this Automation access HubSpot, get an API key from your HubSpot installation. You will need to be a [HubSpot Super Admin to do this](https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key).
- Copy and paste your API key as the `hubspot-hapi` Secrets value.
- Go to the `Input` Section and find an Input named `Install` and click **Test** (with a triangle icon). You can leave "Pass a Payload to the Test" unchecked." This will install a workflow in HubSpot, which will call our own webhook, and then create the Customer in HubSpot.
- To verify that the installation is completed, check in HubSpot that a workflow named 'Mesa Contact Created' and 'Mesa Contact Updated' workflows have been created and is enabled. (In HubSpot, go to "Automation" and "Workflows" at the top).
    - If the workflows are not there, please check the Mesa logs for any errors.
- Enable the Automation in the right sidebar and click **Save**.

## Optional Customizations
- You may map additional fields from HubSpot to Shopify by editing the `create-customer-mapping.json` Storage Item.

## Additional Notes
- If a HubSpot contact's email is changed, this will create a new Customer in Shopify.