const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    // Adjust `payload` here to alter data before we transform it.

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    /**
     * metafieldsSet mutation example from https://shopify.dev/docs/api/admin-graphql/latest/mutations/metafieldsdelete
     */
    const mutation = `mutation MetafieldsDelete($metafields: [MetafieldIdentifierInput!]!) {
      metafieldsDelete(metafields: $metafields) {
        deletedMetafields {
          key
          namespace
          ownerId
        }
        userErrors {
          field
          message
        }
      }
    }`;

    const response = ShopifyGraphql.send(
      mutation,
      {
        metafields: [
          {
            ownerId: `gid://shopify/Product/${output.product_id}`,
            namespace: `${output.namespace}`,
            key: `${output.key}`,
          },
        ],
      },
      null
    );

    // Adjust `output` here to alter data after we transform it.

    // We're done, call the next step!
    Mesa.output.next(response);
  }
}