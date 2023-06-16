const Mesa = require('vendor/Mesa.js');
const ShopifyGraphql = require('vendor/ShopifyGraphql.js');

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
    payload.product_id = this.getProductIdFromInventoryItemId(context.steps.transform.inventory_item_id);
    Mesa.output.next(payload);
  }

  getProductIdFromInventoryItemId = (inventory_item_id) => {
    let query = `
      query($id:ID!) {
        inventoryItem(id:$id){
          variant{
            product{
              id
            }
          }
        }
      }  
    `;
 
    const response = ShopifyGraphql.send(query, {
      "id": "gid://shopify/InventoryItem/" + inventory_item_id
    });

    Mesa.log.info("response: ", response);

    let product_id = response.data.inventoryItem.variant.product.id.match(/\d+$/)[0];

    return product_id;
  }
}
