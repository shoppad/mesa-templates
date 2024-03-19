const Mesa = require('vendor/Mesa.js');
const ShopifyUtil = require('./ShopifyUtil.js');
const Util = require('./Util.js');

/**
 * Get inventory levels since a specified updatedAt time
 */
module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    let max = context.trigger.metadata.max;
    let updatedAt = '2024-02-16T22:42:18Z';
    let runTime = this.getRunTime();

    let cursor = Mesa.storage.get('page_cursor') ? Mesa.storage.get('page_cursor') : null;

    let [levels, pageInfo] = ShopifyUtil.inventoryLevelsUpdatedSince(updatedAt, max, cursor);
    Mesa.storage.set('page_cursor', pageInfo.endCursor);

    let firstSku = levels.length > 0 ? levels[0].sku : '(none)';
    Util.stepLabel(`
      Items found: ${levels.length}, first sku: ${firstSku}, 
      previous cursor: ${cursor ? cursor.slice(-8) : '(none)'}, 
      new cursor: ${pageInfo.endCursor ? pageInfo.endCursor.slice(-8) : '(none)'}, 
      has next page: ${pageInfo.hasNextPage}
    `);

    Mesa.output.next({
      "levels": levels,
      "pageInfo": pageInfo,
      "run_time": runTime,
    });
  } 

  getRunTime = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = ('0' + (now.getMonth() + 1)).slice(-2); // getMonth() is zero-based
    let day = ('0' + now.getDate()).slice(-2);
    let hour = ('0' + now.getHours()).slice(-2);
    let minute = ('0' + now.getMinutes()).slice(-2);
  
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }  
}

/**
 * 

Helpful queries when testin

DELETE
FROM "inventory_levels" 

SELECT mesa_id, run_time, sku, location_name, available, delta, status
FROM "inventory_levels" 
ORDER BY mesa_id ASC

DELETE
FROM inventory_levels
WHERE id > '2024-03-18T13:52'

*/