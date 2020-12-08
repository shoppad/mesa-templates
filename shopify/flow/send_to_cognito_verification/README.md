## Configuring Shopify Flow Workflow

> You can import our example Cognito Verification workflow from `examples/CognitoVerification.flow`

- Open the Shopiy Flow Dashboard. 
- Click the Create Workflow button in the top-right.
- Select a Trigger: Shopify Triggers > Order Created.
- Optional: Add a condition: For example, Order billing address country is "United States".
- Add an Action: Mesa > Send to Mesa.
- Set the Automation Key: `shoppad/mesa-templates/shopify/flow/send-to-cognito-verification`.
- Set the Input Key: `in-shopify-flow-order`.
- Set the Payload: `{{order.id}}`.
- Enable the Workflow (toggle next to Save button)


## Configuring Mesa Automation

- Create a Cognito account on https://cognitohq.com/.
- Copy your API Key and API Secret from [Settings > API Keys](https://playground.cognitohq.com/settings/api_keys).
- Set the `cognito-key` and `cognito-secret` Credentials (located under the Credentials tab). 
- Enable the Automation in the right sidebar and click **Save**.
- If your Cognito account is in production, set the `cognito-environment` Storage item to `production`.