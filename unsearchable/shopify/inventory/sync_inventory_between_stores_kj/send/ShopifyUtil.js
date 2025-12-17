const ShopifyGraphql = require('vendor/ShopifyGraphql.js');

const ShopifyUtil = { 

  inventoryLevelsUpdatedSince: (updatedAt, max, cursor) => { 
    const query = `#graphql
      query inventoryItemsSince($query:String!, $max:Int!, $cursor:String) {
        productVariants(first: $max, query:$query, after:$cursor) {
          nodes {
            id
            sku
            updatedAt
            product {
              id
            }
            inventoryItem {
              inventoryLevels(first:10) {
                nodes {
                  location {
                    name
                  }
                  quantities(names: "available") {
                    quantity
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }        
    `;

    const response = ShopifyGraphql.send(query, {
      query:  `-sku:'' AND updated_at:>'${updatedAt}'`,
      max:    max,
      cursor: cursor,
    });

    return [
      response.data.productVariants.nodes,
      response.data.productVariants.pageInfo
    ];
  },
}

module.exports = ShopifyUtil;