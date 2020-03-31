## Setup

* Install Mesa and this template on your source store (where Page Studio is installed).
* Open `Page Studio: Create Page` and click `Add New Credential` to create a new credential pointing to your destination store.

## Optional Customizations
* If you would like to copy over all of your existing pages, open `Page Studio: Page Created` > `Advanced` and set the `Last Synced` field to nothing ("").  When the poller next runs, it will send all of your pages to your destination store and reset the value of the `Last Synced` field.