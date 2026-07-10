const Mesa = require('vendor/Mesa.js');

module.exports = new (class {
  script = (prevResponse, context) => {
    const steps = context.steps || {};
    const aiStep = steps.ai || {};
    const shopify = steps.shopify || {};

    // 1) Get AI result (object or JSON string)
    let ai = aiStep.response;

    if (typeof ai === "string") {
      try {
        ai = JSON.parse(ai);
      } catch (e) {
        ai = null;
      }
    }

    const qualifies = Boolean(ai && ai.qualifies === true);
    const tag = (ai && typeof ai.tag === "string") ? ai.tag : "";
    const summary = (ai && typeof ai.summary === "string") ? ai.summary : "";

    // 2) Compute already_tagged from Shopify customer tags
    // Shopify customer.tags is typically a comma-separated string: "B2B, VIP, vip-repeat"
    const rawTags = (shopify.customer && shopify.customer.tags) ? String(shopify.customer.tags) : "";
    const tagsLower = rawTags.toLowerCase();

    const already_tagged =
      tagsLower.includes("vip-repeat") || tagsLower.includes("vip-spend");

    // 3) Output tokens for downstream steps
    Mesa.output.nextOutput({
      qualifies,
      tag,
      summary,
      already_tagged
    });
  };
})();