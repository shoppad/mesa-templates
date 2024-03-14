const Util = {
  lineItemProperties: (lineItem) => {
    let properties = lineItem.properties.reduce((accumulator, object) => {
      accumulator[object.name] = object.value;
      return accumulator;
    }, {});
  
    // test
    return properties; 
  },

  stepLabel: (string) => { 
    Mesa.trigger.setTaskExternalData({
      "label": string
    })

  },

}

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = Util;