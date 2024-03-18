const ShopifyGraphql = require('vendor/ShopifyGraphql.js');

const ShopifyUtil = { 

  inventoryLevelsUpdatedSince: (updatedAt, max) => {
    const query = `#graphql
      query inventoryItemsSince($query:String!, $max:Int!) {
        inventoryItems(first: $max,query:$query) {
          nodes {
            id
            updatedAt
            sku
            inventoryLevels(first:10) {
              nodes {
                id
                updatedAt
                location {
                  id
                  name
                }
                quantities(names:"available") {
                  quantity
                }
              }
            }
            variant {
              title
              product {
                title
                id
              }
            }
          }
        }
      }
    `;

    const response = ShopifyGraphql.send(query, {
      query: `updated_at:>'${updatedAt}'`,
      max: max
    });

    response.data.inventoryItems.nodes.map(object => {
      object.id = ShopifyUtil.simpleIdFromGid(object.id)
      object.inventoryLevels.nodes.map(levelObject => {
        levelObject.id = ShopifyUtil.simpleIdFromGid(levelObject.id)
        levelObject.location.id = ShopifyUtil.simpleIdFromGid(levelObject.location.id);
      });
    })

    return response.data.inventoryItems.nodes;
  },

  simpleIdFromGid: (gid) => {
    let parts = gid.split('/');
    let simpleId = parts[parts.length - 1];
    parts = simpleId.split('?');
    return parts[0];
  },  
}

module.exports = ShopifyUtil;