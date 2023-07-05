const Mesa = require('vendor/Mesa.js');

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

    // Add your custom code here
    let options = {
        "headers": {
            "Content-Type": "application\/json",
            "Authorization": "Bearer " + Mesa.credential.get('airtable'),
        }
    }

    let baseId = payload.base.id;
    let webhookId = payload.webhook.id;
    let url = 'https://api.airtable.com/v0/bases/' + baseId + '/webhooks/' + webhookId + '/payloads';

    let results = Mesa.request.get(url, options);    
    Mesa.log.info("results", results);    
    if (results.body.error) {
        throw new Error("Airtable error: " + results.body.error)
    }

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
