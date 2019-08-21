const Mesa = require('vendor/Mesa.js');

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

    const data = Mesa.csv.decode(payload);

    data.forEach(function (item) {

      if (item['Customer PO'] && item['Customer PO'].indexOf('#') !== -1) {
        
        const exploded = item['Customer PO'].split('#');
        const orderId = exploded[0];
        const orderName = `#${exploded[1]}`;

        const data = {
          notify_customer: true,
          tracking_number: item['Tracking No(s)']
        }

        Mesa.output.send('out-create-shopify-fulfillment', {
          data: data,
          params: {order_id: orderId},
        });

      }
      else {
        Mesa.log.info(`Skipping order ${item['Order No']}. Customer PO "${item['Customer PO']}" does not include a "#".`);
      }

    });

    Mesa.log.info('Moving file', [context.filename, context.filename.replace('confirms', 'confirms/processed')]);
    Mesa.ftp.moveFile(context.filename, context.filename.replace('confirms', 'confirms/processed'));
  }
}
