# Google Sheets - Customer updates from Shopify.

Sync customer updates data from Shopify to Google Sheets.

[![Integrate with Mesa](https://www.getmesa.com/images/integrate.png)<br>Install this library now in Mesa](https://getmesa.com/install/shoppad/mesa-actions/google-sheets/customer-update)

## Setup

### Google Sheets

- Get an client id and client secret by following the OAuth 2.0 flow. [See more](https://developers.google.com/sheets/api/guides/authorizing)
- TODO: Get refresh token from www.theshoppad.com/apps/oauth
- Create a Google Sheets
- Get a spreadsheet id:
  - Every API method requires a spreadsheetId parameter which is used to identify which spreadsheet is to be accessed or altered. This ID is the value between the "/d/" and the "/edit" in the URL of your spreadsheet.
- Update the spreadsheet ID with your own in the script `in-customer-update.js`.

## Developing

[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=in-customer-update \
    --outputs=out-google-sheets-update,out-google-sheets-read,out-customer-update \
    --files=in-customer-update.js,out-customer-update.js,out-google-sheets-read.js,out-google-sheets-update.js \
    --secrets=google_refresh_token,google_access_token,google_client_id,google_client_secret,google_expires_a
```
