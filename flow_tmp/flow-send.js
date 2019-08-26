const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {
  /**
   * Graph ql body
   */
  flowTriggerQuery = `
    mutation flowTriggerReceive($body: String!) {
      flowTriggerReceive(body: $body) {
        userErrors {
          field
          message
        }
      }
    }`;

  /**
   * Build graph ql body
   * 
   * @param {string} *.name
   * @param {string} *.url
   * @param {string} *.automation_key
   * @param {string} *.output_key
   * @param {string} *.string_one
   * @param {string} *.string_two
   * @param {string} *.string_three
   * @param {number} *.number_one
   * @param {boolean} *.boolean_one
   */
  flowTriggerBody({ 
    name='Flow test', 
    url='https://dev-mesa.myshopify.com', 
    automation_key = 'flow-test',
    output_key = 'flow-outgoing', 
    string_one = '', 
    string_two = '', 
    string_three = '', 
    number_one = 1, 
    boolean_one = false,
  }) {
    return `{
      "trigger_title": "[dev] Harmonia Output One",
      "resources": [
        {
          "name": "${name}",
          "url": "${url}"
        }
      ],
      "properties": {
        "Harmonia Automation Key": "${automation_key}",
        "Harmonia Output Key": "${output_key}",
        "Harmonia String One": "${string_one}",
        "Harmonia String Two": "${string_two}",
        "Harmonia String Three": "${string_three}",
        "Harmonia Number One": ${number_one},
        "Harmonia Boolean One": ${boolean_one}
      }
    }`;
  }

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    

    Mesa.log.info('payload', {payload});
    Mesa.log.info('context', {context});

    const url = 'admin/api/2019-07/graphql.json';
    const body = this.flowTriggerBody({
      automation_key: context.automation.key,
      output_key: 'in-flow-outgoing',
      string_one: 'Helllooooooo',
    });

    Mesa.log.info('query', { 
      query: this.flowTriggerQuery, 
      variables: {
        body: body,
      } 
    });

    Shopify.post(url, { 
      query: this.flowTriggerQuery, 
      variables: {
        body: body,
      }
    }, { skipJsonWrap: true });
  }
}
