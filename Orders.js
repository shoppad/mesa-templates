const Mesa = require("./vendor/Mesa1.js");

/**
 * {string} OAuth path to pass
 *
 * @type {String}
 */
const OrdersPath = "";

/**
 * {Object} Options to pass with all requests
 * @type {Object}
 * @property {bool} [include_headers=true] Include the headers
 */
const defaultOptions = {
  include_headers: true
};

/**
 * Class containing methods to interact with the SalesForce Admin API.
 *
 * @property {Oauth} request [request description]
 * @property {string} path [path description]
 * @return {Orders}
 */
class Orders {
  // [request description]
  request;

  // [path description]
  // @todo: get "yourInstance" (na19) from secret?
  path = "https://na19.salesforce.com/services/data/v20.0/sobjects/Order/";

  /**
   * [constructor description]
   * 
   * @param {Oauth} oauthRequest [request description]
   */
  constructor(oauthRequest) {
    this.request = oauthRequest;
  }

  /**
   * Creates or updates a SalesForce order based on Shopify data
   *
   * Because SalesForce requires a contact ID, method will update or create an associated contact
   *
   * @param  {String} [externalFieldName=''] [description]
   * @param  {String} [externalFieldValue=''] [description]
   * @param  {Object} [payload={}]           [description]
   * @return {String} [response['headers'=headers, 'body'=responseBody]] [response containing headers and response body]
   */
  createOrUpdateOrder(
    externalFieldName = "",
    externalFieldValue = "",
    payload = {}
  ) {
    const path = this.path + externalFieldName + "/" + externalFieldValue;

    Mesa.log.info("createOrUpdateOrder, this.options", {
      include_headers: true
    });
    return this.request.patch(path, payload, {
      include_headers: true
    });
  }

  /**
   * Retrieves existing order based on an external ID field (e.g. Shopify ID)
   * @param  {String} [externalFieldName=''] [description]
   * @param  {String} [externalFieldValue=''] [description]
   * @return {String}                        [description]
   */
  getOrder(externalFieldName = "", externalFieldValue = "") {
    const path = this.path + externalFieldName + "/" + externalFieldValue;
    this.request.get(path, this.defaultOptions);
  }
}

module.exports = Orders;
