const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    let orderData = {
      inventory_behaviour: "decrement_ignoring_policy",
      name: `Etsy Order ${vars.etsy.receipt_id}`,
      email: vars.etsy.buyer_email,
      tags: "etsy-order-import",
      line_items: [],
    };

    for (let transaction of vars.etsy.transactions) {
      orderData.line_items.push({
        variant_id: this.shopifyGraphqlVariantIdFromSku(transaction.sku),
        quantity: transaction.quantity,
        price: transaction.price.amount,
        title: transaction.title,
        etsy_listing_id: transaction.listing_id,
      }) 
    }

    Mesa.output.next({"orderData": orderData});
  }
  
  shopifyGraphqlVariantIdFromSku = (sku) => {
    let query = `
      query($query: String!) {
        productVariants(first: 1, query: $query) {
          nodes {
            id
            legacyResourceId
          }
        }
      }
    `;

    const r = ShopifyGraphql.send(query, {
      "query": "sku:" + sku,
    });

    return r.data.productVariants.nodes[0].legacyResourceId;
  }
}
