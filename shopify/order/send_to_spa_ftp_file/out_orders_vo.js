const Mesa = require('vendor/Mesa.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {array} payload: The payload data
   * @param {object {
   *   task: {},
   *   input: {},
   *   output: {},
   *   headers: {},
   *   filename: ""
   * }} context: Additional context about this task
   */
  script = (payload, context) => {
    Mesa.log.info('payload count', payload.length);

    const now = new Date();
    let hours = now.getHours();
    if (hours < 0) {
      hours += 24;
    }
    Mesa.log.info('current time (hours)', hours);

    let numJobs = false;

    if (hours > 5 && hours < 11) {
      numJobs = 10;
    } else if (hours >= 11 && hours <= 12) {
      numJobs = 1;
    } else if (hours > 12 && hours < 6) {
      numJobs = 10;
    } else {
      numJobs = 50;
    }

    if (context.task.is_test) {
      if (!payload.length) {
        return Mesa.log.error('Test mode: Payload was empty.');
      }
      Mesa.log.info('Test mode: Calling oout-save-orders-to-ftps', {
        numjobs: numJobs,
        payload_length: payload.length,
      });
      this.send(payload);
    }
    else if (numJobs !== false && payload.length >= numJobs) {
      Mesa.log.info('Calling out-save-orders-to-ftp', {
        numjobs: numJobs,
        payload_length: payload.length,
      });
      this.send(payload);
    }
    else {
      Mesa.log.info('Skipping, did not meet numjobs requirements', {
        numjobs: numJobs,
        payload_length: payload.length,
      });
    }

  };

  /**
   * Call the output and clear the Virtual Output items.
   */
  send = (payload) => {
    Mesa.output.send('out-save-orders-to-ftp', payload);
    Mesa.vo.clear('out-orders-vo');
  }
}
