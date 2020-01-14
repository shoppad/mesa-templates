const Mesa = require('vendor/Mesa.js');
const Slack = require('vendor/Slack.js');
const Shopify = require('vendor/Shopify.js');

/**
 * This script processes a custom output containing a created order, doing the following:
 *
 *  1. Receives order payload.
 *
 *  2. Send a Slack notification containing the order details.
 *
 * Note: There are two Slack snippets here, which can be uncommented / commented out as appropriate:
 *
 *  1. The active one uses richly formatted content (https://api.slack.com/docs/message-attachments), with
 *  buttons to view the order and view all paid orders.
 *
 *  2. The second, commented-out version is a simple one-line message.
 *
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    const url = Mesa.secret.get('slack-webhook-url');
    const slack = new Slack(url);

    const response = Shopify.get(`admin/orders/${payload.id}.json`);

    const order = response.order;

    // Order is paid, so send a slack message
    const orderCreatedDate = new Date(order.created_at);

    /**
     * BEGIN Comprehensive Slack request, with buttons / text columns
     *
     * See below for a simple request version instead
     */

    slack.send(
      `Order paid for: https://${context.output.uuid}.myshopify.com :thumbsup:`,
      {
        channel: Mesa.storage.get('slack-channel'),
        attachments: [
          {
            fallback: `Order paid \`${
              order.name
            }\`. Order created: \`${Mesa.date.format(
              'D, M j Y',
              orderCreatedDate.getTime()
            )} \`. https://${context.output.uuid}.myshopify.com/admin/orders/${
              order.id
            }`,
            title: `Order <https://${context.output.uuid}.myshopify.com/admin/orders/${order.id}|${order.name}>`,
            title_link: `https://${context.output.uuid}.myshopify.com/admin/orders/${order.id}`,
            fields: [
              {
                title: 'Date',
                value: Mesa.date.format('D, M j Y', orderCreatedDate.getTime()),
                short: true
              },
              {
                title: 'Customer',
                value: order.contact_email,
                short: true
              },
              {
                title: 'Order Total',
                value: order.total_price + ' ' + order.currency,
                short: true
              }
            ],
            actions: [
              {
                type: 'button',
                text: 'Manage order :arrow_right:',
                url: `https://${context.output.uuid}.myshopify.com/admin/orders/${order.id}`,
                style: 'primary'
              },
              {
                type: 'button',
                text: `View paid orders`,
                url: `https://${context.output.uuid}.myshopify.com/admin/orders?financial_status=paid`
              }
            ]
          }
        ]
      }
    );

    /**
     * END Comprehensive Slack request
     */

    /**
     * BEGIN Simple slack request (uncomment code below to enable)
     */

    // slack.send(
    //   `Order paid \`${order.name}\`. Date: \`${Mesa.date.format(
    //     'D, M j Y',
    //     orderCreatedDate.getTime()
    //   )}\`. <https://${context.output.uuid}.myshopify.com/admin/orders/${
    //     order.id
    //   }|Manage Order> :thumbsup:`,
    //   {
    //     channel: Mesa.storage.get('slack-channel'),
    //     icon_emoji: ':-1:'
    //   }
    // );

    /**
     * END Simple Slack request
     */
  };
})();
