const fs = require('fs');
const path = require('path');
const {resolve} = require('path');
const {readdir} = require('fs').promises;
const algoliasearch = require('algoliasearch');

/**
 * Loop through Mesa.json files
 *
 * @param {*} dir
 * @param {*} processFileCallback
 */
async function processAllMesaJson(dir, processFileCallback) {
  const dirents = await readdir(dir, {withFileTypes: true});
  for (let dirent of dirents) {
    const res = resolve(dir, dirent.name);
    const filename = path.basename(res);
    if (dirent.isDirectory() && !['node_modules'].includes(filename)) {
      await processAllMesaJson(res, processFileCallback);
    } else {
      if (filename === 'mesa.json') {
        let json;

        try {
          const raw = fs.readFileSync(res);
          json = JSON.parse(raw);
        } catch (e) {
          // json = false;
        }

        if (json) {
          await processFileCallback(json, {
            filename,
            dir,
            niceDir: dir.replace(/.+mesa-templates\/(.+)/, '$1'),
          });
        } else {
          // console.log(`Empty json ${dir}/${filename}`);
        }
      }
    }
  }
}

// Simple cache
let cachedAlgoliaClient;

function getAlgoliaClient() {
  if (!cachedAlgoliaClient) {
    const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || 'N2SIAXUYNM';
    const ALGOLIA_API_KEY =
      process.env.ALGOLIA_API_KEY || 'e4a1e9fe4ae1efd9af5dfe052833a255';
    cachedAlgoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  }

  return cachedAlgoliaClient;
}

// Simple cache to not repeat request
const connectorsCache = {};

/**
 * Fetch connector data from algolia
 *
 * @param {string} connectorKey
 * @param {string} triggerType 'input' || 'output' || ''
 * @param {boolean} attachTriggersActions should we query for triggers and actions as well
 * @returns
 */
async function fetchAlgoliaConnector(
  connectorKey,
  triggerType,
  attachTriggersActions = false
) {
  if (connectorsCache[connectorKey]) {
    return connectorsCache[connectorKey];
  }
  const index = await getAlgoliaClient().initIndex('connectors');

  try {
    const results = await index.search('', {
      filters: `objectID:${connectorKey}`,
    });
    connectorsCache[connectorKey] =
      results.hits && results.hits[0] ? results.hits[0] : {};
    return connectorsCache[connectorKey];
  } catch (e) {
    console.error(e);
  }
}

// Simple cache to not repeat request
const triggersCache = {};

/**
 * Fetch connector data from algolia
 *
 * @param {string} connectorKey
 * @param {string} triggerType 'input' || 'output' || ''
 * @param {boolean} attachTriggersActions should we query for triggers and actions as well
 * @returns {Map}
 */
async function fetchAlgoliaConnectorTriggers(connectorKey, triggerType) {
  function returnCached() {
    if (triggerType) {
      return triggersCache[connectorKey].filter(
        (trigger) => trigger.trigger_type == triggerType
      );
    }

    return triggersCache[connectorKey];
  }

  if (triggersCache[connectorKey]) {
    return returnCached();
  }

  const index = getAlgoliaClient().initIndex('triggers');
  let hits = [];

  try {
    let page = 0;
    while (page >= 0) {
      const results = await index.search('', {
        filters: `connector:${connectorKey}`,
        page,
      });

      if (results.hits && results.hits.length) {
        hits = hits.concat(results.hits);

        if (results.nbPages <= page) {
          // console.log('esults.nbPages', results.nbPages);
          page = -1;
        } else {
          page++;
        }
      } else {
        // console.log('esults.nbPages', results.nbPages);
        page = -1;
      }
    }

    triggersCache[connectorKey] = hits;

    // console.log(triggersCache[connectorKey]);

    return returnCached();
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  processAllMesaJson,
  fetchAlgoliaConnector,
  fetchAlgoliaConnectorTriggers,
};
