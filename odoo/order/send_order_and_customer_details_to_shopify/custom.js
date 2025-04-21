const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');

/**
 * A MESA Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * MESA Script
   *
   * @param {object} prevResponse The response from the previous step
   * @param {object} context Additional context about this task
   */
  script = (prevResponse, context) => {

    // Retrieve the Variables Available to this step
    const vars = context.steps;
    // For storing response
    let response = {};
    // Get Odoo order lines
    const odooOrderLines = vars.odoo_3;
    // Get Odoo product variants
    const odooProductVariants = vars.loop_1;
    // Get Odoo customer
    const odooCustomer = vars.odoo_2;

    // Extract the province/state and street2 from Odoo customer
    let state = odooCustomer.state_id[1].match(/^[^(]+/)[0].trim();
    let street2 = Array.isArray(odooCustomer.street2) && odooCustomer.street2.length === 0 ? '' : odooCustomer.street2;

    // Find the matching Odoo order line to Odoo product variant and add default_code (SKU) to the Odoo order line
    let odooOrderLinesWithSku = odooOrderLines.map(orderLine => {
      let matchingItem = odooProductVariants.items.find(item => item.id === orderLine.product_id[0]);

      return {
        ...orderLine,
        default_code: matchingItem ? matchingItem.default_code : null
      };
    });

    // Extract default_code (SKU) from each Odoo order line
    let skuList = odooOrderLinesWithSku.map(line => line.default_code);
    // For storing Shopify variants from the product variant lookup by SKU
    let shopifyVariants = [];

    // Loop over skuList and fetch Shopify product variant details for each SKU
    let promises = skuList.map(sku => {
      return this.fetchShopifyVariant(sku).then(variants => {
        shopifyVariants = shopifyVariants.concat(variants);
      });
    });

    // Wait for all promises to resolve
    Promise.all(promises).then(() => {
      // Find the matching Odoo order line to Shopify product variant and add shopify product variant details to the Odoo order line
      // Otherwise, shopify product variant details will be blank
      let odooOrderLinesWithSkuShopify = odooOrderLinesWithSku.map(odooLine => {
        let matchingShopifyVariant = shopifyVariants.find(shopifyVariant => shopifyVariant.sku === odooLine.default_code);

        return {
            ...odooLine,
            has_shopify_match: matchingShopifyVariant ? "yes" : "no",
            shopify_product_title: matchingShopifyVariant ? matchingShopifyVariant.product.title : "",
            shopify_product_variant_title: matchingShopifyVariant ? matchingShopifyVariant.title : "",
            shopify_product_id: matchingShopifyVariant ? ShopifyGraphql.extractShopifyId(matchingShopifyVariant.product.id) : "",
            shopify_product_variant_id: matchingShopifyVariant ? ShopifyGraphql.extractShopifyId(matchingShopifyVariant.id) : "",
            shopify_product_variant_sku: matchingShopifyVariant ? matchingShopifyVariant.sku : "",
        };
      });

      // Update the response
      response = {
        customer: {
          state: state,
          street: street2,
        },
        order_lines: odooOrderLinesWithSkuShopify,
      };

      // Call the next step in this workflow
      // response will be the Variables Available from this step
      Mesa.output.next(response);
    });
  }

  /**
   * Fetch Shopify variant details for a single SKU
   *
   * @param {string} sku The product variant SKU
   */
  fetchShopifyVariant = (sku) => {
    // Shopify GraphQL query to do a product variant lookup by SKU
    let query = `
      query($query: String!) {
        productVariants(first: 3, query: $query) {
          edges {
            node {
              id
              title
              sku
              inventoryItem {
                id
              }
              product {
                id
                title
              }
            }
          }
        }
      }
    `;
    // Ensure ShopifyGraphql.send returns a Promise
    const result = ShopifyGraphql.send(query, { query: `sku:${sku}` });
    // Wrap the result in a Promise if it's not already one
    const promise = result instanceof Promise ? result : Promise.resolve(result);

    return promise
      .then(response => {
        if (response && response.data && response.data.productVariants) {
          return response.data.productVariants.edges.map(edge => edge.node);
        }
        return [];
      })
      .catch(error => {
        Mesa.log.info(`Error fetching details for SKU: ${sku}`, error);
        return [];
      });
  }

}