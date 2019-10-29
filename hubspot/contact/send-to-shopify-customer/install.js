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
    this.createWorkflow('create');
    this.createWorkflow('update');
  };

  /**
   * Convenience method to create workflow
   *
   * @param action 'create' or 'update
   */
  createWorkflow = action => {
    // Check if this script has already run, do not run again as this will create another workflow in HubSpot
    if (
      Mesa.storage.get(`hubspot-${action}-contact-workflow-created`) !== 'true'
    ) {
      let webhookPayload =
        '{"name":"Mesa Contact Created","type":"DRIP_DELAY","onlyEnrollsManually":false,"actions":[{"type":"WEBHOOK","method":"POST","url":"{webhook_url}"}],"segmentCriteria":[[{"filterFamily":"PropertyValue","withinTimeMode":"PAST","operator":"IS_NOT_EMPTY","property":"hs_object_id","type":"number"},{"filterFamily":"PropertyValue","withinTimeMode":"PAST","operator":"NEQ","property":"hs_analytics_source_data_1","value":"API","type":"string"},{"filterFamily":"PropertyValue","withinTimeMode":"PAST","operator":"CONTAINS","property":"email","value":"john_230+1@hotmail.com;john+hubspot","type":"string"}]],"reEnrollmentTriggerSets":[],"enabled":true}';

      if (action === 'update') {
        webhookPayload =
          '{"name":"Mesa Contact Updated","type":"DRIP_DELAY","onlyEnrollsManually":false,"actions":[{"type":"WEBHOOK","method":"POST","url":"{webhook_url}"}],"segmentCriteria":[[null,{"filterFamily":"PropertyValue","withinTimeMode":"PAST","operator":"IS_NOT_EMPTY","property":"firstname","type":"string"},{"compareProperty":"createdate","filterFamily":"PropertyValue","withinTimeMode":"PAST","operator":"GT","property":"lastmodifieddate","type":"datetime"}],[null,{"filterFamily":"PropertyValue","withinTimeMode":"PAST","operator":"IS_NOT_EMPTY","property":"lastname","type":"string"},{"compareProperty":"createdate","filterFamily":"PropertyValue","withinTimeMode":"PAST","operator":"GT","property":"lastmodifieddate","type":"datetime"}]],"allowContactToTriggerMultipleTimes":true,"reEnrollmentTriggerSets":[[{"id":"firstname","type":"CONTACT_PROPERTY_NAME"}],[{"id":"lastname","type":"CONTACT_PROPERTY_NAME"}]],"enabled":true}';
      }

      // Get the URL of the webhook which HubSpot will call
      const webhookUrl = Mesa.input.getWebhookUrl(
        'json',
        'string',
        context.automation._id,
        `in-hubspot-contact-${action}`
      );

      Mesa.log.debug(`url for HubSpot ${action} webhook`, webhookUrl);

      // Add the webhook URL
      webhookPayload = webhookPayload.replace('{webhook_url}', webhookUrl);

      Mesa.log.debug('About to create webhook with payload', webhookPayload);

      const hubspot = new Hubspot(Mesa.secret.get('hubspot-hapi'));

      const response = hubspot.createWorkflow(webhookPayload);

      if (response.error) {
        hubspot.logError(response, 'creating', 'Workflow');
      } else {
        Mesa.log.info(
          'HubSpot workflow created successfully with ID',
          response.id
        );

        // Sucessful response from HubSpot, set hubspot-create-contact-workflow-created to true, so this install script doesn't create another workflow if run again
        Mesa.storage.set(`hubspot-${action}-contact-workflow-created`, 'true');
      }
    } else {
      Mesa.log.error(
        `Workflow has already been created. If you are sure you want to recreate the workflow, set storage item "hubspot-${action}-contact-workflow-created" to false and retry`
      );
      return;
    }
  };
})();
