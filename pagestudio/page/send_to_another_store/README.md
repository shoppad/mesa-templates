## Setup

- Install Mesa and this template on your source store (where Page Studio is installed).
- Open `Page Studio Create Page on Another Store` Action and click `Add New Credential` to create a new credential pointing to your destination store.
- Enable the Automation in the right sidebar and click **Save**.

## Optional Customizations

- If you would like to copy over all of your existing pages, open `Page Studio Page Created` Trigger > `Advanced Options` and set the `Last Synced` field to nothing ("").  When the poller next runs, it will send all of your pages to your destination store and reset the value of the `Last Synced` field.