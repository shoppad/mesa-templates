## Setup
- You'll need the following details from your Fosdick rep, to populate these secrets:  
    - Fosdick Client Code (`fosdick-client-code`)
    - Fosdick Client Name (`fosdick-client-name`)
    - Fosdick Ad Code (`fosdick-ad-code`)
- By default, this automation runs in test mode (Storage item `fosdick-test-mode`. This means that Fosdick will receive the orders, but will not process them.  It is recommended that you send a test order first, to check everything is set up correctly.
- You will also need to discuss payment processing with your Fosdick representative. Fosdick provide a few different options for sending payment details. For the purposes of this base script, a test string is sent for `PaymentToken`.
- Enable your automation. 

## Optional Customizations
- If desired, the code can be optimized to exclude non physical order line items being submitted (e.g. gift cards).
- You will need to add a method to pass to 'preProcess' on line 53. 
- This method should loop through the order line items and for any items where `requires_shipping` is false, keep a running total of the following:   
    - `total_price_removed`: Take the value from `price` and multiply by  `quantity`
    - `total_discount_removed`: Take the `amount`  value from each element under `discount_allocations`
    - `total_tax_removed` Take the `price`  value from each element under `tax_lines`
- For each value: 
    - Update `order.total_price`: Subtract `total_price_removed` from the current value
    - Update `order.total_discounts`: Subtract `total_discount_removed` from the current value
    - Update `order.total_tax`: Subtract `total_tax_removed` from the current value
- Then remove each line_item where `requires_shipping` is true.
- Also, at line 189, you can uncomment `payload.ExternalID +=` if you wish to test resending orders. Simply set a different value each time you test. This is due to Fosdick rejecting orders if the same ExternalID is sent again.
