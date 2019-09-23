# Send Order from Shopify Flow To Blockscore Cognito Verification
Send order from Shopify to Blockscore Cognito verification when order is passed from Shopify Flow.
---

## Configuring Shopify Flow Workflow

> You can import our example Cognito Verification workflow from `examples/CognitoVerification.flow`

* Open the Shopiy Flow Dashboard
* Click the Create Workflow button in the top-right
* Select a Trigger: Shopify Triggers > Order Created
* (optional) Add a condition: For example, Order billing address country is "United States"
* Add an Action: Mesa > Send to Mesa
* Set the Automation Key: `shoppad/mesa-templates/shopify/flow/send-to-cognito-verification`
* Set the Input Key: `in-shopify-flow-order`
* Set the Payload: `{{order.id}}`
* Enable the Workflow (toggle next to Save button)

## Configuring Mesa Automation

* Create a Cognito account on https://cognitohq.com/
* Copy your API Key and API Secret from [Settings > API Keys](https://playground.cognitohq.com/settings/api_keys)
* Open the Automation in your Mesa Dashboard
* Set the `cognito-key` and `cognito-secret` Secret values
* If your Cognito account is in production, set the `cognito-environment` Storage item to `production`