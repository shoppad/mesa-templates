# Google Sheets - Products updates from Google Sheets to Shopify.

Sync product title updates Google Sheets to Shopify.

[![Integrate with Mesa](https://www.getmesa.com/images/integrate.png)<br>Install this library now in Mesa](https://getmesa.com/install/google-sheets/products/update-titles-on-shopify-products)

## Setup

### Google Sheets

- Google Sheets
  - [Enable Google Sheets for your project Google](https://developers.google.com/identity/protocols/OAuth2WebServer#enable-apis)
  - [Create authorization credentials](https://developers.google.com/identity/protocols/OAuth2WebServer#prerequisites)
    - Set authorized redirect URIs to https://www.theshoppad.com/apps/mesa/oauth/
  - Go to [OAuth 2.0 Authentication Flow page](https://www.theshoppad.com/apps/mesa/oauth/google_sheets) and fill out the form with with your client id and secret.
- [Create a Google Sheets](https://support.google.com/docs/answer/49114?co=GENIE.Platform%3DDesktop&hl=en)
- Get a spreadsheet id:
  - Every API method requires a spreadsheetId parameter which is used to identify which spreadsheet is to be accessed or altered. This ID is the value between the "/d/" and the "/edit" in the URL of your spreadsheet.
- Update the `google_sheets_products_id` in the storage page.

## Developing

[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=in-products-google \
    --outputs=out-products-google \
    --files=in-products-google.js,out-products-google.js \
    --secrets=google_refresh_token,google_access_token,google_client_id,google_client_secret,google_expires_at \
    --storage=google_sheets_products_id
```
