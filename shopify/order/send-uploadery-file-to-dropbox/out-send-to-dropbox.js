const Mesa = require('vendor/Mesa.js');
const Dropbox = require('vendor/Dropbox.js');

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

    const dropbox = new Dropbox();
    const key = Mesa.storage.get('field-key', 'uploadery_1');

    payload.line_items.forEach(function(lineItem, index){ 

      const urls = lineItem.properties.filter(item => key.indexOf(item.name) !== false);

      urls.forEach(function(property){

        const filename = property.value.substring(property.value.lastIndexOf('/') + 1);
        const response = dropbox.request.post('https://api.dropboxapi.com/2/files/save_url', {
          path: `/${payload.name.replace('#', '')}-${filename}`,
          url: property.value,
        });

        Mesa.log.info(`Copying ${property.value} to Dropbox`, response);
      });
    })
  }
}
