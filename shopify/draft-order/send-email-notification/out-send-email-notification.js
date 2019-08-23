const Mesa = require("vendor/Mesa.js");
const Shopify = require("vendor/Shopify.js");

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    // Getting shop information.
    const shopData = Shopify.get("/admin/api/2019-07/shop.json").shop;

    // Building draft order url.
    const draftOrderUrl = `https://${shopData.myshopify_domain}/admin/draft_orders/${payload.id}`;

    // Building email body.
    const body = `New draft order has been created. See ${draftOrderUrl}`;

    // Building email subject.
    const subject = `${shopData.name}: New draft order has been created.`;

    // Send email notification.
    Mesa.email.send(shopData.email, subject, body);
  };
})();
