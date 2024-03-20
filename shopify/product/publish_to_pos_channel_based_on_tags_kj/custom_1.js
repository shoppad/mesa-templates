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

    let publicationId = this.getPublicationId(vars);
    Mesa.trigger.setTaskExternalData({
      "label": "Publication ID: " + publicationId
    });

    Mesa.output.next({"publicationId": publicationId});
  }

  getPublicationId = (vars) => {
    for (let publication of vars.custom.publications) {
      Mesa.log.info("publication", publication);
      if (publication.name == "Point of Sale") {
        return publication.id;
      }
    }

    throw new Error("No 'Point of Sale' publication found");
  }
}
