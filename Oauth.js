const Mesa = require("./vendor/Mesa1.js");

/**
 * Methods to authenticate and make authenticated requests with a third party API.
 *
 * @return {class}
 */
class Oauth {
  /**
   * Access token.
   * @type {[type]}
   */
  accessToken;

  /**
   * Grant type.
   * @type {[type]}
   */
  grantType;

  /**
   * Token issued at.
   * @type {[type]}
   */
  issuedAt;

  /**
   * Authenticate with a third party API
   *
   * @param {string} path
   * @param {string} grantType
   * @param {object} [options]
   * @param {object} [options.username]
   * @param {object} [options.password]
   * @param {object} [options.clientId]
   * @param {object} [options.secret]
   *
   * @return {void}
   */
  constructor(path = "", grantType = "", options = {}) {
    if (grantType === "password") {
      this.grantType = grantType;
      options.grant_type = grantType;

      let bearerRequest = Mesa.request.post(
        path,
        {},
        {
          query: options
        }
      );

      this.accessToken = bearerRequest.access_token;
      this.issuedAt = bearerRequest.issued_at;
    }
  }

  /**
   *
   *
   * @memberof Oauth
   */
  getAccessToken = () => {
    return this.accessToken;
  };

  /**
   * [getOauthHeaders description]
   * @return {[type]} [description]
   */
  getOauthHeaders = () => {
    if (this.grantType === "password") {
      return {
        Authorization: "Bearer " + this.accessToken
      };
    }
  };

  /**
   * Merging header.
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  mergeHeader = options => {
    if (options.headers) {
      options.headers = { ...this.getOauthHeaders(), ...options.headers };
    } else {
      options.headers = this.getOauthHeaders();
    }

    Mesa.log.info("this.grantType", this.grantType);
    Mesa.log.info("options", options);

    return options;
  };

  getIssuedAt = () => {};

  /**
   * Make a GET request to an external Rest API.
   *
   * @param {string} path
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  get = (path = "", options = {}) => {
    return Mesa.request.get(path, this.mergeHeader(options));
  };

  /**
   * Make a POST request to an external Rest API.
   *
   * @param {string} path
   * @param {object} data
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  post = (path = "", data, options = {}) => {
    // @todo: merge options with auth
    return Mesa.request.post(path, data, this.mergeHeader(options));
  };

  /**
   * Make a PUT request to an external Rest API.
   *
   * @param {string} path
   * @param {object} data
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  put = (path = "", data = {}, options = {}) => {
    return Mesa.request.put(path, data, this.mergeHeader(options));
  };

  /**
   * Make a PATCH request to an external Rest API.
   *
   * @param {string} path
   * @param {object} data
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  patch = (path = "", data = {}, options = {}) => {
    return Mesa.request.patch(path, data, this.mergeHeader(options));
  };

  /**
   * Make a DELETE request to an external Rest API.
   *
   * @param {string} path
   * @param {object} data
   * @param {object} [options]
   * @param {bool} [options.json] Automatically add JSON Content-Type headers and decode the response. Default: `true`
   * @param {object} [options.query] Parameters to append to the querystring.
   * @param {object} [options.headers] Headers to send to the request.
   * @param {bool} [options.debug] Log request information and response headers.
   *
   * @return {string|object} The response returned by the request. `object` if `options.json` is `true`, `string` if `options.json` is `false`.
   */
  delete = (path = "", options = {}) => {
    return Mesa.request.patch(path, this.mergeHeader(options));
  };
}

module.exports = Oauth;
