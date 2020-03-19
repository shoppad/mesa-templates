# Recharge - Send renewal to Google Analytics.

On Recharge successful order renewal creation, send client ID data to Google Analytics.

[![Integrate with Mesa](https://www.getmesa.com/images/integrate.png)<br>Install this library now in Mesa](https://getmesa.com/install/recharge/order/send-renewal-to-google-analytics)

## Setup

### Insert snippet for analytics to be added to checkouts in recharge

Add this snippet to cart.json, inside the `<form>` tag, to capture the GA client ID on checkout
```
  <!-- Mesa by ShopPad - BEGIN GA client ID snippet -->
  <input id="cid" type="hidden" name="attributes[cid]" />

  <script>
    ga(function(tracker) {
      var clientId = tracker.get('clientId');
      if (clientId) {
        $('#cid').val(clientId); 
      }
    });
  </script>
  <!-- Mesa by ShopPad - END GA client ID snippet -->
```

### Recharge

- Authorize the recharge application
@TODO

## Developing

[Mesa-CLI](https://developers.getmesa.com/cli) command to export code and configuration to your local filesystem:

```
mesa initialize \
    --inputs=recharge-order-processed \
    --outputs=shopify-retrieve-order \
    --files=transform.js
```
