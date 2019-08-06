# Delete Shopify Draft Orders After Thirty Days

Deletes Shopify draft orders after they've been around for 30 days (runs twice a day).

[![Automate with Mesa](https://www.getmesa.com/images/integrate.png)<br />Get the Template](https://www.getmesa.com/install/shoppad/mesa-templates/shopify/draft-orders/delete-after-thirty-days)

## Setup
1. No setup required.

## Developing 
[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=in-delete-draft-order-after-thirty-days \
    --outputs=out-delete-draft-order-after-thirty-days-vo \
    --files=shopify/draft-orders/delete-after-thirty-days/input.js,shopify/draft-orders/delete-after-thirty-days/output.js \
```
