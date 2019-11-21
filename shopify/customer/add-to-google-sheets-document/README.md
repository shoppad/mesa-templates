## Setup
- [Enable Google Sheets for your project in the Google Developer Console](https://developers.google.com/identity/protocols/OAuth2WebServer#enable-apis).
- [Create authorization credentials](https://developers.google.com/identity/protocols/OAuth2WebServer#prerequisites).
    - Set Authorized redirect URIs to `https://www.theshoppad.com/apps/mesa/oauth/`.
- Go to the [OAuth 2.0 Authentication Flow page](https://www.theshoppad.com/apps/mesa/oauth/google/shoppad/mesa-templates/shopify/customer/send-to-google-sheets-document?scope=https://www.googleapis.com/auth/spreadsheets) and fill out the form with with your client id and Secret.
- Set up your spreadsheet:
    - Go to [our example Google Sheet](https://docs.google.com/spreadsheets/d/1CBPs3nMvwM4QQzsMcmztRhe4SntORWQNJhu2DKixEkw/edit?usp=sharing) and clone it: File > Make a copy.
    - Copy your new spreadsheet's `spreadsheetId` value. This ID is the value between the '/d/' and the '/edit' in the URL of your spreadsheet.
- Update the `google-sheets-id` Storage Item.
- Enable the Automation in the right sidebar and click **Save**.
