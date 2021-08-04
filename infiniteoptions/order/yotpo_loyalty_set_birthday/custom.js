const Mesa = require("vendor/Mesa.js");

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    let dateString = payload.fields.find((field) => {
      return field.name === "Birthday";
    });

    if (
      dateString &&
      dateString.value !== "" &&
      dateString.value.includes("/")
    ) {
      let dateObject = dateString.value.split("/");

      payload.birthday_payload = {
        day: dateObject[1],
        month: dateObject[0],
        year: dateObject[2],
      };

      // We're done, call the next step!
      Mesa.output.next(payload);
    }
  };
})();
