const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');
const Shopify= require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {
  script = (payload, context) => {
    let vars = context.steps;
    let publicationId = vars.custom_1.publicationId;

    let query = `
      {
        product(id:"gid://shopify/Product/${vars.webhook.id}") {
          title
          publishedOnPublication(
            publicationId: "${publicationId}"
          )
        }
      }
    `;
    
    const r = ShopifyGraphql.send(query, null, {}, 'admin/api/2023-10/graphql.json');

    Mesa.trigger.setTaskExternalData({
      "label": "Published to POS: " + r.data.product.publishedOnPublication
    });

    Mesa.output.next({"publishedToPOS": r.data.product.publishedOnPublication});
  }
}