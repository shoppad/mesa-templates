# Send Order To Another Store
Send order from Shopify to another store when order is created, updated or deleted.

---

## Setup

1. [Create a private app](https://help.shopify.com/en/manual/apps/private-apps#generate-credentials-from-the-shopify-admin) on the store you want to sync products to. 
2. Set the private app name to "Mesa"
3. The emergency developer email can be yours
4. Make sure "Products, variants and collections" have "Read and write" Admin API permissions
5. Press Save
6. In a separate window, navigate to the Automations page in the Mesa Dashboard
7. Set the `store-host` Storage item to the domain of the Shopify store you want to sync the orders to (typically this will be something like storename.myshopify.com)
8. Set the `store-key` Storage item  to the API key obtained in step 5
9. Set the `store-password` Secret to the Password obtained in step 5
10. Enable the Automation and Press Save