# Send Customer To Google Sheets Document
Send customer from Shopify to Google Sheets document when customer is updated.

---

## Setup

- [Enable Google Sheets for your project in the Google Developer Console](https://developers.google.com/identity/protocols/OAuth2WebServer#enable-apis)
- [Create authorization credentials](https://developers.google.com/identity/protocols/OAuth2WebServer#prerequisites)
    - Set Authorized redirect URIs to `https://www.theshoppad.com/apps/mesa/oauth/`
- Go to the [OAuth 2.0 Authentication Flow page](https://www.theshoppad.com/apps/mesa/oauth/google/shopify/customer/send-to-google-sheets-document?scope=https://www.googleapis.com/auth/spreadsheets) and fill out the form with with your client id and secret.
- [Create a Google Sheet](https://support.google.com/docs/answer/49114?co=GENIE.Platform%3DDesktop&hl=en)
- Set up your spreadsheet:
    - Go to [our example Google Sheet](https://docs.google.com/spreadsheets/d/1CBPs3nMvwM4QQzsMcmztRhe4SntORWQNJhu2DKixEkw/edit?usp=sharing) and clone it: File > Make a copy.
    - Copy your new spreadsheet's `spreadsheetId` value. This ID is the value between the '/d/' and the '/edit' in the URL of your spreadsheet.
- Update the `google-sheets-id` storage item.
