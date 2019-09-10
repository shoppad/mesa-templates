const Mesa = require('vendor/Mesa.js');
const Cloudinary = require('vendor/Cloudinary.js');

Mesa.log.info('Cloudinary', Cloudinary);

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

    let cloudinary = new Cloudinary(Mesa.storage.get('cloudinary-cloudname'), Mesa.secret.get('cloudinary-api-key'), Mesa.secret.get('cloudinary-api-secret'));

    const response = cloudinary.upload(payload.url, {
      eager: Mesa.storage.get('cloudinary-transformation'),
    });

    payload.cloudinary_url = response.eager[0].secure_url;

    Mesa.output.send('out-update-shopify-order-notes', payload);
  }
}
