# Create Shipping Labels With ShipHawk When Order Is Fulfilled
When an order is fulfilled, automatically purchase shipping labels with ShipHawk and add label download links to the Shopify Order Notes.

---

## Setup

- Create an account on https://shiphawk.com/
- Go to [Settings > Carriers](https://shiphawk.com/app/carriers) and add at least one carrier to your ShipHawk account under 
- Go to [Settings > Developer API](https://shiphawk.com/app/settings/api-keys) and copy your production or sandbox key 
- On the Automation page, paste your api key as the `shiphawk-key` Secret value
- If you are using the production api, change the `shophawk-environment` storage item to `production`.


## Optional customizations

### Custom package dimensions

Edit the `out-create-shiphawk-label.js` script around line 35 and uncomment the lines for the length, width and height values.  These values can either be hardcoded or can come from the Fulfillment `payload`.

### Select a specific rate

By default, this template just uses the first rate that is returned from the ShipHawk `/rates` API. To select a different rate, you can adjust the logic around line 55 of `out-create-shiphawk-label.js`.

### Google Cloud Print integration

You can automatically send shipping labels to Google Cloud Print. To enable this, install the [Send File to Google Cloud Print]() Template and follow the configuration steps in the Automation README. Then set the value of the `callback` Storage item on this Automation to `mesa-templates/mesa/file/send-to-google-cloudprint`.
