const Mesa = require("./vendor/Mesa.js");
const Oauth = require("./Oauth.js");
const Orders = require("./Orders.js");

/**
 * Class containing methods to interact with the Salesforce Admin API.
 * 
 * @property {string} oauthPath OAuth path to pass.
 * @property {Oauth} request [request description].
 * @property {Contacts} contacts [contacts description].
 * @property {Orders} orders [orders description].
 * @return {Salesforce}
 */
class Salesforce {
  // OAuth path to pass
  oauthPath = "https://login.salesforce.com/services/oauth2/token";

  // [request description]
  request;

  // [orders description]
  orders;

  /**
   * Construct an Oath connection
   * 
   * @param  {String} [grantType=''] [description]
   * @param  {Object} [options={}]   [description]
   * @return {String}                [description]
   */
  constructor(grantType = "", options = {}) {
    this.request = new Oauth(this.oauthPath, grantType, options);
    this.orders = new Orders(this.request);
  }

  /**
   * Make a GET req uest to Salesforce.
   *
   * @param {string} path
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   * @param {bool} [options.include_headers] Include headers in the requests response, defaults to false.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  get = (path = "", options = {}) => {
    return this.request.get(path, this.request.mergeHeader(options));
  };

  /**
   * Make a POST request to Salesforce.
   *
   * @param {string} path
   * @param {object} data
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   * @param {bool} [options.include_headers] Include headers in the requests response, defaults to false.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  post = (path = "", data, options = {}) => {
    return this.request.post(path, data, this.request.mergeHeader(options));
  };

  /**
   * Make a PUT request to Salesforce.
   *
   * @param {string} path
   * @param {object} data
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   * @param {bool} [options.include_headers] Include headers in the requests response, defaults to false.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  put = (path = "", data = {}, options = {}) => {
    return this.request.put(path, data, this.request.mergeHeader(options));
  };

  /**
   * Make a PATCH request to Salesforce.
   *
   * @param {string} path
   * @param {object} data
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   * @param {bool} [options.include_headers] Include headers in the requests response, defaults to false.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  patch = (path = "", data = {}, options = {}) => {
    return this.request.patch(path, data, this.request.mergeHeader(options));
  };

  /**
   * Make a DELETE request to Salesforce.
   *
   * @param {string} path
   * @param {object} data
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   * @param {bool} [options.include_headers] Include headers in the requests response, defaults to false.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  delete = (path = "", options = {}) => {
    return this.request.patch(path, this.request.mergeHeader(options));
  };
}

module.exports = Salesforce;
