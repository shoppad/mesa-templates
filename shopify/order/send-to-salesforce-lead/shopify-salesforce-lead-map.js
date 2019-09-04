/**
 * Relationship between Shopify values to their Salesforce values
 */
module.exports = {
  email: {
    shopify: 'email',
    salesforce: 'Email',
  },
  first_name: {
    shopify: 'customer.first_name',
    salesforce: 'FirstName',
  },
  last_name: {
    shopify: 'customer.last_name',
    salesforce: 'LastName',
  },
  address1: {
    shopify: 'customer.default_address.address1',
    salesforce: 'Street',
  },
  city: {
    shopify: 'customer.default_address.city',
    salesforce: 'City',
  },
  country: {
    shopify: 'customer.default_address.country',
    salesforce: 'Country',
  },
  phone: {
    shopify: 'customer.default_address.phone',
    salesforce: 'Phone',
  },
  province: {
    shopify: 'customer.default_address.province',
    salesforce: 'State',
  },
  zip: {
    shopify: 'customer.default_address.zip',
    salesforce: 'PostalCode',
  },
  company: {
    shopify: 'customer.default_address.company',
    salesforce: 'Company',
  },
}