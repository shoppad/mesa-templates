#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const path = require('path');
const algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");
// const axios = require('axios');
const sh = require('shelljs');
const { resolve } = require('path');
const { Console } = require('console');
const { readdir } = require('fs').promises;

let connectors = {};

// let apiUrl = 'https://api.getmesa.com/v1/admin';

// Get the current dir
const dir = sh.pwd().stdout;
dotenv.config();


// Get arguments and options
function list(val) {
  return val.split(',');
}
program
  .version('2.0.6')
  .usage('[options] <file>')
  .option('-e, --env [value]', 'Environment to use (filename in `./config/`)')
  .option('-a, --automation [value]', 'Automation key')
  .option('-f, --force', 'Force')
  .option('-v, --verbose', 'Verbose')
  .option('-n, --number [value]', 'Number')
  .option('-p, --payload [value]', 'Payload')
  .parse(process.argv);

let [cmd, template, file] = program.args;

console.log(program.args);


// template = '';//'add_email_to_klaviyo_list';

getFiles(dir);





console.log()
console.log(dir);

switch (cmd) {
  case 'migration':
    
}

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    const filename = path.basename(res);
    if (dirent.isDirectory() && !['node_modules'].includes(filename)) {
      getFiles(res);
    }
    else {
      if (filename === 'mesa.json') {
        let json;

        try {
          const raw = fs.readFileSync(res);
          json = JSON.parse(raw);
        }
        catch(e) {
          // json = false;
        }

        if (json && (!template || template === 'all' || template === json.key)) {

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
                fs.writeFileSync(res, JSON.stringify(json, null, '  '));
                console.log(`SAVING: ${res}`);
            });
          });
          // ---


          
        }
        else {
          console.log(`SKIPPED: ${res}`);
        }
      }
      
    }
  }));
}



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