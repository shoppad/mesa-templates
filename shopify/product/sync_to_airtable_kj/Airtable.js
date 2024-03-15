const Airtable = {

  baseId: (context) => {
    for (let output of context.automation.outputs) {
      if (output.type == 'airtable') {
        return output.metadata.path.base;
      }
    }
    
    return null;
  },

  upsert: (baseId, table, idField, idValue, fields) => {

    Mesa.log.info("in upsert");
    let options = {
      "headers": {
        "Content-Type": "application\/json",
        "Authorization": "Bearer " + Mesa.credential.get('airtable'),
      }
    }

    let filterByFormula = `{${idField}} = '${idValue}'`;
    let url = 'https://api.airtable.com/v0/' + baseId + '/' + table + '?filterByFormula=' + encodeURIComponent(filterByFormula);

    let results = Mesa.request.get(url, options);    
    // Mesa.log.info("airtable upsert get results", results);

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