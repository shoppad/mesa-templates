/*******************************************************************************
 *
 * SHOPPAD CONFIDENTIAL
 * __________________
 *
 * Copyright (c) 2012 - 2019 ShopPad Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of ShopPad Inc. and its suppliers, if any.
 * The intellectual and technical concepts contained herein are
 * proprietary to ShopPad Inc. and its suppliers and may be covered
 * by U.S. and Foreign Patents, patents in process, and are protected
 * by trade secret or copyright law. Dissemination of this information
 * or reproduction of this material is strictly forbidden unless prior
 * written permission is obtained from ShopPad Inc.
 ******************************************************************************/

/**
 * Relationship between Shopify values to their Fosdick values
 */
module.exports = {
  subtotal: {
    shopify: 'total_line_items_price',
    fosdick: 'Subtotal',
  },
  discounts: {
    shopify: 'total_discounts',
    fosdick: 'Discounts',
  },
  postage: {
    shopify: 'total_shipping_price_set.shop_money.amount',
    fosdick: 'Postage',
  },
  tax: {
    shopify: 'total_tax',
    fosdick: 'Tax',
  },
  total: {
    shopify: 'total_price',
    fosdick: 'Total',
  },
  payment_type: {
    shopify: 'payment_details.credit_card_company',
    fosdick: 'PaymentType',
  },
  external_id: {
    shopify: 'id',
    fosdick: 'ExternalID',
  },
  order_date: {
    shopify: 'created_at',
    fosdick: 'OrderDate',
  },
  ship_first_name: {
    shopify: 'shipping_address.first_name',
    fosdick: 'ShipFirstname',
  },
  ship_last_name: {
    shopify: 'shipping_address.last_name',
    fosdick: 'ShipLastname',
  },
  ship_address1: {
    shopify: 'shipping_address.address1',
    fosdick: 'ShipAddress1',
  },
  ship_address2: {
    shopify: 'shipping_address.address2',
    fosdick: 'ShipAddress2',
  },
  ship_city: {
    shopify: 'shipping_address.city',
    fosdick: 'ShipCity',
  },
  ship_state: {
    shopify: 'shipping_address.state_code',
    fosdick: 'ShipState',
  },
  ship_state_other: {
    shopify: 'shipping_address.state_other',
    fosdick: 'ShipStateOther',
  },
  ship_zip: {
    shopify: 'shipping_address.zip',
    fosdick: 'ShipZip',
  },
  ship_country: {
    shopify: 'shipping_address.country',
    fosdick: 'ShipCountry',
  },
  ship_phone: {
    shopify: 'shipping_address.phone',
    fosdick: 'ShipPhone',
  },
  email: {
    shopify: 'customer.email',
    fosdick: 'Email',
  },
  bill_first_name: {
    shopify: 'billing_address.first_name',
    fosdick: 'BillFirstname',
  },
  bill_last_name: {
    shopify: 'billing_address.last_name',
    fosdick: 'BillLastname',
  },
  bill_address1: {
    shopify: 'billing_address.address1',
    fosdick: 'BillAddress1',
  },
  bill_address2: {
    shopify: 'billing_address.address2',
    fosdick: 'BillAddress2',
  },
  bill_city: {
    shopify: 'billing_address.city',
    fosdick: 'BillCity',
  },
  bill_state: {
    shopify: 'billing_address.state_code',
    fosdick: 'BillState',
  },
  bill_state_other: {
    shopify: 'billing_address.state_other',
    fosdick: 'BillStateOther',
  },
  bill_zip: {
    shopify: 'billing_address.zip',
    fosdick: 'BillZip',
  },
  bill_country: {
    shopify: 'billing_address.country',
    fosdick: 'BillCountry',
  },
  bill_phone: {
    shopify: 'billing_address.phone',
    fosdick: 'BillPhone',
  }
}