const Mesa = require('vendor/Mesa.js');
const Transform = require('vendor/Transform.js');

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

    // Adjust `payload` here to alter data before we transform it.

    // Get Odoo product
    const odooProduct = context.steps['odoo'];
    // Get Etsy listings
    const etsyDraftListings = context.steps['etsy'];
    // Storing the matching Etsy listing ID
    let etsyListingId;

    // Check if we have a matching SKU between Odoo product and Etsy listing
    // If match, assign to Etsy listing ID to etsyListingId
    // Otherwise, leave as empty
    etsyDraftListings.results.forEach(listing => {
      if (listing.skus && listing.skus[0] === odooProduct.default_code) {
        etsyListingId = listing.listing_id;
        Mesa.log.info("Has matching Etsy listing ID");
        Mesa.log.info("Etsy listing id", etsyListingId);
      }
    });

    // Alter the payload data based on our transform rules
    const output = Transform.convert(context, payload);

    // Adjust `output` here to alter data after we transform it.
    output.etsy_listing_id = etsyListingId;

    // We're done, call the next step!
    Mesa.output.next(output);
  }
}
