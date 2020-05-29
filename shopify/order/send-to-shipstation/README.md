## Setup

- To allow this automation to access ShipStation, get an API key and API secret from your ShipStation installation. You will need to be a ShipStation admin to do this instructions on how to generated these keys can be found in this [article](https://help.shipstation.com/hc/en-us/articles/360025856212-ShipStation-API) under the "Accessing the ShipStation API" section.
- To allow this automation to create shipping labels, you will need to [connect a postage provider](https://help.shipstation.com/hc/en-us/articles/360025869732-Connect-a-Postage-Provider) and [add inventory in ShipStation](https://help.shipstation.com/hc/en-us/articles/360025870392-Inventory-in-ShipStation)

## Optional Configuration

Changing the ship date

- By default, this automation ship date is setup to be ship the same day.
- To change this, go to the "Mapping to ShipStation Label Order" and change the "shipDate" to a different date.

Changing the service and carrier code

- By default, this automation using Stamps.com as the postage provider and is using USPS Parcel Select
- To change this, go to the "Mapping to ShipStation Label Order" and change the "carrierCode" and "serviceCode" different carrier code and service code.
