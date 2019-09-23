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
 *
 ******************************************************************************/

const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {

    // Prepare `notes_attributes` for shopify
    Mesa.log.debug('Calling shopify to get the latest order note_attributes');
    const order = Shopify.get(`admin/orders/${payload.order.id}.json`);
    let noteAttributes = order.order.note_attributes;

    let attributeName = Mesa.storage.get('notes-attribute-name', '');
    attributeName = (attributeName === '') ? `cloudinary_${payload.line_item.id}_${payload.key}` : attributeName;
    Mesa.log.debug('notes_attributes name', attributeName);

    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: attributeName,
      value: payload.cloudinary_url,
    });

    Mesa.log.debug('Saving Shopify notes_attributes', noteAttributes);
    const shopifyPayload = {
      order: {
        id: payload.id,
        note_attributes: noteAttributes,
      }
    };
    Mesa.output.done(shopifyPayload, {order_id: payload.order.id});
  }
}
