/**
 * Relationship between Shopify line item values to their Fosdick values
 */
module.exports = {
  sku: {
    shopify: 'sku',
    fosdick: 'Inv',
  },
  qty: {
    shopify: 'quantity',
    fosdick: 'Qty',
  },
  price: {
    shopify: 'price',
    fosdick: 'PricePer',
  }
}