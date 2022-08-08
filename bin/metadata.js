const {
  processAllMesaJson,
  fetchAlgoliaConnector,
  fetchAlgoliaConnectorTriggers,
} = require('./utils');

// Process all the files
let didRun = false;
processAllMesaJson('./', async function (json, {filename, dir, niceDir}) {
  console.log('start', niceDir);

  for (let key of ['inputs']) {
    // Recurse
    for (let input of json.config[key]) {
      // const connector = await fetchAlgoliaConnector(
      //   input.trigger_type,
      //   input.type,
      //   true
      // );

      const isMissing =
        didRun == false &&
        input.type == 'shopify' &&
        (!input.metadata ||
          Array.isArray(input.metadata) ||
          !input.metadata.topic);

      if (isMissing) {
        // console.log(didRun);
        const triggers = await fetchAlgoliaConnectorTriggers(
          input.type,
          input.trigger_type
        );
        console.log('after', niceDir);
        // console.error(`${niceDir} has malformed topic metadata info`);
        console.log({
          // connector,
          triggers,
          input,
        });

        didRun = true;
      } else {
        // console.log(`${dir} we good`, input);
      }
    }
  }
});
