const Mesa = require('./vendor/Mesa1.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  const methods = [
    'twilio',
    'email',
  ];

  const statuses = [
    'fulfilled',
    'in_transit',
    'out_for_delivery',
    'delivered',
    'failed',
  ];

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    let method = this.methods.shift();

    if (this.statuses.indexOf(payload.status) === -1) {
      Mesa.log.warn(`Status alerts for ${status} are disabled in the in-tracktor-alerts.js configuration`); 
    }

    // Try sending an SMS via Twilio
    if (method === 'twilio') {
      if (!payload.order.phone) {
        Mesa.log.info(`No phone number set on order, skipping SMS sending`); 
      }
      let smsBody = Mesa.secret.get(`tracktor-sms-${payload.status}`);
      if (smsBody) {
        if (!Mesa.secret.get('tracktor-twilio-sid')) {
          Mesa.log.warn(`tracktor-twilio-sid secret not set, skipping SMS sending`);
        }
        if (!Mesa.secret.get('tracktor-twilio-secret')) {
          Mesa.log.warn(`tracktor-twilio-secret secret not set, skipping SMS sending`);
        }
        if (!Mesa.secret.get('tracktor-twilio-phone-number')) {
          Mesa.log.warn(`tracktor-twilio-phone-number secret not set, skipping SMS sending`);
        }
        return Mesa.output.send('out-tracktor-twilio', payload);
      }
      method = this.methods.shift();
    }

    // Next up: try email
    if (method === 'email') {
      return Mesa.output.send('out-tracktor-email', payload);
    }

    Mesa.log.error('No methods are active in the in-tracktor-alerts.js configuration');
  }
}
