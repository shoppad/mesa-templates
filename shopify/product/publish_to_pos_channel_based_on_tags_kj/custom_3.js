const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');
const Shopify= require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {
  script = (payload, context) => {
    let vars = context.steps;
    
    let query = `
      mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
          publishable {
            availablePublicationCount
            publicationCount
          }
          shop {
            publicationCount
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const r = ShopifyGraphql.send(query, {
      "id": `gid://shopify/Product/${vars.webhook.id}`,
      "input": {
        "publicationId": vars.custom_1.publicationId,
      }
    }, {}, 'admin/api/2023-10/graphql.json');

    if (r.data.publishablePublish.userErrors.length) {
      throw new Error(JSON.stringify(r.data.publishablePublish.userErrors));
    }

    Mesa.output.next({"response": r.data});
  }
}
