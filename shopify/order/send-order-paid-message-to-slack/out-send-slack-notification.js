const Mesa = require('vendor/Mesa.js');
const Slack = require('vendor/Slack.js');
const Shopify = require('vendor/Shopify.js');

/**
 * This script processes a custom output containing a created order, doing the following:
 *
 *  1. Calls Shopify to check the fulfillment status of the order.
 *
 *  2. If order is not fulfilled, sends a Slack notification containing the order details
 *
 * Note: There are two Slack snippets here, which can be uncommented / commented out as appropriate:
 *
 *  1. The active one uses richly formatted content (https://api.slack.com/docs/message-attachments), with buttons to
 *     view the order and view all unfulfilled orders
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

    // Order is fulfilled, no further action required
    if (order.fulfillment_status === 'fulfilled') {
      Mesa.log.info(
        `Order ${order.name} is fulfilled, no further action necessary`,
        order.fulfillment_status
      );
    }

    // Order is not fulfilled, so send a slack message
    else if (
      order.fulfillment_status === null ||
      order.fulfillment_status !== 'fulfilled'
    ) {
      const orderCreatedDate = new Date(order.created_at);

      /**
       * BEGIN Comprehensive Slack request, with buttons / text columns
       *
       * See below for a simple request version instead
       */

      slack.send(
        `Found old unfulfilled order for: https://${context.output.uuid}.myshopify.com`,
        {
          channel: Mesa.storage.get('slack-channel'),
          attachments: [
            {
              fallback: `Found old unfulfilled order \`${
                order.name
              }\`. Order created: \`${Mesa.date.format(
                'D, M j Y',
                orderCreatedDate.getTime()
              )} \`. https://${
                context.output.uuid
              }.myshopify.com/admin/orders/${order.id}`,
              title: `Order <https://${context.output.uuid}.myshopify.com/admin/orders/${order.id}|${order.name}>`,
              title_link: `https://${context.output.uuid}.myshopify.com/admin/orders/${order.id}`,
              fields: [
                {
                  title: 'Date',
                  value: Mesa.date.format(
                    'D, M j Y',
                    orderCreatedDate.getTime()
                  ),
                  short: true
                },
                {
                  title: 'Customer',
                  value: order.contact_email,
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
                  text: `View unfulfilled orders`,
                  url: `https://${context.output.uuid}.myshopify.com/admin/orders?fulfillment_status=unshipped%2Cpartial`
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

      //slack.send(`Found old unfulfilled order \`${order.name}\`. Date: \`${Mesa.date.format('D, M j Y', orderCreatedDate.getTime())}\`. <https://${context.output.uuid}.myshopify.com/admin/orders/${order.id}|Manage Order>`, {
      //   channel: '#jf-slack-test',
      //   icon_emoji: ':-1:',
      // });

      /**
       * END Simple Slack request
       */
    }
  };
})();
