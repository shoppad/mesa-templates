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
    let response = Shopify.get(`/admin/gift_cards/search.json?limit=${limit}&order=updated_at ASC&updated_at_max=${minUpdatedAt}`);
    let giftCards = response.gift_cards;

    if (giftCards.length) {
      let lastGiftCard = giftCards[giftCards.length - 1];
      minUpdatedAt = lastGiftCard.updated_at;
    } else {
      // minUpdatedAt stays the same 
    }

    Mesa.storage.set('min_updated_at', minUpdatedAt);

    Mesa.output.next(giftCards);
  }
}
