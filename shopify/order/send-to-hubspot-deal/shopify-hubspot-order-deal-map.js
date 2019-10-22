/**
 * Relationship between Shopify values to their HubSpot values
 */
module.exports = {
  dealname: {
    shopify: 'dealname',
    hubspot: 'dealname'
  },
  dealtype: {
    shopify: 'dealtype',
    hubspot: 'dealtype'
  },
  pipeline: {
    shopify: 'pipeline',
    hubspot: 'pipeline'
  },
  dealstage: {
    shopify: 'dealstage',
    hubspot: 'dealstage'
  },
  total_price: {
    shopify: 'total_price',
    hubspot: 'amount'
  },
  created_at: {
    shopify: 'created_at',
    hubspot: 'closedate'
  }
};
