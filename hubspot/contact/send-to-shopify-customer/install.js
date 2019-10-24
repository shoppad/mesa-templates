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
        '{\n   "name":"Mesa Contact Created",\n   "type":"DRIP_DELAY",\n   "onlyEnrollsManually":false,\n   "actions":[\n      {\n         "type":"WEBHOOK",\n         "method":"POST",\n         "url":"{webhook_url}"\n      }\n   ],\n   "segmentCriteria":[\n      [\n         {\n            "filterFamily":"PropertyValue",\n            "withinTimeMode":"PAST",\n            "operator":"IS_NOT_EMPTY",\n            "property":"hs_object_id",\n            "type":"number"\n         },\n         {\n            "filterFamily":"PropertyValue",\n            "withinTimeMode":"PAST",\n            "operator":"NEQ",\n            "property":"hs_analytics_source_data_1",\n            "value":"API",\n            "type":"string"\n         },\n         {\n            "filterFamily":"PropertyValue",\n            "withinTimeMode":"PAST",\n            "operator":"CONTAINS",\n            "property":"email",\n            "value":"john_230+1@hotmail.com;john+hubspot",\n            "type":"string"\n         }\n      ]\n   ],\n   "reEnrollmentTriggerSets":[\n\n   ],\n   "enabled":true\n}';

      if (action === 'update') {
        webhookPayload =
          '\n{\n    "name": "Mesa Contact Updated",\n    "type": "DRIP_DELAY",\n    "onlyEnrollsManually": false,\n    "actions": [\n        {\n            "type": "WEBHOOK",\n            "method": "POST",\n            "url": "{webhook_url}"\n        }\n    ], \n    "segmentCriteria": [\n        [\n            {\n                "filterFamily": "PropertyValue",\n                "withinTimeMode": "PAST",\n                "operator": "CONTAINS",\n                "property": "email",\n                "value": "john_230@hotmail.com;john+hubspot",\n                "type": "string"\n            },\n            {\n                "filterFamily": "PropertyValue",\n                "withinTimeMode": "PAST",\n                "operator": "IS_NOT_EMPTY",\n                "property": "firstname",\n                "type": "string"\n            },\n            {\n                "compareProperty": "createdate",\n                "filterFamily": "PropertyValue",\n                "withinTimeMode": "PAST",\n                "operator": "GT",\n                "property": "lastmodifieddate",\n                "type": "datetime"\n            }\n        ],\n        [\n            {\n                "filterFamily": "PropertyValue",\n                "withinTimeMode": "PAST",\n                "operator": "CONTAINS",\n                "property": "email",\n                "value": "john_230@hotmail.com;john+hubspot",\n                "type": "string"\n            },\n            {\n                "filterFamily": "PropertyValue",\n                "withinTimeMode": "PAST",\n                "operator": "IS_NOT_EMPTY",\n                "property": "lastname",\n                "type": "string"\n            },\n            {\n                "compareProperty": "createdate",\n                "filterFamily": "PropertyValue",\n                "withinTimeMode": "PAST",\n                "operator": "GT",\n                "property": "lastmodifieddate",\n                "type": "datetime"\n            }\n        ]\n    ],\n    "allowContactToTriggerMultipleTimes": true,\n    "reEnrollmentTriggerSets": [\n        [\n            {\n                "id": "firstname",\n                "type": "CONTACT_PROPERTY_NAME"\n            }\n        ],\n        [\n            {\n                "id": "lastname",\n                "type": "CONTACT_PROPERTY_NAME"\n            }\n        ]\n    ],    \n    "enabled": true\n}';
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
