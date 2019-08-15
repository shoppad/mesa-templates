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

/**
 * This utility script can be used by an Input to call an Output of the same name.
 *
 * For example if you have an input with the name "Slack Send", which defaults to the key `in-slack-send`), it will call
 * the output with the key `out-slack-send`.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    Mesa.output.send('out-update-shopify-order', payload);
  }
}
