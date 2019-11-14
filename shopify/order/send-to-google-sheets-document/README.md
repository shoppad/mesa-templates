## Setup
- Go to the [OAuth 2.0 Authentication Flow page](https://www.theshoppad.com/apps/mesa/oauth/google-mesa/shoppad/mesa-templates/shopify/order/send-to-google-sheets-document?scope=https://www.googleapis.com/auth/spreadsheets) and fill out the form with with your client id and secret.
- Set up your spreadsheet:
    - Go to [our example Google Sheet](https://docs.google.com/spreadsheets/d/1CBPs3nMvwM4QQzsMcmztRhe4SntORWQNJhu2DKixEkw/edit?usp=sharing) and clone it: File > Make a copy.
    - Copy your new spreadsheet's `spreadsheetId` value. This ID is the value between the '/d/' and the '/edit' in the URL of your spreadsheet.
- Update the `google-sheets-id` Storage item.
