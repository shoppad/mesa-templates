const Mesa = require('vendor/Mesa.js');
const Mapping = require('vendor/Mapping.js');
const OutCreateFosdickOrder = require('./shopify_fosdick_order_map.js');
const ShopifyFosdickOrderLineItemMap = require('./shopify_fosdick_order_item_map.js');

/**
 * Processes virtual output for created orders, based on the criteria defined in the virtual output definition
 *
 * Creates a custom output task for each order. The custom output will then do the necessary calls to Shopify
 *  and, if necessary, Slack
 *
 * @type {{script}}
 */
module.exports = new class {

  // Fosdick payment type mapping
  supportedPaymentTypes = {
    'VISA': 1,
    'BOGUS': 1,
    'MASTERCARD': 2,
    'AMERICAN EXPRESS': 3,
    'DISCOVER': 4,
    'PREPAID': 5,
    'PAYPAL': 8,
    'AMAZON PAYMENTS': 9,
  };

  /**
   * Mesa Script
   *
   * @param {object} payload The payload data
   * @param {object} context Additional context about this task
   */
  script = (payload, context) => {
    if (payload.length > 0) {
      // Loop through the virtual output and enqueue custom output tasks
      let data = {
        // Fosdick Global Parameters
        'ClientCode': Mesa.secret.get('fosdick-client-code'),
        'ClientName': Mesa.secret.get('fosdick-client-name'),
        'Test': Mesa.storage.get('fosdick-test-mode') === 'true' ? 'Y' : 'N',
        'Order': []
      };

      // Define processors for convert()
      const processors = {
        preProcess: [this.processAddressData],
        process: [this.processDate, this.processDiscount, this.setNullValuesToZero, this.processPaymentType],
        postProcess: [this.addGlobalData],
      };

      const itemProcessors = {
        process: [this.setNullValuesToZero]
      };

      let orders = [];

      // Loop through each order and map data
      payload.forEach((order) => {
        let orderPayload = Mapping.convert(OutCreateFosdickOrder, order, 'shopify', 'fosdick', processors);

         // Check if payment_type is missing
         if (!orderPayload.PaymentType) {
          // Try converting gateway instead of 'payment_details.credit_card_company'
          orderPayload.PaymentType = this.processPaymentType('payment_type', order.gateway);
        }

        // Type paypal, some implementations require this field
        if (orderPayload.PaymentType === this.supportedPaymentTypes['PAYPAL']) {
          // Paypal entry, set PPPayerID to Shopify customer ID
          orderPayload.PPPayerID = order.customer.id;
        }

        orderPayload.Items = {};

        orderPayload.Items.Item = [];
        order.line_items.forEach(function (lineItem) {
          orderPayload.Items.Item.push(
            Mapping.convert(ShopifyFosdickOrderLineItemMap, lineItem, 'shopify', 'fosdick', itemProcessors)
          );
        });

        orders.push(orderPayload);
      });

      // Fosdick has a limit of 60 orders per request, break orders into batches of 60
      let chunkedOrders = this.chunkArray(orders, 60);

      chunkedOrders.forEach(function (orders) {
        data.Order = orders;

        Mesa.log.info('Fosdick payload ', data);

        // Post to fosdick
        let response = Mesa.request.post('https://www.unitycart.com/iPost/', data);
        Mesa.log.info('Fosdick response: ', response);

        if (response.UnitycartOrderResponse && response.UnitycartOrderResponse.OrderResponse) {
          if (response.UnitycartOrderResponse.OrderResponse.length) {
            response.UnitycartOrderResponse.OrderResponse.forEach(function (responseEntry) {
              if (responseEntry.SuccessCode === 'False') {
                Mesa.log.warn(`Error from Fosdick for order, details: `, responseEntry);
              }
            });
          }
         // If only 1 order, response will not be an array
         else if (response.UnitycartOrderResponse.OrderResponse.SuccessCode === 'False') {
            Mesa.log.warn(`Error from Fosdick for order, details: `, response.UnitycartOrderResponse.OrderResponse);
          }
        }
        else {
          Mesa.log.error('Invalid response returned from Fosdick, response: ', response);
        }
      });
    }
    return `Processed ${payload.length} orders`;
  }

  /**
   * Replaces null values with 0 for selected fields
   *
   * @param fieldKey
   * @param inputValue
   * @returns {*}
   */
  setNullValuesToZero = (fieldKey, inputValue) => {
    const fieldNames = ['postage', 'price'];
    if (fieldNames.includes(fieldKey) && inputValue === null) {
      return 0;
    } else {
      return inputValue
    }
  }

  /**
   * Converts date to US East Coast time per Fosdick's requirements
   *
   * @param fieldKey
   * @param inputValue
   * @returns {*}
   */
  processDate = (fieldKey, inputValue) => {
    if (fieldKey === 'order_date') {
      // Fosdick requires the order date to be sent in US Eastern (New York) time
      let orderCreatedDateEastern = new Date(inputValue).toLocaleString("en-US", {timeZone: "America/New_York"});
      orderCreatedDateEastern = new Date(orderCreatedDateEastern);

      return Mesa.date.format('Y-m-d H:i', orderCreatedDateEastern.getTime());
    } else {
      return inputValue;
    }
  }

  /**
   * Makes discount a negative value per Fosdick's requirements
   * @param fieldKey
   * @param inputValue
   * @returns {*}
   */
  processDiscount = (fieldKey, inputValue) => {
    if (fieldKey === 'discounts') {
      return 0 - (inputValue !== null ? inputValue : 0);
    } else {
      return inputValue;
    }
  }

  /**
   * Map shopify payment type to the
   * @param payload
   * @returns {string}
   */
  processPaymentType = (fieldKey, inputValue) => {

    if (fieldKey === 'payment_type') {
      inputValue = inputValue.toUpperCase();
      // Note: Fosdick require a payment type. For this demo script, the 'BOGUS' gateway defaults to Visa
      let paymentType = null;

      if (this.supportedPaymentTypes[inputValue] != undefined) {
        paymentType = this.supportedPaymentTypes[inputValue.toUpperCase()];
      }

      return paymentType;
    } else {
      return inputValue;
    }
  }

  /**
   * Add standard date such as ad code, payment type
   *
   * @param payload
   * @returns {*}
   */
  addGlobalData = (payload) => {
    // Note use this for testing only
    //payload.ExternalID += '_42';
    // Note: Fosdick requires a payment token. The functionality of this would need to be discussed with a Fosdick rep.
    // Using a dummy value for the initial automation
    payload.PaymentToken = 'MesaTest1234567';
    // Note: Fosdick normally requires a payment type. Setting to 1 (Visa) for now

    payload.AdCode = Mesa.secret.get('fosdick-ad-code');
    return payload;
  }

  /**
   * Pre-process shipping and billing addresses
   *
   * @param payload
   * @returns {*}
   */
  processAddressData = (payload) => {

    if (payload.shipping_address) {
      payload.shipping_address = this.processAddress(payload.shipping_address);
    }

    if (payload.billing_address) {
      payload.billing_address = this.processAddress(payload.billing_address);
    }

    return payload;
  }

  /**
   * Add state code / state other fields for Fosdick based on Shopify data.
   * Substring city to 13 chars to conform with Fosdick's requirements
   *
   * @param address
   * @returns {*}
   */
  processAddress = (address) => {
    // Only set state code if USA or Canada, otherwise set state_other
    address.state_code = address.country === 'United States' || address.country === 'Canada' ? (address.province_code !== null ? address.province_code : address.country) : null;
    address.state_other = address.country !== 'United States' && address.country !== 'Canada' ? (address.province !== null ? address.province : address.country) : null;
    address.city = address.city ? address.city.substring(0, 13) : '';
    return address;
  }

  /**
   * Breaks an array down into smaller arrays, based on the size provided
   *
   * @param arr
   * @param size
   * @returns {Array}
   */
  chunkArray = (arr, size) => {
    let myArray = [];
    for(let i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i+size));
    }
    return myArray;
  }
}