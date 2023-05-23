#### Description

#### QA Checklist
- [ ] Does the template work

#### PR Review Checklist

mesa.json
- [ ] key: Use the slug provided in the task of the [MESA Templates](https://app.asana.com/0/1199933048569373/list) list.
- [ ] name: Use the name provided in the task of the [MESA Templates](https://app.asana.com/0/1199933048569373/list) list.
- [ ] version: Keep as is.
- [ ] description: Remove this since we rely on Prismic.
- [ ] seconds: Remove this since we rely on Prismic.
- [ ] enabled: Set to `false`
- [ ] setup: Set to `true` to add the template setup. Otherwise, keep `false` if template setup is not applicable. For Google Sheets templates, set to `custom` as mentioned in the [Authoring templates that support the setup wizard](https://github.com/shoppad/ShopPad/blob/master/pub-site/apps/mesa/docs/authoring-templates.md#custom-template-setup-fields) documentation.
- [ ] Do the Input/Output names make sense? How about the keys?

Template code (Custom Code, Transform)
- [ ] Is code readable and well-commented?

#### Deploy Checklist
- [ ] Squash and merge PR