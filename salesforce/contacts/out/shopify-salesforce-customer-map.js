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
    shopify: 'default_address.address1',
    salesforce: 'MailingStreet',
  },
  city: {
    shopify: 'default_address.city',
    salesforce: 'MailingCity',
  },
  country: {
    shopify: 'default_address.country',
    salesforce: 'MailingCountry',
  },
  phone: {
    shopify: 'default_address.phone',
    salesforce: 'Phone',
  },
  province: {
    shopify: 'default_address.province',
    salesforce: 'MailingState',
  },
  zip: {
    shopify: 'default_address.zip',
    salesforce: 'MailingPostalCode',
  },
}