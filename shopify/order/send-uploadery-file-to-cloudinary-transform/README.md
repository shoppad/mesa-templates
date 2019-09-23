# Send Uploadery File To Cloudinary Transform

Send Uploadery file from Shopify order to Cloudinary transform when order is created.

---

## Setup

- Create a Cloudinary account.
- Copy your Cloudinary Cloud Name from your [Cloudinary Account Settings Page](https://cloudinary.com/console/settings/account) and save as the `cloudinary-cloudname` storage item.
- Copy your Cloudinary API Key and Secret from your [Cloudinary Security Settings Page](https://cloudinary.com/console/settings/security) and save as the `cloudinary-api-key` and `cloudinary-api-secret` secrets.
- Set the `lineitem-property-key` storage item as the line item property that should be sent to Cloudinary. This will be your Uploadery field name.
- Set the `notes-attribute-name` storage item as the note_attributes name that will be saved on the order.

## Optional Customizations

- Set the `cloudinary-transformation` secret as a [Cloudinary Transformation](https://cloudinary.com/documentation/image_transformations) string to generate an eager image. Use the URL format examples from the Cloudinary docs.
