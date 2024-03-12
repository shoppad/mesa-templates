const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    let orderData = vars.custom.orderData;
    let order = this.shopifyRestOrderCreate(orderData);

    Mesa.output.next({"order": order});
  }
  
  shopifyRestOrderCreate = (orderData) => {
    let response = Shopify.post(`/admin/orders.json`, {
      order: orderData 
    });

    return response;
  }
}
