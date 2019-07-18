## Naming conventions

File structure: {source}/{entity}/{automation-name}

Source: Should be product name where possible ie `google-sheets`, not `google`

Entity: Always pluralized. In the case of an abstract object use the expected contents ie `products`, not `spreadsheets`

Automation Name: Start with a verb (add, send, update, etc). Be as descriptive as possible. Include destination and destination entity when different than source and relevant. Avoid duplicating words already in path, if possible. 

A Shopify automation unto itself  
`ex. shopify/orders/add-free-gift-when-total-over-n`

Update a Shopify entity with data from a 3rd party  
`ex. shopify/orders/add-destination-weather`  

Send a Shopify entity to a 3rd party  
`ex. shopify/customers/send-to-salesforce-contact`

Send a 3rd party entity to Shopify  
`ex. salesforce/contacts/send-to-shopify-customer`

Send a 3rd party notification  
`ex. tracktor/status/send-notification-on-change`  
`ex. shopify/orders/send-slack-when-paid`  
`ex. shopify/orders/send-slack-when-unfulfilled-for-n-days`

Send the contents of a spreadsheet to Shopify  
`ex. google-sheets/products/send-to-shopify-products`
