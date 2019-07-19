```
mesa initialize \
    --inputs=in-orders-google-sheets \
    --outputs=out-orders-google-sheets \
    --files=in-orders-google-sheets.js,out-orders-google-sheets.js \
    --secrets=google_refresh_token,google_access_token,google_client_id,google_client_secret,google_expires_at
    --storage=google_sheets_orders_id
```
