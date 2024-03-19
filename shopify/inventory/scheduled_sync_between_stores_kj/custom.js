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

    let [levels, pageInfo] = ShopifyUtil.inventoryLevelsUpdatedSince(updatedAt, max);
    Util.stepLabel("Items found: " + levels.length + ", run time: " + runTime);
    Mesa.storage.set('page_cursor', pageInfo.endCursor);

    Mesa.output.next({
      "levels": levels,
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

DELETE
FROM inventory_levels
WHERE id > '2024-03-18T13:52'

*/