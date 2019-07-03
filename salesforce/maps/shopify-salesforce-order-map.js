/**
 * Relationship between Shopify values to their Salesforce values
 */
module.exports = {
  billing_address1: {
    shopify: 'billing_address.address1',
    salesforce: 'BillingStreet',
  },
  billing_city:{
    shopify: 'billing_address.city',
    salesforce: 'BillingCity',
  },
  billing_province: {
    shopify: 'billing_address.province',
    salesforce: 'BillingState',
  },
  billing_zip: {
    shopify: 'billing_address.zip',
    salesforce: 'BillingPostalCode',
  },
  billing_country: {
    shopify: 'billing_address.country',
    salesforce: 'BillingCountry',
  },
  billing_created_at: {
    shopify: 'created_at',
    salesforce: 'EffectiveDate',
  },
  billing_name: {
    shopify: 'name',
    salesforce: 'Name', 
  },
  // {
  // Order number is a SF auto-generated field
  //   shopify: 'number',
  //   salesforce: 'OrderNumber'
  // },
  shipping_address1: {
    shopify: 'shipping_address.address1',
    salesforce: 'ShippingStreet',
  },
  shipping_city: {
    shopify: 'shipping_address.city',
    salesforce: 'ShippingCity',
  },
  shipping_province: {
    shopify: 'shipping_address.province',
    salesforce: 'ShippingStreet',
  },
  shipping_zip: {
    shopify: 'shipping_address.zip',
    salesforce: 'ShippingPostalCode',
  },
  shipping_country: {
    shopify: 'shipping_address.country',
    salesforce: 'ShippingCountry',
  },
  // @todo: this should go to TotalAmount field, but this field is computed.
  // Would need to map line items to order items, and possibly Pricebook
  total_price: {
    shopify: 'total_price',
    salesforce: 'ShopifyTotalAmount__c',
  }
}