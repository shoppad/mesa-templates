const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');
const Shopify = require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {
  script = (payload, context) => {
    let vars = context.steps;
    // Get shopify order updated payload
    const shopifyUpdatedOrderPayload = vars.shopify;
    // Get product ID
    const productId = shopifyUpdatedOrderPayload.id;
    
    // Construct query for metafieldsSet mutation
    let query = `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            key
            namespace
            value
            createdAt
            updatedAt
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `;

    // Set product metafield using query
    const r = ShopifyGraphql.send(query, {
      "metafields" : [
        {
        "namespace": "custom",
        "key": "price_history",
        "type": "list.metaobject_reference",
        "value": JSON.stringify(vars.custom.new_price_history),
        "ownerId": `gid://shopify/Product/${productId}`,
        }
      ]
    });
    
    // Handling if we receive an error
    if (r.data.metafieldsSet.userErrors.length) {
      throw new Error(JSON.stringify(r.data.metafieldsSet.userErrors));
    }

    // Continue to next step and pass result
    Mesa.output.next({"result": r.data});
  }
}