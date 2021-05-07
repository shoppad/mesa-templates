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

    /**
     * Variant query graphql body
     */
    const beginEditMutation = `mutation beginEdit(
      $orderId: ID!
    ){
      orderEditBegin(id: $orderId){
        calculatedOrder{
          id
        }
      }
    }`;

    /**
     * Variant query graphql body
     */
    const addVariantToOrderAndCommitMutation = `mutation addVariantToOrderAndCommit(
      $calculatedOrderId: ID!
      $variantId: ID!
      $quantity: Int!
      $notifyCustomer: Boolean!
      $staffNote: String!
    ){
      orderEditAddVariant(id: $calculatedOrderId, variantId: $variantId, quantity: $quantity){
        calculatedOrder {
          id
          addedLineItems(first:5) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
      
      orderEditCommit(id: $calculatedOrderId, notifyCustomer: $notifyCustomer, staffNote: $staffNote) {
        order {
          id
        }
        userErrors {
          field
          message
        }
      }
    }`;


    const response1 = ShopifyGraphql.send(beginEditMutation, {
      orderId: ShopifyGraphql.buildShopifyId('Order', payload.order_id)
    });

    // @todo: handle err

    const calculatedOrder = response1.data.orderEditBegin.calculatedOrder || null;
    if (!calculatedOrder) {
      throw new Error(`Order cannot be edited ${payload.order_id}`);
    }
    Mesa.log.debug(`Using calculatedOrderId`, calculatedOrder.id);
    
    const response2 = ShopifyGraphql.send(addVariantToOrderAndCommitMutation, {
      calculatedOrderId: calculatedOrder.id,
      variantId: ShopifyGraphql.buildShopifyId('ProductVariant', payload.product_variant_id),
      quantity: parseInt(payload.quantity),
      notifyCustomer: payload.notify_customer,
      staffNote: payload.order_note || '',
    });

    if (!response2.data.orderEditCommit.order) {
      throw new Error(`Order edit failed ${JSON.stringify(response2)}`);
    }

    // We're done, call the next step!
    Mesa.output.next({
      order_id: payload.order_id,
      line_item: response2.data.orderEditAddVariant.calculatedOrder.addedLineItems.edges.node
    });
  }
}
