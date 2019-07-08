# Google Sheets - Products updates from Google Sheets to Shopify.

Sync product title updates Google Sheets to Shopify.

[![Integrate with Mesa](https://www.getmesa.com/images/integrate.png)<br>Install this library now in Mesa](https://getmesa.com/install/shoppad/mesa-recipes/google/products/in)

## Setup

### Google Sheets

- Get an client id and client secret by following the OAuth 2.0 flow. [See more](https://developers.google.com/sheets/api/guides/authorizing)
- TODO: Get refresh token from www.theshoppad.com/apps/oauth
- Create a Google Sheets
- Get a spreadsheet id:
  - Every API method requires a spreadsheetId parameter which is used to identify which spreadsheet is to be accessed or altered. This ID is the value between the "/d/" and the "/edit" in the URL of your spreadsheet.
- Update the spreadsheet ID with your own in the script `in-products-google.js`.

## Developing

[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=in-products-google \
    --outputs=out-products-google \
    --files=in-products-google.js,out-products-google.js \
    --secrets=google_refresh_token,google_access_token,google_client_id,google_client_secret,google_expires_at
```
