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

    const key = Mesa.storage.get('lineitem-property-key', 'uploadery_1');

    payload.line_items.forEach(function(lineItem, index){ 

      const urls = lineItem.properties.filter(item => key.indexOf(item.name) !== false);
      Mesa.log.debug('Matching urls', urls);

      urls.forEach(function(property){

        Mesa.output.send('out-send-to-cloudinary', {
          order: payload,
          line_item: lineItem,
          key: property.key,
          url: property.value,
        });

      });
    });
    
  }
}
