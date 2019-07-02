const Mesa = require('./vendor/Mesa1.js');
const _ = require('./lodash.js');

/**
 * The mapping utility can be used to define a relationship between entities from different sources.
 * After defining the relationship, utility methods can be used to do things such as convert data from one
 * entity to another with a single function call.
 * @type {Object}
 */
const Mapping = new class {

  /**
   * Converts data from one entity into another entity's format
   * 
   * @memberof Mapping
   * @param {Object} Map The object defining the relationship betweeen two entities @todo: docs for creating a Map
   * @param {Object} payload The data from the input entity
   * @param {String} input The key for the input's value (the path to the value in payload)
   * @param {String} ouput The path at which to set the retreived value
   * @param {Object} processors Optional, an object containing method names to be called, modifies payload
   * @example
   * // Map.js
   * // First, we define a relationship between Shopify's
   * // customer object and SalesForce's contact entity.
   * module.exports = {
   *   email: {
   *     shopify: 'email',
   *     salesforce: 'Email'
   *   },
   *   address1: {
   *     shopify: 'default_address.address1',
   *     salesforce: 'MailingStreet'
   *   },
   * };
   * 
   * @example
   * // Now that we have this relationship defined, we can use it to convert data both ways.
   * // Say for instance, we are receiving a webhook from Shopify that contains
   * // an updated customer record, and we want to put this new customer data into Salesforce.
   * // Using the mapping utility, we can convert the updated customer record from Shopify
   * // to match the format of Salesforce's contact entity. 
   *
   * const Mapping = require('./vendor/Mapping.js');
   * const Map = require('./Map.js');
   *
   * // Updated customer record coming in from Shopify
   * const shopifyCustomer = payload;
   * // {
   * //   email: 'hello@gmail.com',
   * //   default_address: {
   * //     address1: '123 Main Street',
   * //   },
   * // }
   * 
   * // Define processors
   * // These are functions that get called during convert()
   * wrapCustomerOutput = (payload) => {
   *   return { customer: payload };
   * }
   * 
   * // @todo: better docs on this, should this be in a seperate example?
   * const processors = {
   *   preProcess: [], // Called before data is converted to another entity. Params passed to the function: payload
   *   process: [], // Called for each field. Params passed to the function: payload, key, input, output, inputValue
   *   postProcess: [ wrapCustomerOutput ], // Called after data is converted to another entity. Params passed to the function: payload.
   * };
   *
   * // Call convert method to take data from the shopifyCustomer, and turn it into a salesforceContact
   * const salesforceContact = Mapping.convert(relationship, shopifyCustomer, 'salesforce', 'shopify', processors);
   *
   * // The result would be as follows:
   * // {
   * //   customer: {
   * //     Email: 'hello@gmail.com',
   * //     MailingStreet: '123 Main Street',
   * //   }
   * // }
   *
   * @return {Object}
   */
  convert(Map, payload, input, output, processors) {
    let response = {};

    // Call preprocessing
    if (processors && processors.preProcess && processors.preProcess.length) {
      processors.preProcess.forEach((processor) => {
        if (typeof processor === 'function') {
          payload = processor(payload);
        };
      });
    };

    // Get value from input, set value as output
    for (const key in Map) {
      const map = Map[key];

      // Get value from input
      let inputValue = _.get(payload, map[input], '');

      // Call processing on input value
      if (processors && processors.process && processors.process.length) {
        processors.process.forEach((processor) => {
          if (typeof processor === 'function') {
            inputValue = processor(payload, key, input, output, inputValue);
          };
        });
      };

      _.set(response, map[output], inputValue);
    }

    // Call postprocessing
    if (processors && processors.postProcess && processors.postProcess.length) {
      processors.postProcess.forEach((processor) => {
        if (typeof processor === 'function') {
          response = processor(response);
        };
      });
    };

    return response;
  }
}

module.exports = Mapping;
