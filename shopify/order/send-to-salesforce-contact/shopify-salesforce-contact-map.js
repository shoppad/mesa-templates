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
    salesforce: 'MailingStreet',
  },
  city: {
    shopify: 'customer.default_address.city',
    salesforce: 'MailingCity',
  },
  country: {
    shopify: 'customer.default_address.country',
    salesforce: 'MailingCountry',
  },
  phone: {
    shopify: 'customer.default_address.phone',
    salesforce: 'Phone',
  },
  province: {
    shopify: 'customer.default_address.province',
    salesforce: 'MailingState',
  },
  zip: {
    shopify: 'customer.default_address.zip',
    salesforce: 'MailingPostalCode',
  },
}