# Response Rules

> API Endpoint

> > - generic

```xml
https://api.<region>.whispir.com/responserules/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.responserule-v1+xml
```

```go
https://api.<region>.whispir.com/responserules/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.responserule-v1+json
```

> > - limited to a workspace

```xml
https://api.<region>.whispir.com/workspaces/{:id}/responserules/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.responserule-v1+xml
```

```go
https://api.<region>.whispir.com/workspaces/{:id}/responserules/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.responserule-v1+json
```

```
> Resource type

- application/vnd.whispir.responserule-v1+xml
- application/vnd.whispir.responserule-v1+json


> Methods supported

- GET
- POST
- PUT
- DELETE
```

Using Response Rules in combination with Message Templates allows users to automatically group responses to messages into different response groups for reporting purposes.

Response Rules are useful when users are sending messages with known responses, e.g. Ratings (1-5), Yes/No, or Accept/Decline.

Once the Response Rule has been defined, it can be associated with a Message Template and any responses to messages sent using the template will be automatically categorised.

**Note:** Response Rules are sometimes called Response Templates. These names can be used interchangably.

## Creating Response Rules

> Creating Response Rules
> > The following API calls allow users to create new Response Rules using the Whispir API.

```
HTTP 1.1 POST https://api.<region>.whispir.com/responserules?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: your_api_key
```

```xml
Content-Type: application/vnd.whispir.responserule-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:responserule xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <name>Response Rule 1</name>
    <description></description> 
    <responseTemplatePatterns>
        <responseTemplatePattern>
            <name>Yes Rule</name>
            <textPrompt>YES</textPrompt>
            <voicePrompt>1</voicePrompt>
            <spokenVoicePrompt>to select YES</spokenVoicePrompt>
            <pattern>startswith</pattern>
            <colour>#00947d</colour>
        </responseTemplatePattern>
    </responseTemplatePatterns>
</ns3:responserule>
````
```go
Content-Type: application/vnd.whispir.responserule-v1+json

{
  "name" : "Response Rule 1",
  "description" : "",
  "responseTemplatePatterns" : {
    "responseTemplatePattern" : [ {
      "name" : "Yes Rule",
      "textPrompt" : "YES",
      "voicePrompt" : "1",
      "spokenVoicePrompt" : "to select YES",
      "pattern" : "startswith",
      "colour" : "#00947d"
    } ]
  }
}
```

> > The sample code above will create a simple Response Rule with a single rule within the default workspace.<br/><br/>
The expected response to this call is an **HTTP 201 - Created**.

To create a new Response Rule, you can use the `/responserules` endpoint.

The following fields can be utilised within the request:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">name:</td>
            <td><strong>String</strong><br/>
            	Specifies the name of the Response Rule.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">description:</td>
            <td><strong>String</strong><br/>
                Specifies the description of the response rule for others to understand it's purpose.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">responseTemplatePatterns:</td>
            <td><strong>Object</strong><br/>
                This object contains the responseTemplatePattern array which contains each of the response rule elements.
            </td>
        </tr>
    </tbody>
</table>

### Response Template Patterns

Each Response Rule has a series of __Patterns__ that allow the creator to specify what textual content should be matched in the response SMS or Email, and a number that should be entered when IVR (Voice) is being used.

The patterns specify the following information:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Response Template Pattern Elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">name:</td>
            <td><strong>String</strong><br/>
            	The name of the Response Category.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">pattern:</td>
            <td><strong>String</strong><br/>
            	Specifies the mechanism for matching the textPrompt.<br/><br/>
            	The following options are available:
            	<ul>
            		<li>startsWith</li>
            		<li>contains</li>
            		<li>exactmatch</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">textPrompt:</td>
            <td><strong>String</strong><br/>
                Specifies the textual string that should be matched using the pattern (specified above) within the Email, SMS or Web response. 
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">voicePrompt:</td>
            <td><strong>String</strong><br/>
                The number (from 0-9, * or #) that the recipient of the voice call should enter to select this response category.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">spokenVoicePrompt:</td>
            <td><strong>String</strong><br/>
                The TTS (text-to-speech) that is dynamically read out when describing to the user what this response category is.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">colour:</td>
            <td><strong>String</strong><br/>
                The hexidecimal colour code that is used in the Message Response Report to show this category being used.
            </td>
        </tr>
    </tbody>
</table>

Each Response Rule can specify as many Response Template Patterns as required.

Each of the Patterns specified will also dynamically create buttons within any Rich Message that is associated with the Response Rule.

This provides an out of the box capability to quickly gather feedback from the field using a Rich User interface, and leveraging SMS as the delivery mechanism.

For more information about using **Rich Messages**, click <a href="#rich-messages">here</a>.

## Using Response Rules

After creating a Response Rule, you must create a new Message Template (or update an existing one) and associate the Response Rule ID.

**Note:** The Response Rule ID will be returned in the `Location` header after a successful creation.

This association of Response Rule to Message Template is performed using the `responseTemplateId` field within the Message Template.

For more information on Creating Message Templates, click <a href="#creating-templates">here</a>.

## Matched Rule

> Matched Rule

> > Sending a message using template and callback

```
HTTP 1.1 POST https://api.<region>.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: your_api_key
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <messageTemplateName>ReplyYesNoTemplate</messageTemplateName>
    <callbackId>myCallbackName</callbackId>
</ns2:message> 
```

```go
Content-Type: application/vnd.whispir.message-v1+json

{ 
   "to" : "$mobile",
   "messageTemplateName" : "ReplyYesNoTemplate",
   "callbackId" : "myCallbackName"
}
```

If a message is sent using a template and associated ResponseRule, it would be helpful to know what response rule condition has matched when the reply is recieved from the end user. Whispir API facilitates this to be know in real time via the /callbacks endpoint.

How to use a callback to get the matched response rule condition?

- Create a response rule with required conditions
- Create a template/use and existing template - with the above responserule id added to it
- Create a callback/use an existing callback
- Send a message using the messages endpoint specifying the to, template, and callbackId values

**After the Message is received:**

- The user has replied to the message
- Message is received by Whispir
- Response Rules are applied to the response
- Callback is invoked
- Response body contains the response given by the user, the channel, timestamps (refer to callback Documentation) and *customParameters*

> > Custom Parameters in Callback specifying the matched rule and category

```xml
<customParameters>
    <entry>
      <key>matchedCategory</key>
      <value>Reserved</value>
    </entry>
    <entry>
      <key>responseRule</key>
      <value>Reserved Words</value>
    </entry>

    ...

</customParameters>
```

```go
"customParameters" : {
    "matchedCategory" : "Reserved",
    "responseRule" : "Reserved Words",

    ...
}
```

**What is inside the custom Parameters?**

- Custom Parameters gives you details of various processing/processed values associated with the message
- While many parameters are sent, the ones that are associated with response rules are :

    - **responseRule** - the name of responseRule that has matched
    - **matchedCategory** - the category/condition inside the responseRule that has matched

For more details on the callbackParameters, refer to the /callbacks endpoint.