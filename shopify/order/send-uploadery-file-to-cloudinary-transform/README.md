# Setup
- Create a [Cloudinary account](https://cloudinary.com/).
- Copy and paste your Cloudinary Name from your [Cloudinary Dashboard](https://cloudinary.com/console) and save as the `cloudinary-cloudname` Storage item.
- Copy and paste your Cloudinary API Key and API Secret from your [Cloudinary Dashboard](https://cloudinary.com/console) and save as the `cloudinary-api-key` and `cloudinary-api-secret` Secrets.
- Set the `lineitem-property-key` Storage item as the line item property that should be sent to Cloudinary. This will be your [Uploadery field name](https://docs.theshoppad.com/article/10-create-upload-fields-for-products#field-name).
- Set the `notes-attribute-name` Storage item as the note_attributes name that will be saved on the order.

## Optional Customizations
- Set the `cloudinary-transformation` Secret as a [Cloudinary Transformation](https://cloudinary.com/documentation/image_transformations) string to generate an eager image. Use the URL format examples from the Cloudinary docs.
