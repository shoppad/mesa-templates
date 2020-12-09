const Mesa = require('vendor/Mesa.js');

/**
 * This utility script can be used by an Input to call a Virtual Output of the same name, with the suffix "VO".
 *
 * For example if you have an Input with the name "Order FTP", which defaults to the key `in-order-ftp`), it will call
 * the Output with the name "Order FTP VO" and the key `out-order-ftp-vo`.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    Mesa.vo.push('out-orders-vo', payload);
  }
}
