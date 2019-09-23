const Mesa = require('vendor/Mesa.js');
const Cognito = require('vendor/cognito.js');

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

    if (!payload.phone) {
      throw new Error('No phone included in order details');
    }

    let cognito = new Cognito(Mesa.secret.get('cognito-key'), Mesa.secret.get('cognito-secret'), Mesa.storage.get('cognito-environment'));
    
    const data = cognito.identitySearch(payload.phone, payload.shipping_address.first_name, payload.shipping_address.last_name);
    Mesa.log.debug('Cognito data', data);

    // If we have data, we call the main output
    if (data.data.relationships.identity_records) {
      Mesa.output.send('out-update-shopify-order-notes', {
        order: payload,
        cognito: data,
      });
    }
    else {
      Mesa.vo.push('out-cognito-virtual-output', {
        cognito_id: data.id,
        order: payload,
      });
      Mesa.log.info(`Cognito returned no data. Enqueued job ${data.id} in the Virtual Output.`);
    }
  }


}
