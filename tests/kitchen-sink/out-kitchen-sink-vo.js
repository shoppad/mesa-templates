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

    // Your code goes here

    Mesa.log.info('');
    Mesa.log.info('Kithen sink VO Payload', payload);

    Mesa.log.info('Calling  Mesa.output.send(\'out-kitchen-sink-ftp\')', payload);
    Mesa.output.send('out-kitchen-sink-ftp', data);
  }
}
