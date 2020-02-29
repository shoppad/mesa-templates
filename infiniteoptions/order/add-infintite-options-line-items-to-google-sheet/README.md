## Setup
- Create a Secret below.  Select `oAuth Token` as the Secret Type and `Google` as the oAuth Service. Enter `https://www.googleapis.com/auth/spreadsheets` as the Scope.
- [View this Google Sheet with column headers](https://docs.google.com/spreadsheets/d/1uPFMnqU4miEtO-k85zmZXjTcnBtDMp6vg_tUdzMu49A/edit?usp=sharing).
- Click on **File** in the top left corner and click **Make a copy** to make a copy.
    - Optionally, rename your Google Sheet and Folder. 
    - Then, click on **OK**.
- Open the Google Sheets Step and add your `Spreadsheet ID` (and optionally `Sheet Name`).
- View the `M` and `N` values in the **Mapping Transform** Step. Add your actual field name (found in the Infinite Options dashboard) after `fields.`. Example: {{current_item.fields.uploadery_1}}
- Enable the Automation in the right sidebar and click **Save**.