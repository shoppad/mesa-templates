const Mesa = require('./vendor/Mesa.js');
const Twilio = require('./vendor/Twilio.js');

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
    const twilio = new Twilio(Mesa.secret.get('tracktor-twilio-sid'), Mesa.secret.get('tracktor-twilio-token'))
    const response = twilio.send({
      to: payload.order.phone,
      from: Mesa.secret.get('tracktor-twilio-phone-number'),
      body: Mesa.liquid.render(Mesa.storage.get(`tracktor-sms-${payload.status}.liquid`), payload),
    });
    Mesa.log.info('Twilio response', response);
  }
}
