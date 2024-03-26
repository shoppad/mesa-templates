const Mesa = require('vendor/Mesa.js');
const Util = require('./Util.js')

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

    let tags = vars.shopify.tags.split(',').map(element => element.trim());
    let exemptionTags = [];

    for (let tag of tags) {
      if (tag.includes('EXEMPTION')) {
        exemptionTags.push({
          "tag": tag
        })
      }
    }

    Util.stepLabel("Tags: " + JSON.stringify(exemptionTags));

    Mesa.output.next(exemptionTags);
  }
}
