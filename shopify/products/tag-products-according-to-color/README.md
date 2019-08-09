# Tag products according to color
Tag products according to color on product update and on product creation.

[![Automate with Mesa](https://www.getmesa.com/images/integrate.png)<br />Get the Template](https://www.getmesa.com/install/shoppad/mesa-templates/shopify/products/tag-products-according-to-color)


## Developing

[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=in-create-tag-products-according-to-color,in-update-tag-products-according-to-color \
    --outputs=out-update-tag-products-according-to-color,out-create-tag-products-according-to-color \
    --files=in-out-send.js,shopify/products/tag-products-according-to-color/output.js
```
