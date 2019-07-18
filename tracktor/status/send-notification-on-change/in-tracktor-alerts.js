const Mesa = require('./vendor/Mesa1.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Enabled notification methods.
   *
   * Comment out the line of any of the methods below that you would like to disable.
   * @type {string[]}
   */
  methods = [
    'twilio',
    'email',
  ];

  /**
   * Enabled notification statuses.
   *
   * Comment out the line below to disable notifications for that status.
   * @type {string[]}
   */
  statuses = [
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

    if (this.statuses.indexOf(payload.tracking.status) === -1) {
      Mesa.log.warn(`Status alerts for ${payload.tracking.status} are disabled in the in-tracktor-alerts.js configuration`); 
    }

    payload.status = payload.tracking.status.replace(/\_/g, '-');

    // Try sending an SMS via Twilio
    if (method === 'twilio') {
                Mesa.log.info('sid', Mesa.secret.get('tracktor-twilio-sid'));

      let smsBody = Mesa.storage.get(`tracktor-sms-${payload.status}.liquid`, false);
      if (!payload.order.phone) {
        Mesa.log.info(`No phone number set on order, skipping SMS sending`); 
      }
      else if (smsBody) {
        if (!Mesa.secret.get('tracktor-twilio-sid', false)) {
          Mesa.log.warn(`tracktor-twilio-sid secret not set, skipping SMS sending`);
        }
        if (!Mesa.secret.get('tracktor-twilio-token', false)) {
          Mesa.log.warn(`tracktor-twilio-token secret not set, skipping SMS sending`);
        }
        if (!Mesa.secret.get('tracktor-twilio-phone-number', false)) {
          Mesa.log.warn(`tracktor-twilio-phone-number secret not set, skipping SMS sending`);
        }
        else {
          return Mesa.output.send('out-tracktor-twilio', payload);
        }
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
