# Send File to Google Cloud Print

Print a file with a Google Cloud Print connected printer. Triggered from a call in another Automation's script to Mesa.automation.send().

---

## Setup

- Create an account on https://www.google.com/cloudprint
- Add a printer on https://www.google.com/cloudprint/#printers
- Select the printer, click the `Details` button and copy the Printer ID (it will look something like `71818594-c69f-fec2-3868-3b14d9459835`)
- Go to the Automation in the Mesa Dashboard
- Paste the Printer ID value as the value of the `printerid` Storage item.
- Go to http://www.theshoppad.com/apps/mesa/oauth/google-mesa/mesa/file/send-to-google-cloudprint?scope=https://www.googleapis.com/auth/cloudprint to obtain a Google oAuth token
- Optionally edit the `google-cloudprint-ticket.json` Storage item to define paper dimensions and other print settings. See https://developers.google.com/cloud-print/docs/cdd#cjt for more details.

## How to use this Automation

This Automation is triggered by a call to `Mesa.automation.send()` in another Mesa Script. The `file` attribute is required. The ticket attribute is optional and contains [Cloud Job Ticket details](https://developers.google.com/cloud-print/docs/cdd#cjt).

Basic example:

```
Mesa.automation.send(callback, {
    file: "https://uat.shiphawk.com/api/v4/public/documents/files/f60e1d74048eb706000099009b2e4936.pdf"
});
```

Pass a custom Cloud Job Ticket (overrides the value of the `google-cloudprint-ticket.json` Storage item):

```
Mesa.automation.send(callback, {
    file: "https://uat.shiphawk.com/api/v4/public/documents/files/f60e1d74048eb706000099009b2e4936.pdf",
    ticket: {
        "version": "1.0",
        "print": {}
    }
});
```
