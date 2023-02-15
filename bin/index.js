#!/usr/bin/env node
import program from 'commander';
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
// const axios from 'axios');
import sh from 'shelljs';
import { resolve } from 'path';
import { Console } from 'console';
import { exit } from 'process';


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


if (!file) {
  console.log('You must specify a file within ./migrations to run. Ex: 01-update-trigger-names.js');
  exit;
}

// template = '';//'add_email_to_klaviyo_list';

getFiles(dir);





console.log()
console.log(dir);


switch (cmd) {
  case 'migration':
    
}

async function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map(async (dirent) => {
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

          const migration = await import(`./migrations/${file}`);
          migration.default(res, json);
          
        }
        else {
          console.log(`SKIPPED: ${res}`);
        }
      }
      
    }
  }));
}
