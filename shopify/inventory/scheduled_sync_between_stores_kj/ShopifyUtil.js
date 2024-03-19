const ShopifyGraphql = require('vendor/ShopifyGraphql.js');

const ShopifyUtil = { 

  inventoryLevelsUpdatedSince: (updatedAt, max) => { 
    const query = `#graphql
      query inventoryItemsSince($query:String!, $max:Int!) {
        productVariants(first: $max, query:$query) {
          nodes {
            sku
            updatedAt
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
      query:  `updated_at:>'${updatedAt}'`,
      max:    max,
    });

    return [
      response.data.productVariants.nodes,
      response.data.productVariants.pageInfo
    ];
  },
}

module.exports = ShopifyUtil;