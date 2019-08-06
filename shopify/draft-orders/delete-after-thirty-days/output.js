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
   */
  script = (payload, context) => {
    payload.forEach(function(order) {
      try {
        const response = Shopify.delete(`/admin/api/2019-07/draft_orders/${order.id}.json`);
        console.log('success, clear!', response);
        Mesa.vo.clearOne(context.output.key, order.mesa_id);
      } catch (e) {
        if (e.getCode() === 404) {
          Mesa.log.info(`404 returned when trying to delete draft order ${order.id}, this draft order was most likely deleted outside of Mesa, clearing from VO`);
          Mesa.vo.clearOne(context.output.key, order.mesa_id);
        } else {
          Mesa.log.error(`${e.getCode()} returned when trying to delete draft order ${order.id}`);
        }
      }
    });
  }
}
