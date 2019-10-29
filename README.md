## Mesa Templates

### File naming conventions

- File structure: {source}/{entity}/{automation-name}
- Source: Should be product name where possible ie `google-sheets`, not `google`
- Entity: Always singular. In the case of an abstract object use the expected contents ie `product`, not `spreadsheet`
- Automation Name: Start with a verb (add, send, update, etc). Be as descriptive as possible. Include destination and destination entity when different than source and relevant. Avoid duplicating words already in path, if possible. 

#### Examples

A Shopify automation unto itself  
`ex. shoppad/mesa-templates/shopify/orders/add-free-gift-when-total-over-n`

Update a Shopify entity with data from a 3rd party  
`ex. shoppad/mesa-templates/shopify/orders/add-destination-weather`  

Send a Shopify entity to a 3rd party  
`ex. shoppad/mesa-templates/shopify/customers/send-to-salesforce-contact`

Send a 3rd party entity to Shopify  
`ex. shoppad/mesa-templates/salesforce/contacts/send-to-shopify-customer`

Send a 3rd party notification  
`ex. shoppad/mesa-templates/tracktor/status/send-notification-on-change`  
`ex. shoppad/mesa-templates/shoppad/mesa-templates/shopify/orders/send-slack-when-paid`  
`ex. shoppad/mesa-templates/shopify/orders/send-slack-when-unfulfilled-for-n-days`

Update Shopify product with the contents of a spreadsheet  
`ex. google-sheets/products/update-titles-on-shopify-products`

### mesa.json

> See [JSON schema definition](https://docs.google.com/document/d/1uXo0gcmSyrI3nq1n8YDWyqTBaffUI1HSSupfWZNI6CU)

- Name: Should generally come from the `key` (see File naming conventions above).
- Description: A more verbose version of the name. Always ends in a period.
- Tags: Singular, with Proper Case (`Order`). Only use existing tags (see left sidebar of getmesa.com).
- Source and Destination: Be as specific as possible. Lowercase, separated with dashes. Ex: `shopify-flow`, `google-sheets`.
- Enabled: If Automation does not require any configuration (Add tags to Shopify order, etc), set to `true`. Otherwise set to `false`.

### README.md

- Bulleted setup instructions, including links where possible
- Additional Customization/ways to extend the automation
- Use bullets (not numbers)
