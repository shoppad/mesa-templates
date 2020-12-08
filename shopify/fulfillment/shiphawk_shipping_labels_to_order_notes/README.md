## Setup

- Create an account on https://shiphawk.com/.
- Go to [Settings > Carriers](https://shiphawk.com/app/carriers) and add at least one carrier to your ShipHawk account. 
- Go to [Settings > Developer API](https://shiphawk.com/app/settings/api-keys) and copy your production or sandbox key.
- On Mesa, paste your API key as the `shiphawk-key` Credential (located under the Credentials tab). 
- Enable the Automation in the right sidebar and click **Save**.
- If you are using the production API, change the `shophawk-environment` Storage Item to `production`.


## Optional customizations

### Custom package dimensions

Click on **Edit Code** in the `Create Shiphawk Label` Step and edit the `out-create-shiphawk-label.js` script around line 35 and uncomment the lines for the length, width and height values. These values can either be hardcoded or can come from the Fulfillment `payload`.

### Select a specific rate

By default, this template just uses the first rate that is returned from the ShipHawk `/rates` API. To select a different rate, you can adjust the logic around line 55 of `out-create-shiphawk-label.js` script, located in the `Create Shiphawk Label` Step.

### Google Cloud Print integration

You can automatically send shipping labels to Google Cloud Print. To enable this, install the [Send File to Google Cloud Print](https://www.getmesa.com/templates/mesa--file--send-to-google-cloudprint/) Template and follow the configuration steps in the Automation. Then set the value of the `callback` Storage Item on this Automation to `mesa-templates/mesa/file/send-to-google-cloudprint`.
