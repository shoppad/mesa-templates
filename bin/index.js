#!/usr/bin/env node
const program = require('commander');
const dotenv = require('dotenv');
// const axios = require('axios');
const sh = require('shelljs');
const {Console} = require('console');
const {processAllMesaJson, fetchAlgoliaConnector} = require('./utils');

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
console.log(dir);

switch (cmd) {
  case 'migration':
}

// template = '';//'add_email_to_klaviyo_list';

// Process all the files
processAllMesaJson(dir, function (json, {filename}) {
  if (!template || template === 'all' || template === json.key) {
    // ---
    // @todo: In this future this should be split out into its own file in migrations/
    ['inputs', 'outputs'].forEach(async (key) => {
      if (!json.config[key]) {
        return;
      }

      json.config[key].forEach(async (trigger, i) => {
        const connector = await fetchAlgoliaConnector(
          trigger.type,
          trigger.trigger_type
        );

        const connectorName = connector.title || '';
        // const replacements = {
        //   'Loop by MESA': 'Loop',
        //   'Email by MESA': 'Send',
        //   'Slack': 'Send',
        // }
        // const replacementValue = replacements[connectorName] ? replacements[connectorName]+' ' : '';
        const replacementValue = '';
        const regex = '^' + connectorName + '(:)?( )?';
        const oldName = trigger.name;
        json.config[key][i].name = trigger.name
          ? trigger.name.replace(new RegExp(regex), '')
          : replacementValue;
        console.log(`OLD: ${oldName}, NEW: ${trigger.name}`);
        fs.writeFileSync(res, JSON.stringify(json, null, '    '));
        console.log(`SAVING: ${res}`);
      });
    });
  } else {
    console.log(`SKIPPED: ${res}`);
  }
});
