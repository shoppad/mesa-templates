const Mesa = require("vendor/Mesa.js");
const Shopify = require("vendor/Shopify.js");
const Cloudinary = require("vendor/Cloudinary.js");

/**
 * A Mesa Script exports a class with a script() method.
 */
module.exports = new (class {
  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    // Intiliazing Cloudinary
    let cloudinary = new Cloudinary(
      Mesa.storage.get("cloudinary-cloudname"),
      Mesa.secret.get("cloudinary-api-key"),
      Mesa.secret.get("cloudinary-api-secret")
    );

    // Get the most updated tags.
    const productTags = Shopify.get(`/admin/products/${payload.id}.json`)
      .product.tags;

    // Getting all products tags
    let tagsArray = productTags ? productTags.split(",") : [];

    // Getting the most predominant colors.
    const response = cloudinary.upload(payload.images[0].src, {
      colors: true
    });

    // Get any colors
    let colorArray = [];
    for (let i = 0; i < response.predominant.cloudinary.length; i++) {
      let color = response.predominant.cloudinary[i][0];
      // Adding a new color
      colorArray.push(color);
      // Removing any duplicates colors
      tagsArray.filter(tag => !tag.includes(color));
    }

    // Building tags strings
    const tags = tagsArray.concat(colorArray).join(",");

    // Bulding Shopify Payload.
    const data = {
      product: {
        tags: tags
      }
    };
    // Updating product tags.
    Mesa.output.done(data, { product_id: payload.id });
  };
})();
