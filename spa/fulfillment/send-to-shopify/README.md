## Setup

- Configure your FTP method, host and username in the `FTP Fulfillments` Trigger.
- Set the `ftp-password` Credential (located under the Credentials tab.
- Enable the Automation in the right sidebar and click **Save**.

## Optional Customizations

This Automation assumes that the Fulfillments FTP file will contain a column `Customer PO` 
with the Shopify order ID and order name in the format `{order_id}#{order_name}`.  If your
file has a different format, adjust the logic in the `in-ftp-fulfillments.js` script, under the `FTP Fulfillments` Trigger.

> See the example file in `./example/shipped.csv`.

This Automation also moves the file from a `/confirms/` directory into `/confirms/processed/`. If your folder names differ, adjust the logic in the `in-ftp-fulfillments.js` script (line 43).