const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');
const Util = require('./Util.js');

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

    let limit = vars.transform.limit;
    let minUpdatedAt = Util.getMesaStorage('min_updated_at');
    let initialMinUpdatedAt = minUpdatedAt;
    let query = encodeURIComponent('balance:>0');

    let url = `/admin/gift_cards/search.json?query=${query}&order=updated_at ASC&limit=${limit}`;
    if (minUpdatedAt) {
      url += `&updated_at_min=${minUpdatedAt}`;
    } else {
      // url += '&updated_at_max=20'
    }
    url += '&created_at_max=2099-01-01';

    let response = Shopify.get(url);
    let giftCards = response.gift_cards; 

    if (giftCards.length) {
      let lastGiftCard = giftCards[giftCards.length - 1];
      minUpdatedAt = lastGiftCard.updated_at;
    } else {
      // minUpdatedAt stays the same 
    }

    Util.stepLabel(`Initial min updated at: ${initialMinUpdatedAt}, New: ${minUpdatedAt}, Rows: ${giftCards.length}`);
    Mesa.storage.set('min_updated_at', minUpdatedAt);

    Mesa.output.next(giftCards);
  }
}
