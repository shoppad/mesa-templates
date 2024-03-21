const Util = {

  /**
   * Return the line item properties array as an object that's easier to reference
   * 
   * @param {*} lineItem 
   * @returns 
   */
  lineItemPropertiesAsObject: (lineItem) => {
    let properties = lineItem.properties.reduce((accumulator, object) => {
      accumulator[object.name] = object.value;
      return accumulator;
    }, {}); 
  
    return properties; 
  },

  /**
   * Convenience function to not have to type that whole thing out every time
   * @param {*} string 
   */
  stepLabel: (string) => {
    Mesa.trigger.setTaskExternalData({
      "label": string
    })
  },

  getMesaStorage(key, defaultValue) {
    let value = null;
    try {
      value = Mesa.storage.get(key, defaultValue) ? Mesa.storage.get(key, defaultValue) : null;
    } catch (e) {
      // Will return null
    }

    return value;
  }

}

module.exports = Util;