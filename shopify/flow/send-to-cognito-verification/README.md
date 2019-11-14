## Configuring Shopify Flow Workflow
- You can import our example Cognito Verification workflow from `examples/CognitoVerification.flow`.
- Open the Shopiy Flow app.
- Click the **Create Workflow** button in the top-right corner of the dashboard.
- Select a Trigger: Shopify Triggers > Order Created.
    - Optional - Add a condition: For example, Order billing address country is "United States."
- Add an Action: Mesa > Send to Mesa.
- Set the Automation Key as `shoppad/mesa-templates/shopify/flow/send-to-cognito-verification`.
- Set the Input Key as `in-shopify-flow-order`.
- Set the Payload as `{{order.id}}`.
- Enable the Workflow (toggle next to Save button).

## Configuring Mesa Automation
* Create a Cognito account on https://cognitohq.com/.
* Copy and paste your API Key and API Secret from [Settings > API Keys](https://playground.cognitohq.com/settings/api_keys) and save as the `cognito-key` and `cognito-secret` Secrets. 
* If your Cognito account is in production, set the `cognito-environment` Storage item to `production`.