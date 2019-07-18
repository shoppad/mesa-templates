# Tracktor Notifications
Send Email and SMS Notifications to Customer on Tracktor status changes

[![Automate with Mesa](https://www.getmesa.com/images/integrate.png)<br />Get the Template](https://www.getmesa.com/install/shoppad/mesa-templates/tracktor/send-email-or-sms-notification-on-status-change)

## Setup

### Email setup

There is no additional setup beyond customizing templates ([see below](#customizing-templates)).

### Twilio setup

1. Create a Twilio account
2. Create a Twilio Project
3. Purchase a Twilio phone number (starting at USD $1/mo). Paste the phone number, 
    including country code into the paste it into the `tracktor-twilio-phone-number` [Mesa Secrets](https://getmesa.com/go/secrets) field
4. Copy your production `Account SID` from your [Project's Settings page](https://www.twilio.com/console/project/settings)
    and paste it into the `tracktor-twilio-sid` [Mesa Secrets](https://getmesa.com/go/secrets) field
5. Copy your production `Auth Token` from your [Project's Settings page](https://www.twilio.com/console/project/settings)
    and paste it into the `tracktor-twilio-token` [Mesa Secrets](https://getmesa.com/go/secrets) field
6. Customize your SMS templates [see below](#customizing-templates)

> Note: Twilio charges a per-SMS fee [starting at USD $0.01](https://www.twilio.com/sms/pricing/us)
    

## Customizing templates

To edit your email templates, go to the [Mesa Storage](https://getmesa.com/go/storage) tab.
- For emails: edit the `tracktor-email-*.liquid` and `tracktor-email-subject-*` storage items
- For SMS messages send via Twilio: edit the `tracktor-sms-*.liquid` storage items

> To disable an email or SMS alert, simply delete the corresponding storage item for that alert. 
  For example do disable in_transit email alerts delete `tracktor-email-in-transit.liquid`.

All storage fields support liquid and have access to your full store details, order information and tracking information. 
Common liquid variables include:
- `shop.name`
- `order.customer.name`
- `order.name` The human-readable order number
- `order.status`
- `order.line_items`
- `order.shipping_address`
- `data` All of the tracking data
- `carrier` Details about the carrier
- `tracking_number`


## Developing
[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:
```
mesa initialize \
    --inputs=in-tracktor-alerts \
    --outputs=out-tracktor-email,out-tracktor-twilio \
    --files=tracktor/alerts/in-tracktor-alerts.js,tracktor/alerts/out-tracktor-email.js,tracktor/alerts/out-tracktor-twilio.js \


```
