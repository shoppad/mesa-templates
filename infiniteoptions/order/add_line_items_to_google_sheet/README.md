## Setup

- In the `Google Sheets: Add Row to Sheet` connector, create a Credential and Authenticate with Google.
- [View this Google Sheet with column headers](https://docs.google.com/spreadsheets/d/1uPFMnqU4miEtO-k85zmZXjTcnBtDMp6vg_tUdzMu49A/edit)
- Click on **File** in the top left corner and click **Make a copy** to make a copy.
  - Optionally, rename your Google Sheet and Folder.
  - Then, click on **OK**.
- In the `Google Sheets: Add Row to Sheet` connector, add your spreadsheet.
- View the `M` and `N` values in the `Transform: Mapping to Sheets Row` Step. Add your actual field name (found in the Infinite Options dashboard) after `fields.`. Example: `{{current_item.fields.infinite_options_1}}`.
- Enable the Automation in the right sidebar and click **Save**.
