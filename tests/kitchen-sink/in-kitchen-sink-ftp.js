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

      const data = Mesa.csv.decode(payload);
      Mesa.log.info('csv.decoded()', data);
      this.assert(data[0].hi === 'bye', 'Testing Mesa.csv.encode(), Mesa.csv.decode()');

      Mesa.log.info('Calling Mesa.ftp.moveFile()');
      const response = Mesa.ftp.moveFile(context.filename, context.filename.replace('harmonia/', 'harmonia/done/'));
  }

  assert = (condition, message) => {
    if (!condition) {
      Mesa.log.error(`FAILED: ${message}`);
    }
    else {
      Mesa.log.info(`PASSED: ${message}`);
    }
  }

}
