## Setup

- Configure your FTP method, host and username in the `Save Orders to FTP` Action.
- Set the `ftp-password` Credential (located under the Credentials tab.
- Enable the Automation in the right sidebar and click **Save**.

## Optional Customizations

- Make sure line item uses SPA fulfillment before adding to the order in the `out-save-orders-to-ftp.js` script (line 98), under the `Save Orders to FTP` Action.
- Add logic to add SPA User Defined Fields (UDFs) in the `out-save-orders-to-ftp.js` script (line 88).
- Map Shopify SKUs to custom SPA SKUs by creating a skus.json storage item and adding logic to `out-save-orders-to-ftp.js` (line 105).
