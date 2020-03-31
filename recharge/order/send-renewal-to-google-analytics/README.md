## Setup

### Insert snippet for analytics to be added to checkouts in recharge

Add this snippet to cart.liquid, inside the `<form>` tag, to capture the GA client ID on checkout
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
### Recharge + Google Analytics

- Open `Recharge: Order Processed` and follow the Credential steps to authorize with Recharge.
- Open `Google Analytics: Create Transaction` and paste in your google analytics property ID.
