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
    Mesa.log.info('Custom Debug Assigned Inventory', assignedInventory);

    for (let lineItem of order.line_items) {
      // Variant ID null probably means it was deleted
      if (!lineItem.variant_id) {
        return false;
      }

      let onHandLevels = ShopifyUtil.variantOnHandInventoryLevels(lineItem.variant_id);
      let totalOnHand = onHandLevels.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.quantities[0].on_hand;
      }, 0); 

      let totalAssigned = assignedInventory[lineItem.variant_id] ? assignedInventory[lineItem.variant_id] : 0;
      let onHandUnassigned = totalOnHand - totalAssigned;

      let variant = Shopify.get('/admin/variants/' + lineItem.variant_id + '.json').variant;
      Mesa.log.info(`Custom Debug isFulfillable: Order ${order.id}, SKU ${lineItem.sku}, variantId: ${lineItem.variant_id}, quantity: ${lineItem.quantity}, 
       on hand: ${totalOnHand}, policy: ${variant.inventory_policy}, assigned: ${totalAssigned}, on hand unassigned: ${onHandUnassigned}` 
      ); 

      // inventory is tracked
      if (variant.inventory_management === null) { 
        continue;
      }

      if (onHandUnassigned < lineItem.quantity) {
        Mesa.log.info("Custom Debug  Conditional False");
        return false;
      }
    }

    return true;
  }
}
