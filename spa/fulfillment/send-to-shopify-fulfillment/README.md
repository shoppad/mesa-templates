# Send SPA FTP File To Shopify Fulfillment

Send FTP file containing fulfillments from Softpack/SPA Inc. to Shopify fulfillment every 6 hours.

---

## Setup

- Configure your FTP method, host and username in the `FTP Fulfillments` input.
- Set the `ftp-password` secret.

## Optional Customizations

This Template assumes that the Fulfillments FTP file will contain a column `Customer PO` 
with the Shopify order ID and order name in the format `{order_id}#{order_name}`.  If your
file has a different format, adjust the logic in the `in-ftp-fulfillments.js` script.

> See the example file in `./example/shipped.csv`.

This template also moves the file from a `/confirms/` directory into `/confirms/processed/`.
If your folder names differ, adjust the logic in the `in-ftp-fulfillments.js` script (line 43).