## Setup

- Add your ShipStation credentials to each ShipStation step in the automation.
- To allow this automation to create shipping labels, you will need to [connect a postage provider](https://help.shipstation.com/hc/en-us/articles/360025869732-Connect-a-Postage-Provider) and [add inventory in ShipStation](https://help.shipstation.com/hc/en-us/articles/360025870392-Inventory-in-ShipStation). Once this is set up, you can set the "Test Label" field on the "ShipStation Create Label for Order" step to "No".
- For the "ShipStation Create/Update Order" step, you will need to select your store under the "Advanced Options" > "Store ID" field
- For the "Shopify Create Order Fulfillment" step, you will need to select a value for the Location ID field.

## Optional Configuration
Changing the ship date

- By default, this automation ship date is set up to be ship the same day.
- To change this, go to the "Mapping to ShipStation Label Order" connector and change the "shipDate" to a different date.

Changing the service and carrier code

- By default, this automation using Stamps.com as the postage provider and is using USPS Parcel Select.
- To change this, go to the "Mapping to ShipStation Label Order" connector and change the "carrierCode" and "serviceCode" different carrier code and service code.
