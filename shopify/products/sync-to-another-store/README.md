# Sync Products to Another Shopify Store
Sync newly created products, product updates, and product deletions from one Shopify store to another

[![Automate with Mesa](https://www.getmesa.com/images/integrate.png)<br />Get the Template](https://www.getmesa.com/install/shoppad/mesa-templates/shopify/products/sync-to-another-store)

## Setup

1. [Create a private app](https://help.shopify.com/en/manual/apps/private-apps#generate-credentials-from-the-shopify-admin) on the store you want to sync products to. 
2. Set the private app name to "Mesa"
3. The emergency developer email can be yours
4. Make sure "Products, variants and collections" have "Read and write" Admin API permissions
5. Press Save
6. In a separate window, navigate to the "Storage" tab in Mesa
7. Set the Key containing `shopify/products/sync-with-another-store/host` to the domain of the Shopify store you want to sync the products to (typically this will be something like storename.myshopify.com)
8. Set the Key containing `shopify/products/sync-with-another-store/key` to the API key obtained in step 5
9. Now navigate to the "Secrets" tab
10. Set the Key containing `shopify/products/sync-with-another-store/password` to the Password obtained in step 5
11. Press Save