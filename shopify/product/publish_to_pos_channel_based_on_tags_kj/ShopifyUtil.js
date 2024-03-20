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

  customersWithPaymentMethods: (max) => { 
    const query = `#graphql
      query customersWithPaymentMethods($max:Int!) {
        customers(first:$max,reverse:true) {
          nodes {
            id
            firstName
            paymentMethods(first:10) {
              nodes {
                id
                ... on CustomerPaymentMethod {
                  instrument {
                    ... on CustomerShopPayAgreement {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }        
    `;

    const response = ShopifyGraphql.send(query, {
      max:    max,
    });

    return response.data.customers.nodes;
  },

  customerPaymentMethods: (id) => { 
    const query = `#graphql
      query customersWithPaymentMethods($id:ID!) {
        customer(id:$id) {
          id
          firstName
          paymentMethods(first:10) {
            nodes {
              id
              ... on CustomerPaymentMethod {
                instrument {
                  ... on CustomerShopPayAgreement {
                    name
                  }
                }
              }
            }
          }
        }
      }        
    `;

    const response = ShopifyGraphql.send(query, {
      id: "gid://shopify/Customer/7261713268985",
    });

    return response.data.customers.nodes;
  },

  getPublicationIdByName: (name) => {
    let query = `
      {
        publications(first:10){
          nodes {
            id
            name      
          }
        }
      }
    `;

    const r = ShopifyGraphql.send(query, null, {}, 'admin/api/2023-10/graphql.json');
    for (let publication of r.data.publications.nodes) {
      Mesa.log.info("publication", publication);
      if (publication.name == name) {
        return publication.id;
      }
    }

    throw new Error("No 'Point of Sale' publication found"); 
  },

  unpublishFromChannel: (gid, publicationId) => { 
    let query = `
      mutation publishableUnpublish($id: ID!, $input: [PublicationInput!]!) {
        publishableUnpublish(id: $id, input: $input) {
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
      "id": gid,
      "input": {
        "publicationId": publicationId,
      }
    }, {}, 'admin/api/2023-10/graphql.json');

    if (r.data.publishableUnpublish.userErrors.length) {
      throw new Error(JSON.stringify(r.data.publishableUnpublish.userErrors));
    }
    
    return r;
  },

  publishToChannel: (gid, publicationId) => { 
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

    const response = ShopifyGraphql.send(query, {
      "id": gid,
      "input": {
        "publicationId": publicationId,
      }
    }, {}, 'admin/api/2023-10/graphql.json');

    if (response.data.publishablePublish.userErrors.length) {
      throw new Error(JSON.stringify(r.data.publishablePublish.userErrors));
    }
  
    return response;
  },
}

module.exports = ShopifyUtil;