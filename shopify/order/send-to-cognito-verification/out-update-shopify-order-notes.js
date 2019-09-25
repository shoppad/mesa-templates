const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');
const Cognito = require('vendor/Cognito.js');

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

    // Prepare `notes_attributes` for shopify
    Mesa.log.debug('Calling shopify to get the latest order note_attributes');
    const order = Shopify.get(`admin/orders/${payload.order.id}.json`);
    let noteAttributes = order.order.note_attributes;

    const data = payload.cognito;
    const cognito = new Cognito(Mesa.secret.get('cognito-key'), Mesa.secret.get('cognito-secret'), Mesa.storage.get('cognito-environment'));

    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_id',
      value: data.data.id,
    });
    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_created_at',
      value: data.data.attributes.created_at,
    });
    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_phone',
      value: data.data.attributes.phone.number,
    });
    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_first_name',
      value: cognito.getPropertyValue(data, 'name', '{first}'),
    });
    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_last_name',
      value: cognito.getPropertyValue(data, 'name', '{last}'),
    });
    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_middle_name',
      value: cognito.getPropertyValue(data, 'name', '{middle}'),
    });
    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_us_address',
      value: cognito.getPropertyValue(data, 'us_address', "{street}, {city}, {subdivision} {postal_code}, {country_code}"),
    });
    let dob = cognito.getPropertyValue(data, 'birth', '{year}-{month}-{day}');
    dob = dob ? dob.replace(/\-null/gi, '') : null;
    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_dob',
      value: dob,
    });

    let dateDob = new Date(cognito.getPropertyValue(data, 'birth', '{year}'), cognito.getPropertyValue(data, 'birth', '{month}'), cognito.getPropertyValue(data, 'birth', '{day}'));
    const age = this.calculateAge(dateDob);
    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_age',
      value: age,
    });
    // Possible modification: Send email (or post to Slack, ...) if age is under allowed age
    // if (age < 21) {
    //   Mesa.email.send(context.shop.email, `Age of customer for order ${payload.order.name} is too young: ${age}`, `https://${context.shop.url}/admin/orders/${payload.order.id}`);
    // }

    noteAttributes = Shopify.appendToArray(noteAttributes, {
      name: 'cognito_ssn_last4',
      value: cognito.getPropertyValue(data, 'ssn', '{serial}'),
    });
    // Possible modification: Store the entire SSN (be sure you want to be responsible for storing this data!)
    // Shopify.appendToArray(noteAttributes, {
    //   name: 'cognito_ssn_complete',
    //   value: cognito.getPropertyValue(data, 'ssn', '{number}'),
    // });

    Mesa.log.debug('Saving Shopify notes_attributes', noteAttributes);
    const shopifyPayload = {
      order: {
        id: payload.id,
        note_attributes: noteAttributes,
      }
    };
    Mesa.output.done(shopifyPayload, {order_id: payload.order.id});
  }


  /**
   * Calculate an age when given a birth date.
   * From https://stackoverflow.com/a/21984136/2308553
   * @param {Date} birthday
   * @return {number}
   */
  calculateAge = (birthday) => {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
