const Airtable = {

  credentialKey: (context) => {
    for (let output of context.automation.outputs) {
      if (output.type == 'airtable') {
        return output.metadata.token;
      }
    }
    
    return null;
  },

  baseId: (context) => {
    for (let output of context.automation.outputs) {
      if (output.type == 'airtable') {
        return output.metadata.path.base;
      }
    }
    
    return null;
  },

  upsert: (credentialKey, baseId, table, idField, idValue, fields) => {

    let credential = JSON.parse(Mesa.credential.get(credentialKey));
    let accessToken = credential.access_token;

    let options = {
      "headers": {
        "Content-Type": "application\/json",
        "Authorization": "Bearer " + accessToken,
      }
    }

    let filterByFormula = `{${idField}} = '${idValue}'`;
    let url = 'https://api.airtable.com/v0/' + baseId + '/' + table + '?filterByFormula=' + encodeURIComponent(filterByFormula);
    let results = Mesa.request.get(url, options);

    let record = {};
    let data = {};
    if (results.records.length > 0) {
      record = results.records[0];
      data = {
        "fields": fields,
        "typecast": true,
      };
      url = `https://api.airtable.com/v0/${baseId}/${table}/${record.id}`;
      record = Mesa.request.put(url, data, options);
      // Mesa.log.info('airtable upsert update result', record);
    } else {
      data = {
        "records": [
          {
            "fields": fields,
          }
        ],
        "typecast": true,
      }
      let result = Mesa.request.post(url, data, options);
      // Mesa.log.info('airtable upsert create result', result);
      record = result.records[0];
    }

    return record;
  }
}

module.exports = Airtable;