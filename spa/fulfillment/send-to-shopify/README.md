## Setup
- Configure your FTP method, host, and username in the `FTP Fulfillments` input.
- Set the `ftp-password` Secret.

## Optional Customizations
- This Template assumes that the Fulfillments FTP file will contain a column `Customer PO` with the Shopify order ID and order name in the format `{order_id}#{order_name}`.  
- If your file has a different format, adjust the logic in the `in-ftp-fulfillments.js` script.
    - See the example file in `./example/shipped.csv`.
- This template also moves the file from a `/confirms/` directory into `/confirms/processed/`.
- If your folder names differs, adjust the logic in the `in-ftp-fulfillments.js` script (line 43).