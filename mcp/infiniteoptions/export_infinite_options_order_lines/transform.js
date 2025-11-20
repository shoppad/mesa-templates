const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

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
    const output = [];
    const ioProps =
      context.steps.skill.infiniteoptions_field &&
      context.steps.skill.infiniteoptions_field !==
        'all_infinite_options_options'
        ? [context.steps.skill.infiniteoptions_field]
        : [];

    if (!context.steps.infiniteoptions) {
      Mesa.log.warn('No infiniteoptions data found');
      return Mesa.output.next({ data_export: [] });
    }

    if (!ioProps.length) {
      //  We're in "all props" mode, build our fields
      context.steps.infiniteoptions.forEach((order) => {
        order.fields.forEach(({ name }) => {
          if (!ioProps.find((prop) => prop == name)) {
            ioProps.push(name);
          }
        });
      });
    }

    // Process our hits
    context.steps.infiniteoptions.forEach((order) => {
      order.line_items.forEach((line) => {
        // Construct a local context where this order and this line are the only present ones
        const localContext = {
          ...context,
          steps: {
            ...context.steps,
            infiniteoptions: [
              {
                ...order,
                line_items: [line],
              },
            ],
          },
        };
        const lineValues = Transform.convert(localContext, payload);

        // Drop the keys prefaced with '_' (notes)
        Object.keys(lineValues).forEach((key) => {
          if (key.match(/^_/)) {
            delete lineValues[key];
          }
        });

        // Build a map of property values
        const propValues = line.properties.reduce(
          (propValues, { name, value }) => {
            propValues[name] = value;
            return propValues;
          },
          {}
        );

        // Add our IO props so we preserve any order
        ioProps.forEach((prop) => {
          lineValues[prop] = propValues[prop] || '';
        });

        output.push(lineValues);
      });
    });

    // We're done, call the next step!
    Mesa.output.next({ data_export: output });
  };
})();
