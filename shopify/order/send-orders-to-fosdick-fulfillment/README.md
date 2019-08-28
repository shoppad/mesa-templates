# Send Orders To Fosdick Fulfillment 3PL
Send orders from Shopify to Fosdick Fulfillment 3PL every hour. 

---
## Setup
1. You'll need the following details from your Fosdick rep, to populate these secrets:  
 a) Fosdick Client Code (`fosdick-client-code`)  
 b) Fosdick Client Name (`fosdick-client-name`)  
 c) Fosdick Ad Code (`fosdick-ad-code`)  
2. By default, this automation runs in test mode (storage item `fosdick-test-mode`. This means that Fosdick will receive the orders, but will not process them.  It is recommended that you send a test order first, to check everything is set up correctly.
3. You will also need to discuss payment processing with your Fosdick representative. Fosdick provide a few different options for sending payment details. For the purposes of this base script, a test string is sent for `PaymentToken`.

## Customizations
1. If desired, the code can be optimized to exclude non physical order line items being submitted (e.g. gift cards)
2. You will need to add a method to pass to 'preProcess' on line 53. 
3. This method should loop through the order line items and for any items where `requires_shipping` is false, keep a running total of the following:   
 a) `total_price_removed`: Take the value from `price` and multiply by  `quantity`
 b) `total_discount_removed`: Take the `amount`  value from each element under `discount_allocations`
 c) `total_tax_removed` Take the `price`  value from each element under `tax_lines`
4. For each value: 
 a) Update `order.total_price`: Subtract `total_price_removed` from the current value
 b) Update `order.total_discounts`: Subtract `total_discount_removed` from the current value
 c) Update `order.total_tax`: Subtract `total_tax_removed` from the current value
5. Then remove each line_item where `requires_shipping` is true
6. Also, at line 189, you can uncomment `payload.ExternalID +=` if you wish to test resending orders. Simply set a different value each time you test. This is due to Fosdick rejecting orders if the same ExternalID is sent again.
