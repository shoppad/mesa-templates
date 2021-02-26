## Setup
* Customize your email subjects and messages.
* Edit your theme's code for the Custom Order History page to add a "Create Return" link:
  * Find your theme's `account.liquid` file. In Debut, this file is `customers/account.liquid`.
  * Add a column to your order `<table>`: 
    ```
    <td data-label="Start Return"><a href="/apps/mesa/forms/form_to_shopify_retrieve_order?shopify_order_id={{ order.id }}">Return</a></td>
    ```
* Alternatively, send the link in your Order Confirmation email template, or send it in support communications.

## Testing
* Login to a Customer account on your Shopify online store.
* Click the Return link on the Order History page.
* Submit the form.

## Exending
* Use ShipStation to automatically generate a return label download URL that can be included in the customer email.
* Sync Add submissions to Airtable to easily centralize your returns process.
