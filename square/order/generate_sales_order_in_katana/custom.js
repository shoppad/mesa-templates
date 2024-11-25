const Mesa = require('vendor/Mesa.js');
const Oauth = require('vendor/Oauth.js');

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new class {

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    const vars = context.steps;
    
    // Will be use to store product variants list from Katana
    let skusListKatana = [];
    
    // Get Square product skus list
    const skusListSquare = vars.loop_1.items;
    Mesa.log.info("Square skus list", skusListSquare);

    // Create URL for GET request
    const baseUrl = "https://api.katanamrp.com/v1/variants";
    const skusParameter = skusListSquare.map(sku => `sku=${sku}`).join('&');
    Mesa.log.info("Katana skus parameter", skusParameter);

    // Send GET request via OAuth
    const oauth = new Oauth('refresh_token', 'katana');
    const response = oauth.get(`${baseUrl}?${skusParameter}`);

    if (response && response.data) {
      // Set skusListKatana to product variants list from Katana
      skusListKatana = response.data;

      // We're done, call the next step!
      Mesa.output.next({skus_list_katana: skusListKatana});
    } else {
      throw new Error("No product variants in Katana found."); 
    }
  }
}
