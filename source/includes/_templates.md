# Templates

Using the Whispir.io API, messages can be stored as Message Templates that can be easily referenced within your API calls.

The purpose of using a Message Template rather than including your content directly into your messages API call is to ensure a separation of message content/design and application code.

If you are including the content and design of messages within your application code, in the event these need to change, this is often a task for a developer, resulting in potentially lengthy change request cycles.

The simple inclusion of a Message Template can alleviate this completely, allowing the designers to control the look and feel of the message, while the developer can control when it is triggered.

## Creating Templates

```xml
HTTP 1.1 POST https://api.whispir.com/templates?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.template-v1+xml

<?xml version="1.0" encoding="UTF-8"?>
<ns3:template xmlns:ns3="https://schemas.api.whispir.com" 
              xmlns:ns2="https://schemas.api.whispir.com/dap">
  <messageTemplateName>Sample SMS Template</messageTemplateName>
  <messageTemplateDescription>
    Template to provide an example on whispir.io
  </messageTemplateDescription>
  <subject>Test SMS Message</subject>
  <body>This is the body of my test SMS message</body>
</ns3:template>
````
```go
HTTP 1.1 POST https://api.whispir.com/templates?apikey=[yourkey]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.template-v1+json

{ 
   "messageTemplateName": "Sample SMS Template", 
   "messageTemplateDescription": "Template to provide an example on whispir.io",
   "subject": "Test SMS Message",
   "body": "This is the body of my test SMS message"
}
```

> The sample code above will create a simple SMS only message template within the default workspace.<br/><br/>
The expected response to this call is an HTTP 201 - Created.

To create a new message template, you can use the `/templates` endpoint.

Only **3 fields** are required:

1. messageTemplateName - the name of the template to be stored
2. subject - the first line or identifier of the SMS
3. body - At least one of the **Body** fields must be populated (SMS, Email, Voice or Web).

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">messageTemplateName:</td>
            <td><strong>String</strong><br/>
                Specifies the name of the message template to be used within message requests.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">messageTemplateDescription:</td>
            <td><strong>String</strong><br/>
                Specifies the description of the message template for others to understand it's purpose.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">subject:</td>
            <td><strong>String</strong><br/>
                Specifies the first line of the SMS message or Voice call, and the subject of the Email message.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">body:</td>
            <td><strong>String</strong><br/>
                Specifies the content of the SMS message.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">email:</td>
            <td><strong>Object</strong><br/>
                Email object described below. Used for sending email messages.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">voice:</td>
            <td><strong>Object</strong><br/>
                Voice object described below. Used for sending voice calls to mobile phones and landlines.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">web:</td>
            <td><strong>Object</strong><br/>
                Web object described below. Used for web publishing and Rich Messages.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">social:</td>
            <td><strong>Object</strong><br/>
                Social object described below. Used for publishing content to social media (Twitter, Facebook, LinkedIn).
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">type:</td>
            <td><strong>String</strong><br/>
                Allows the user to modify the message behaviour for replies and DLRs (delivery receipts) e.g.
                <ul>
                    <li>defaultNoReply - Used to reject any replies to this message.</li>
                    <li>noDlr - Used to specify that DLRs should not be enabled for this message.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">features:</td>
            <td><strong>Object</strong><br/>
                Allows the user to modify the push notifications properties if these are configured in the company.
                <br/>
                <br/>
                <strong>pushOptions:</strong>
                <ul>
                    <li>notifications - enabled/disabled</li>
                    <li>escalationMins - # mins to await a push notifications response</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

**Note:** All of the options above are the same as provided in the `/messages` endpoint <a href="#communications">here</a>

##Retrieving Templates

```xml
HTTP 1.1 GET https://api.whispir.com/templates?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Accept: application/vnd.whispir.template-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="https://schemas.api.whispir.com/dap" xmlns:ns3="https://schemas.api.whispir.com">
    <status>1 to 4 of 4</status>
    <ns2:messagetemplates>
        <ns2:template>
            <ns2:link uri="https://api.whispir.com/templates/F0547F6F2E4839F8?apikey=[your_api_key]" rel="self" method="GET"/>
            <id>F0547F6F2E4839F8</id>
            <messageTemplateDescription>
            </messageTemplateDescription>
            <messageTemplateName>
              Appointment Reminder
            </messageTemplateName>
        </ns2:template>
        <ns2:template>
            <ns2:link uri="https://api.whispir.com/templates/DDE10AC13FB0E457?apikey=[your_api_key]" rel="self" method="GET"/>
            <id>DDE10AC13FB0E457</id>
            <messageTemplateDescription>
            </messageTemplateDescription>
            <messageTemplateName>
              Customer Survey
            </messageTemplateName>
        </ns2:template>
        <ns2:template>
            <ns2:link uri="https://api.whispir.com/templates/900972D1C916FE84?apikey=[your_api_key]" rel="self" method="GET"/>
            <id>900972D1C916FE84</id>
            <messageTemplateDescription>
            </messageTemplateDescription>
            <messageTemplateName>
              Service announcement
            </messageTemplateName>
        </ns2:template>
        <ns2:template>
            <ns2:link uri="https://api.whispir.com/templates/9CB9BE20B885542D?apikey=[your_api_key]" rel="self" method="GET"/>
            <id>9CB9BE20B885542D</id>
            <messageTemplateDescription>
            </messageTemplateDescription>
            <messageTemplateName>
              Shift Opportunity
            </messageTemplateName>
        </ns2:template>
    </ns2:messagetemplates>
</ns2:return>
```
```go
HTTP 1.1 GET https://api.whispir.com/templates?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Accept: application/vnd.whispir.template-v1+json

{
  "status" : "1 to 4 of 4    ",
  "messagetemplates" : [ {
    "messageTemplateName" : "Appointment Reminder",
    "messageTemplateDescription" : "",
    "id" : "F0547F6F2E4839F8",
    "link" : [ {
      "uri" : "https://api.whispir.com/templates/F0547F6F2E4839F8?apikey=[your_api_key]",
      "rel" : "self",
      "method" : "GET"
    } ]
  }, {
    "messageTemplateName" : "Customer Survey",
    "messageTemplateDescription" : "",
    "id" : "DDE10AC13FB0E457",
    "link" : [ {
      "uri" : "https://api.whispir.com/templates/DDE10AC13FB0E457?apikey=[your_api_key]",
      "rel" : "self",
      "method" : "GET"
    } ]
  }, {
    "messageTemplateName" : "Service announcement",
    "messageTemplateDescription" : "",
    "id" : "900972D1C916FE84",
    "link" : [ {
      "uri" : "https://api.whispir.com/templates/900972D1C916FE84?apikey=[your_api_key]",
      "rel" : "self",
      "method" : "GET"
    } ]
  }, {
    "messageTemplateName" : "Shift Opportunity",
    "messageTemplateDescription" : "",
    "id" : "9CB9BE20B885542D",
    "link" : [ {
      "uri" : "https://api.whispir.com/templates/9CB9BE20B885542D?apikey=[your_api_key]",
      "rel" : "self",
      "method" : "GET"
    } ]
  } ],
  "link" : [ ]
}
```

To retrieve a list of templates from the Whispir.io API you can execute an **HTTP GET** using the `/templates` endpoint.

You will need to supply one of the following headers (for retrieving JSON or XML):

- `Accept: application/vnd.whispir.template-v1+xml`
- `Accept: application/vnd.whispir.template-v1+json`

An array of Message Templates will be returned to you in the HTTP response body.

Each of these templates will provide the following information:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Response Elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">messageTemplateName:</td>
            <td><strong>String</strong><br/>
                Specifies the name of the message template to be used within message requests.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">messageTemplateDescription:</td>
            <td><strong>String</strong><br/>
                Specifies the description of the message template for others to understand it's purpose.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">id:</td>
            <td><strong>String</strong><br/>
                Specifies the ID of the template that can be used for message sending.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">link:</td>
            <td><strong>Array</strong><br/>
                Provides a list of URLs that can be used to manipulate or access the message template.
                <ul>
                  <li>uri - the link to access the message template</li>
                  <li>rel - the descriptor for what the link will do</li>
                  <li>method - the HTTP method to use with this particular link</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

##Using Templates

```xml
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="https://schemas.api.whispir.com">
    <to>john.smith@test.com</to>
    <messageTemplateId>BACEB8D46BEF5315</messageTemplateId>
</ns2:message> 
```
```go
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+json

{ 
   "to" : "6140000000000",
   "messageTemplateId" : "BACEB8D46BEF5315"
}
```

> Alternatively, you can enter the Message Template Name in place of the Message Template ID:

```xml
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="https://schemas.api.whispir.com">
    <to>6140000000000</to>
    <messageTemplateName>Sample SMS Template</messageTemplateName>
</ns2:message> 
```
```go
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+json

{ 
   "to" : "6140000000000",
   "messageTemplateName" : "Sample SMS Template"
}
```

Whispir.io API messages can simply specify the Message Template ID in the messages request, instead of specifying the entire content payload.

The message template can then easily be changed (using either another API request or by logging in to the Whispir Platform) and the part of the application sending the messages does not need to be altered.

## Overriding Templates

> You can override content in the template by supplying it inline with the message request

```xml
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="https://schemas.api.whispir.com">
    <to>6140000000000</to>
    <messageTemplateName>Sample SMS Template</messageTemplateName>
    <subject>This will override the template Subject</subject>
    <body>This will override the template SMS Body</body>
</ns2:message> 
```
```go
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+json

{ 
   "to" : "6140000000000",
   "messageTemplateName" : "Sample SMS Template",
   "subject" : "This will override the template Subject",
   "body" : "This will override the template SMS Body"
}
```

Users can easily override the content of the Message Template by supplying the content inline with the request to the `/messages` endpoint.

Any information provided in the message request will take precidence over the templated content.

All of the features that are specified on the template (for example, any message aliasing) will still be respected when the message is delivered.