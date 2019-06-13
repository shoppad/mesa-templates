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

    const subject = Mesa.storage.get('tracktor-email-subject-in-transit');
    const body = Mesa.storage.get('tracktor-email-in-transit.liquid');
    Mesa.email.send(payload.order.email, subject, body);
  }
}
