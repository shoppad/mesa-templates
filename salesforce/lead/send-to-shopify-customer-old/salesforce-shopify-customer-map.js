/**
 * Relationship between Shopify values to their Salesforce values
 */
module.exports = {
  email: {
    shopify: 'email',
    salesforce: 'Email',
  },
  first_name: {
    shopify: 'first_name',
    salesforce: 'FirstName',
  },
  last_name: {
    shopify: 'last_name',
    salesforce: 'LastName',
  },
  address1: {
    shopify: 'addresses[0].address1',
    salesforce: 'Street',
  },
  address2: {
    shopify: 'addresses[0].address2',
    salesforce: 'Street',
  },
  city: {
    shopify: 'addresses[0].city',
    salesforce: 'City',
  },
  country: {
    shopify: 'addresses[0].country',
    salesforce: 'Country',
  },
  phone: {
    shopify: 'addresses[0].phone',
    salesforce: 'Phone',
  },
  province: {
    shopify: 'addresses[0].province',
    salesforce: 'State',
  },
  zip: {
    shopify: 'addresses[0].zip',
    salesforce: 'PostalCode',
  },
}