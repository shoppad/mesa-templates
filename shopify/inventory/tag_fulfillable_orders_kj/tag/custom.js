const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');
const ShopifyUtil = require('../ShopifyUtil.js');

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
    Mesa.output.next({"is_fulfillable": this.isFulfillable(context)});
  }

  isFulfillable = (context) => {
    let vars = context.steps;
    let order = vars.loop;

    let skus = order.line_items.map(item => `${item.sku}: ${item.quantity}`).join(', ');

    Mesa.trigger.setTaskExternalData({
      label: "SKUs: " + skus
    });

    let assignedInventory = vars.data_1.reduce((accumulator, dataRow) => {
      accumulator[dataRow.variant_id] = dataRow.quantity;
      return accumulator;
    }, {});      

    for (let lineItem of order.line_items) {
      let onHandLevels = ShopifyUtil.variantOnHandInventoryLevels(lineItem.variant_id);
      let totalOnHand = onHandLevels.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.quantities[0].on_hand;
      }, 0); 

      let totalAssigned = assignedInventory[lineItem.variant_id];

      let onHandUnassigned = totalOnHand - totalAssigned;

      let variant = Shopify.get('/admin/variants/' + lineItem.variant_id + '.json').variant;
      Mesa.log.info(`Debug isFulfillable: Order ${order.id}, SKU ${lineItem.sku}, variantId: ${lineItem.variant_id}, quantity: ${lineItem.quantity}, 
       on hand: ${totalOnHand}, policy: ${variant.inventory_policy}, on hand unassigned: ${onHandUnassigned}, assigned: ${totalAssigned}` 
      );

      /*
      I think we don't want to respec this here
      if (variant.inventory_policy == 'allow') {
        return true;
      } 
      */
      
      if (onHandUnassigned < lineItem.quantity) {
        Mesa.log.info("Custom Debug  Conditional False");
        return false;
      }
    }

    return true;
  }
}
