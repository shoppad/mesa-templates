const Mesa = require('vendor/Mesa.js');
const Cognito = require('vendor/Cognito.js');

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

    let cognito = new Cognito(Mesa.secret.get('cognito-key'), Mesa.secret.get('cognito-secret'), Mesa.storage.get('cognito-environment'));

    payload.forEach(function(item) {
      Mesa.log.info('payload', item);
      const data = cognito.checkIdentitySearchJob(item.cognito_id);

      // If we have data, we call the main output and clear the vo.
      if (data.data.relationships.identity_records) {
        Mesa.output.send('out-update-shopify-order-notes', {
          order: item.order,
          cognito: data,
        });
      } else {
        Mesa.vo.push('out-cognito-virtual-output', item);

        // Otherwise we leave this item in the VO to get picked up in the next run.
        Mesa.log.info(`Cognito returned no data. Re-enqueued job ${payload.cognito_id} in the Virtual Output.`);
      }
    });
    
  }
}
