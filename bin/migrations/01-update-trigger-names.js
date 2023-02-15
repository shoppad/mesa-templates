import algoliasearch from "algoliasearch";
import fs from 'fs';


export default (res, json) => {
    // ---
    // @todo: In this future this should be split out into its own file in migrations/
    ['inputs', 'outputs'].forEach(async key => {
        
        if (!json.config[key]) {
            return;
        }

        json.config[key].forEach(async (trigger, i) => {
            const connector = await fetchAlgoliaConnector(key, trigger.type);
            
            const connectorName = connector.title || '';
            // const replacements = {
            //   'Loop by MESA': 'Loop',
            //   'Email by MESA': 'Send',
            //   'Slack': 'Send',
            // }
            // const replacementValue = replacements[connectorName] ? replacements[connectorName]+' ' : '';
            const replacementValue = '';
            const regex = '^'+ connectorName +'(\:)?( )?';
            const oldName = trigger.name;
            json.config[key][i].name = trigger.name ? trigger.name.replace(new RegExp(regex), '') : replacementValue;
            console.log(`OLD: ${oldName}, NEW: ${trigger.name}`);
            fs.writeFileSync(res, JSON.stringify(json, null, '    '));
            console.log(`SAVING: ${res}`);
        });
    });
    // ---
}

let connectors = {};

async function fetchAlgoliaConnector(conntectorType, connectorKey) {

    if (connectors[connectorKey]) {
      return connectors[connectorKey];
    }
  
    const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
    const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
    const index = client.initIndex('connectors');
  
  
    try {
      const results = await index.search('', {
        filters: `objectID:${connectorKey}`
      });
      connectors[connectorKey] = results.hits && results.hits[0] ? results.hits[0] : {};
      return connectors[connectorKey];
    } catch (e) {
      console.error(e);
    }
  }

