#Callbacks

Whispir utilises API Callbacks to send simple notifications to different registered services in the event that some change has occurred on the Whispir Platform.

## Callback Overview

> Callback Overview
> > Whispir can notify your application when your SMS, Email or Voice messages receive a reply.
<br/><br/>
> > An example callback that your application or service would receive is specified below.

```
HTTP 1.1 POST http://yourserver/callback.php
```

```xml
Content-Type: application/xml

<ns2:deliveryresponse xmlns:ns2="http://schemas.api.whispir.com">
    <messageid>ABC4857BCCF484575FCA</messageid>
    <location>https://api.whispir.com/messages/ABC4857BCCF484575FCA</location>
    <from>
        <name>Fred Waters</name> 
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri> 
        <mobile>$mobile</mobile> 
        <email>me@example.com</email> 
        <voice>$mobile</voice> 
    </from> 
    <responsemessage> 
        <channel>SMS</channel> 
        <acknowledged>09/01/13 13:22</acknowledged> 
        <content>Yes, I accept. Will I need to bring steel cap boots?</content> 
    </responsemessage> 
</ns2:deliveryresponse>
```

```go
Content-Type: application/json
{
    "messageId":"ABC4857BCCF484575FCA",
    "location" : "https://api.whispir.com/messages/ABC4857BCCF484575FCA",
    "from":{
          "name":"Fred Waters",
          "mri":"Fred_Waters.528798.Sandbox@Contact.whispir.com",
          "mobile":"$mobile",
          "email":"me@example.com",
          "voice":"$mobile"
         },
    "responseMessage":{
           "channel":"SMS",
           "acknowledged":"09/01/13 13:22",
           "content":"Yes, I accept. Will I need to bring steel cap boots?"
    }
}
```

Callbacks allow custom applications to register URLs with Whispir that are used for notifications when certain events occur e.g. a response to a message is received, or a message was undeliverable.

<br/><img src="http://developer.whispir.com/files/Whispir_API_diagram.png"/><br/>

Whispir's Callback Service will forward the content of each message response, along with some associated metadata to a URL that the user has pre-registered to receive this information.

**Note:** Whispir does not check for a response from this callback server. On setup, it is expected that the callback server will respond with a 200 OK to a GET request. Any error response sent from this callback server during general use is not considered. Users should not expect callbacks to be re-tried on error.

Some other points to follow -

1. Always use a domain name for the callback. Do not use an IP.
2. Limit the port to 80 or 443. Do no use any other ports.
3. Depending on the type chosen 'json' or 'xml' for the Content-Type, whispir would make a similar GET (and subequently POST) calls. So, please ensure that your your web server is configured to handle such MIME type. 

## Creating new Callbacks

> Creating new Callbacks
> > The following API calls allow users to create new Callbacks using the Whispir API.

```
HTTP 1.1 POST https://api.whispir.com/callbacks?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.api-callback-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:companyapicallback xmlns:ns2="http://schemas.api.whispir.com" 
                    xmlns:ns3="http://schemas.api.whispir.com/dap">
    <name>Callback Name</name>
    <url>http://myserver.com/mycallback.php</url>
    <auth>
        <key>MY_AUTH_KEY</key>
        <type>querystring</type>
    </auth>
    <contentType>json</contentType>
    <email>me@example.com</email>
    <callbacks>
        <reply>enabled</reply>
        <undeliverable>enabled</undeliverable>
    </callbacks>
</ns2:companyapicallback>
```

```go
Content-Type: application/vnd.whispir.api-callback-v1+json

{
  "name" : "Callback Name",
  "url" : "http://myserver.com/mycallback.php",
  "auth" : {
    "type" : "querystring",
    "key" : "MY_AUTH_KEY"
  },
  "contentType" : "json",
  "email" : "me@example.com",
  "callbacks" : {
    "reply" : "enabled",
    "undeliverable" : "enabled"
  }
}
```

> > The sample code above will create a callback endpoint that can be used within messages being sent from Whispir.<br/><br/>
The expected response to this call is an **HTTP 201 - Created**.

To create a new API Callback, you can use the `/callbacks` endpoint.

The following table describes the fields that can be used within the request.

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
                Specifies the name (ID) of the callback to be used within message requests.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">url:</td>
            <td><strong>String</strong><br/>
                Specifies the service URL that API Callbacks should be forwarded to.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">auth:</td>
            <td><strong>Object</strong><br/>
                Specifies the Authorization type that should be used with this endpoint.  The specific elements of this object are described below.<br/><br/>
                The options for this parameter are:
                <ul>
                  <li>querystring</li>
                  <li>httpheader</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">contentType:</td>
            <td><strong>String</strong><br/>
                Specifies the content type that should be sent to this endpoint.<br/><br/>
                The choices are as follows:
                <ul>
                  <li>json</li>
                  <li>xml</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">email:</td>
            <td><strong>String</strong><br/>
                Specifies the email address where failure notifications should be sent.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">callbacks:</td>
            <td><strong>Object</strong><br/>
                Object to store the callbacks that should be invoked for this endpoint.  The specific elements of this object are described below. <br/><br/>
                The options for this parameter are:
                <ul>
                  <li><strong>reply</strong>: enabled/disabled</li>
                  <li><strong>undeliverable</strong>: enabled/disabled</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Callback Authorization

> Callback Authorization
> > Callback Servers should validate that the inbound request they are receiving is actually coming from Whispir.<br/><br/>
> > Callbacks can be authorized using one of two methods: **HTTP Header**, or **URL Query Parameter**

> > **HTTP Header Auth Token**
> > <br/>Users can specify their Authorization token as an HTTP Header. Whispir will add the **X-Whispir-Callback-Key** Header to the request.

```
HTTP 1.1 POST https://yourserver/callback.php
X-Whispir-Callback-Key: MY_AUTH_TOKEN 
```

```xml
Content-Type: application/xml

<ns2:deliveryresponse xmlns:ns2="http://schemas.api.whispir.com">
    <messageid>ABC4857BCCF484575FCA</messageid>
    <location>https://api.whispir.com/messages/ABC4857BCCF484575FCA</location>
    <from>
        <name>Fred Waters</name> 
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri> 
        <mobile>$mobile</mobile> 
        <email>me@example.com</email> 
        <voice>$mobile</voice> 
    </from> 
    <responsemessage> 
        <channel>SMS</channel> 
        <acknowledged>09/01/13 13:22</acknowledged> 
        <content>Yes, I accept. Will I need to bring steel cap boots?</content> 
    </responsemessage> 
</ns2:deliveryresponse>
```

```go
Content-Type: application/json

{
  "messageid" : "ABC4857BCCF484575FCA",
  "location" : "https://api.whispir.com/messages/ABC4857BCCF484575FCA",
  "from" : {
    "name" : "Fred Waters",
    "mri" : "Fred_Waters.528798.Sandbox@Contact.whispir.com",
    "mobile" : "$mobile",
    "email" : "me@example.com",
    "voice" : "$mobile"
  },
  "responseMessage" : {
    "channel" : "SMS",
    "acknowledged" : "09/01/13 13:22",
    "content" : "Yes, I accept. Will I need to bring steel cap boots?"
  }
}
```

> > **URL Query Parameter Auth Token**
> > <br/>Users can specify their Authorization token as a URL query parameter.  This will come as **`auth=:your_token`** on the URL.

```
HTTP 1.1 POST https://yourserver/callback.php?auth=MY_AUTH_TOKEN
```

```xml
Content-Type: application/xml

<ns2:deliveryresponse xmlns:ns2="http://schemas.api.whispir.com">
    <messageid>ABC4857BCCF484575FCA</messageid>
    <location>https://api.whispir.com/messages/ABC4857BCCF484575FCA</location>
    <from>
        <name>Fred Waters</name> 
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri> 
        <mobile>$mobile</mobile> 
        <email>me@example.com</email> 
        <voice>$mobile</voice> 
    </from> 
    <responsemessage> 
        <channel>SMS</channel> 
        <acknowledged>09/01/13 13:22</acknowledged> 
        <content>Yes, I accept. Will I need to bring steel cap boots?</content> 
    </responsemessage> 
</ns2:deliveryresponse>
```

```go
Content-Type: application/json

{
  "messageid" : "ABC4857BCCF484575FCA",
  "location" : "https://api.whispir.com/messages/ABC4857BCCF484575FCA",
  "from" : {
    "name" : "Fred Waters",
    "mri" : "Fred_Waters.528798.Sandbox@Contact.whispir.com",
    "mobile" : "$mobile",
    "email" : "me@example.com",
    "voice" : "$mobile"
  },
  "responseMessage" : {
    "channel" : "SMS",
    "acknowledged" : "09/01/13 13:22",
    "content" : "Yes, I accept. Will I need to bring steel cap boots?"
  }
}
```

Whispir Callbacks have been designed to be simple, yet secure.

In order to make your Callback Server processing much safer, whispir recommends the following security measures:

 - Use SSL on your Callback URL
 - IP Whitelisting for Whispir's IP address
 - Use a unique token

The unique token should be an alphanumeric string generated and assigned specifically for Whispir Callbacks. 

When provided in the callback payload, Whipir will include this in every request made to the listening application. The token's presence ensures and confirms that the request has originated truly from Whispir.

There are two options for the location of this Authorization Token:

####HTTP Header

Using an HTTP Header for authorisation is the preferred approach. This method will use a custom HTTP Header **X-Whispir-Callback-Key**.

This can be added to the callback by specifying the code block:

`"auth" : { "type" : "httpheader", "key" : "MY_AUTH_TOKEN" }`

Every request to the specified URL will include the supplied AUTH Token within this Header.  Alternatively, this could be supplied as a query parameter as follows.

####URL Query Parameter

In this method, the Authorization will be passed to the callback server on the query string using an 'Auth' parameter as follows:

`"auth" : { "type" : "querystring", "key" : "MY_AUTH_TOKEN" }`

### Callback Types

Callbacks can be added to any message that is sent from the Whispir API using the `/messages` endpoint.

Each callback can be invoked from one of two actions occurring:

- A message has been replied to, or
- A message delivery failure occurred (wrong number, or service unavailable)

Users can control which of these actions are delivered to the endpoint using the `callbacks` object when registering new callbacks.

The options that are available are:

- reply: enabled/disabled
- undeliverable: enabled/disabled

When these are enabled, any reply or failed delivery will cause a `GET` request to be invoked on the Callback URL.

## Retrieving Callbacks

> Retrieving Callbacks
> > The following API Methods allow you to access callbacks via the API

```
HTTP 1.1 GET https://api.whispir.com/callbacks?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.api-callback-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <status>1 to 3 of 3</status>
    <ns2:callbacks>
        <ns2:callback>
            <id>BCD374DABC73649B</id>
            <name>Sample Callback 1</name>
            <url>http://myserver.com/callback1.php</url>
            <ns2:link uri="https://api.whispir.com/callbacks/BCD374DABC73649B?apikey=[API_KEY]" rel="self" method="GET"/>
        </ns2:callback>
        <ns2:callback>
            <id>AD34DBCEFD74EABC</id>
            <name>Sample Callback 2</name>
            <url>http://myserver.com/callback2.php</url>
            <ns2:link uri="https://api.whispir.com/callbacks/AD34DBCEFD74EABC?apikey=[API_KEY]" rel="self" method="GET"/>
        </ns2:callback>
        <ns2:callback>
            <id>73BDCEFA43DF35DB</id>
            <name>Sample Callback 3</name>
            <url>http://myserver.com/callback3.php</url>
            <ns2:link uri="https://api.whispir.com/callbacks/73BDCEFA43DF35DB?apikey=[API_KEY]" rel="self" method="GET"/>
        </ns2:callback>
    </ns2:callbacks>
</ns2:return>

```
```go
Accept: application/vnd.whispir.api-callback-v1+json

{
  "status" : "1 to 3 of 3",
  "callbacks" : [ {
    "id" : "BCD374DABC73649B",
    "name" : "Sample Callback 1",
    "url" : "http://myserver.com/callback1.php",
    "link" : [ {
      "uri" : "https://api.whispir.com/callbacks/BCD374DABC73649B?apikey=[API_KEY]",
      "rel" : "self",
      "method" : "GET"
    } ]
  },{
    "id" : "AD34DBCEFD74EABC",
    "name" : "Sample Callback 2",
    "url" : "http://myserver.com/callback2.php",
    "link" : [ {
      "uri" : "https://api.whispir.com/callbacks/AD34DBCEFD74EABC?apikey=[API_KEY]",
      "rel" : "self",
      "method" : "GET"
    } ]
  },{
    "id" : "73BDCEFA43DF35DB",
    "name" : "Sample Callback 3",
    "url" : "http://myserver.com/callback3.php",
    "link" : [ {
      "uri" : "https://api.whispir.com/callbacks/73BDCEFA43DF35DB?apikey=[API_KEY]",
      "rel" : "self",
      "method" : "GET"
    } ]
  }, ],
  "link" : [ ]
}
```

To retrieve a list of callbacks from the Whispir API you can execute an **HTTP GET** using the `/callbacks` endpoint.

You will need to supply one of the following headers (for retrieving JSON or XML):

- Accept: application/vnd.whispir.api-callback-v1+xml
- Accept: application/vnd.whispir.api-callback-v1+json

An array of Callbacks will be returned to you in the HTTP response body.

Each of these Callbacks will provide the following information:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Response Elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">id:</td>
            <td><strong>String</strong><br/>
                The unique ID of the callback within Whispir.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">name:</td>
            <td><strong>String</strong><br/>
                The name given to the Callback at creation time. Also the ID that is used in the `/messages` endpoint.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">url:</td>
            <td><strong>String</strong><br/>
                The applciation URL that was given to the Callback at creation time.  Also the endpoint that will be used when supplying callback information.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">link:</td>
            <td><strong>Array</strong><br/>
                Provides a list of URLs that can be used to manipulate or access the callback.
                <ul>
                  <li>uri - the link to access the specific callback</li>
                  <li>rel - the descriptor for what the link will do</li>
                  <li>method - the HTTP method to use with this particular link</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

## Using Callbacks

> Using Callbacks
> > Callbacks can be added to messages by adding the `callbackId` parameter and the name of the callback as follows:

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```go
Content-Type: application/vnd.whispir.message-v1+json

{
   "to" : "$mobile",
   "subject" : "Test SMS Message",
   "body" : "This is the body of my test SMS message",
   "callbackId" : "Sample Callback 1"
}
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test SMS Message</subject>
    <body>This is the body of my test SMS message</body>
    <callbackId>Sample Callback 1</callbackId>
</ns2:message> 
```

Callbacks can be added to messages by simply specifying the callback name within the request to the `/messages` endpoint. 

Any responses to the above sent message will be forwarded back to the URL within the Callback named `Sample Callback 1`.

## Callback Failures

> Callback Failures
> > Whispir will automatically send notifications to your nominated email address in the event of a failure to access your callback server.

```
Dear Customer,

Your callback <callback_id> failed on <date> with response: <response>.

The callback that failed is as follows:

URL: https://yourserver/callback.php?auth=12345 
Location: https://api.whispir.com/messages/ABC4857BCCF484575FCA 
Name: Fred Waters 
Mobile: $mobile 
Email: me@example.com
Channel: SMS 
Content: Yes, I accept. Will I need to bring steel cap boots? 

Please take the necessary steps to ensure your callback is configured correctly.

If this callback URL continues to fail, Whispir may remove this until the service is resolved. 

Regards, 
Whispir Support

```

In the event the provided callback URL could not be reached or the connection to the service times out, Whispir will automatically generate a notification to the nominated email address with the details of the failed attempt.

Whispir will automatically send an email in the following circumstances:

- If the Callback Server returns anything other than an HTTP 200 OK.
- If the authorization to the Callback Server fails (e.g. returns an HTTP 400 level error) 
- If the Callback Server does not connect within 5 seconds.
- If the Callback Server does not return a response within 60 seconds.
