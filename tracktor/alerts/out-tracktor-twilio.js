const Mesa = require('./vendor/Mesa1.js');

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
    this.messagesCreate({
      to: payload.order.phone,
      from: Mesa.secret.get('tracktor-twilio-phone-number'),
      body: Mesa.liquid.render(Mesa.storage.get(`tracktor-sms-${payload.status}`), payload),
    });
  }

  /**
   * Send an SMS message
   * 
   * data.to
   * data.from
   * data.body
   */
  messagesCreate = (data) => {

    const url = curl `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    Mesa.log.info('Sending Twilio SMS', data);
    return Mesa.request.post(url, data);
  }
}
