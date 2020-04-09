## Setup

### products.json

_WARNING:_ THIS WILL NOT WORK PROPERLY IF YOU HAVE DIFFERENT PRICES PER VARIANT

The products.json "Storage" item is where you will specify what products are affected and what prices they will recieve. It is written in a langage called "json" and any mistakes here will cause errors and may have the potential to cause issues on your Shopify site. Please be careful!

Product id to change for each Variant

```
  "id": 123456789,
```

The price to set, must be in the format "X.XX"

```
  "price": "1.00",
```

The original price, must be in the format "X.XX", also is used to "reset" the prices at a later date using the reduce_or_reset_price "Storage" item

```
  "compare_at_price": "1.99"
```

### Send to Shopify (exit testing mode)

_WARNING:_ misconfigured product updates can overwrite your variants! Please make sure products.json is set up properly before exiting test mode!

To fully enable this automation change the "Storage" item "skip_send_to_shopify_true_or_false" to false. If it is set to true everything will run EXCEPT the final update.

### Reset the prices to original levels

To "reset" the prices, change the "Storage" item "reduce_or_reset_price" to "reset", and it will change the products' price back to the value you entered in each "compare_at_price" in products.json.
