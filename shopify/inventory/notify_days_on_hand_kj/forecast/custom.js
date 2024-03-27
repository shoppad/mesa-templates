const Mesa = require('vendor/Mesa.js');

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

    // Add your custom code here
    // Line items from a Shopify Order Created trigger would be available as something like `vars.shopify.line_items`
    let variantId = payload.variant_id;

    let slopeQuery = `
      SELECT REGR_SLOPE(total, month) FROM
      (
        SELECT (EXTRACT(YEAR FROM order_date) - 2023) * 12 + EXTRACT(MONTH FROM order_date) AS month, COUNT(*) AS total
        FROM order_line_items
        WHERE variant_id = '${variantId}'
        AND order_date < date_trunc('MONTH', CURRENT_DATE)
        GROUP BY month ORDER BY month
        )
      AS summary
    `;
    
    let result = Mesa.database.query(slopeQuery);
    Mesa.log.info("result", result);

    let slope = parseFloat(result[0].regr_slope);

    let available = parseInt(payload.available);

    Mesa.log.info("slope", slope);
    Mesa.log.info("available", available);

    payload.monthsOnHand = available / (216 + slope);

    Mesa.trigger.setTaskExternalData({
      label: "SKU: " + payload.sku + ", Slope: " + slope + ", Months on hand: " + payload.monthsOnHand
    });

    // We're done, call the next step!
    Mesa.output.next(payload);
  }
}
