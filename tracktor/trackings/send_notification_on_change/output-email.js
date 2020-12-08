const Mesa = require('./vendor/Mesa.js');

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
    const subject = Mesa.liquid.render(Mesa.storage.get(`tracktor-email-subject-${payload.status}`), payload);
    const body = Mesa.liquid.render(Mesa.storage.get(`tracktor-email-${payload.status}.liquid`), payload);
    Mesa.email.send(payload.order.email, subject, body);
    Mesa.log.info('Sent email', {to: payload.order.email, storage: `tracktor-email-${payload.status}.liquid`})
  }
}
