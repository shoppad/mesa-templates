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
    const vars = context.steps;

    // Add your custom code here
    // Line items from a Shopify Order Created trigger would be available as something like `vars.shopify.line_items`

    Mesa.log.info("vars", vars);

    let url = "https://www.googleapis.com/drive/v3/files";
    let data = {
        "name": vars.transform.Name,
        "url": vars.transform.Image,
        "mimeType": "image/png",
        "parents": [
            vars.transform.Folder,
        ]
    };

    let credential = JSON.parse(Mesa.credential.get('googledrive'));
    let token = credential.access_token;
    let options = {
        "include_headers": true,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    };
    let response = Mesa.request.post(url, data, options);
    Mesa.log.info("resposne", response);

    if (!response.body.id) {
        throw error("Problem with google drive api call");
    }

    // We're done, call the next step!
    Mesa.output.next(response.body);
  }
}
