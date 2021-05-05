#### PR Review Checklist

Readme
- [ ] Are the install steps clear
- [ ] Do all of the links work

mesa.json
- [ ] Key: does it reflect the folder structure? For instance, if the folder for the template is `shopify/order/send_to_another_system`, the key should be the same. 
- [ ] Name: is it logical, proper-cased?
- [ ] Description: is it logical, end in period?
- [ ] Tags: Do they exist on getmesa.com/templates, proper-cased, logical?
- [ ] Source: lowercase
- [ ] Destination: lowercase
- [ ] Enabled: If no configuration necessary `true`, if there are ANY setup steps `false`
- [ ] Do the Input/Output names make sense? How about the keys?
- [ ] Are Storage, Secrets and scripts well-named

Template code
- [ ] Is code readable and well-commented?

QA
- [ ] Does the template work


#### Deploy checklist
- [ ] Squash and merge PR
- [ ] Add template key to https://homeroom.theshoppad.com/admin/#/mesa-templates
