import fs from 'fs';

export default (res, json) => {
  // ---
  // @todo: In this future this should be split out into its own file in migrations/
  ['inputs', 'outputs'].forEach(async (key) => {
    if (!json.config[key]) {
      return;
    }

    json.config[key].forEach(async (trigger, i) => {
      let update = false;

      if (trigger.type === 'ask') {
        if (trigger.operation_id === 'post-ask') {
          trigger.type = 'ai';
          trigger.entity = 'agent';
          trigger.action = 'create';
          trigger.operation_id = 'post-agent';
          trigger.metadata.api_endpoint = 'post /agent';
          trigger.version = 'v3';
        }
        if (trigger.operation_id === 'post-ask-skill') {
          trigger.type = 'ai';
          trigger.entity = 'agent';
          trigger.action = 'skill';
          trigger.operation_id = 'post-agent-skill';
          trigger.metadata.api_endpoint = 'post /agent/skill';
          trigger.version = 'v3';
        }
        update = true;
      }

      if (trigger.type === 'skill') {
        trigger.type = 'ai';
        trigger.entity = 'skill';
        trigger.action = 'skill';
        trigger.operation_id = 'post-skill';
        trigger.metadata.api_endpoint = 'post /skill';
        trigger.version = 'v3';
        update = true;
      }

      if (update) {
        fs.writeFileSync(res, JSON.stringify(json, null, '    '));
        console.log(`SAVING: ${res}`);
      }
    });
  });
  // ---
};

let connectors = {};
