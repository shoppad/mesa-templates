## Setup

- [Create a private app](https://help.shopify.com/en/manual/apps/private-apps#generate-credentials-from-the-shopify-admin) on the store you want to sync products to.
- Set the private app name to "Mesa."
- The emergency developer email can be yours.
- Make sure "Products, variants and collections" have "Read and write" Admin API permissions.
- Press Save.
- On Mesa, set the `store-host` Storage Item to the domain of the Shopify store you want to sync the products to (typically this will be something like storename.myshopify.com).
- Set the `store-key` Storage Item  to the API key obtained. 
- Set the `store-password` Credential (located under the Credentials tab) to the Password obtained.
- Enable the Automation in the right sidebar and click **Save**.