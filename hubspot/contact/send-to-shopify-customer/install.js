const Mesa = require('vendor/Mesa.js');
const Hubspot = require('vendor/Hubspot.js');

/**
 * Creates HubSpot workflow, which will call the webhook defined in input 'in-hubspot-contact-create'
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    // Check if this script has already run, do not run again as this will create another workflow in HubSpot
    if (Mesa.storage.get('hubspot_workflow_created') === 'true') {
      Mesa.log.error(
        'Workflow has already been created. If you are sure you want to recreate the workflow, set storage item "hubspot_workflow_created" to false and retry'
      );
      return;
    }

    // Get the URL of the webhook which HubSpot will call
    const webhookUrl = Mesa.input.getWebhookUrl(
      'json',
      'string',
      context.automation._id,
      'in-hubspot-contact-create'
    );

    Mesa.log.debug('url for HubSpot webhook ', webhookUrl);

    // Get base payload to create the HubSpot workflow
    let webhookPayload = Mesa.storage.get(
      'hubspot-create-contact-workflow.json'
    );

    // Add the webhook URL
    webhookPayload = webhookPayload.replace('{webhook_url}', webhookUrl);

    Mesa.log.debug('About to create webhook with payload', webhookPayload);

    const hubspot = new Hubspot(Mesa.secret.get('hubspot_hapi'));

    const response = hubspot.createWorkflow(webhookPayload);

    if (response.error) {
      hubspot.logError(response, 'creating', 'Workflow');
    } else {
      Mesa.log.info(
        'HubSpot workflow created successfully with ID',
        response.id
      );

      // Sucessful response from HubSpot, set hubspot_workflow_created to true, so this install script doesn't create another workflow if run again
      Mesa.storage.set('hubspot_workflow_created', 'true');
    }
  };
})();
