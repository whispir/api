#Callbacks

Whispir utilises API Callbacks to send simple notifications to different registered services in the event that some change has occurred on the Whispir Platform. Callback in Whispir is akin to Web Hooks. The benefits of callback are -

* Whispir will instantly notify your callback server when there is change occured in Whispir platform.
* You save on your daily API call limits by NOT having to call the /messageresponses or /messagestatus endpoints.
* Response based workflows can be built quickly and effectively.

*Callback word is termed to make understand the point that Whispir will call you back on your callback server.*

So, it is you who creates an endpoint (a page in your application) that Whispir shall callback upon an event happening. That endpoint can simply be your existing application (as mentioned earlier) or another application that needs/processes the response information.

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

<ns2:deliveryResponse xmlns:ns2="http://schemas.api.whispir.com">
    <messageId>ABC4857BCCF484575FCA</messageId>
    <messageLocation>https://api.whispir.com/messages/ABC4857BCCF484575FCA</messageLocation>
    <from>
        <name>Fred Waters</name>
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri>
        <mobile>$mobile</mobile>
        <email>me@example.com</email>
        <voice>$mobile</voice>
    </from>
    <responseMessage>
        <channel>SMS</channel>
        <acknowledged>09/01/13 13:22</acknowledged>
        <content>Yes, I accept. Will I need to bring steel cap boots?</content>
    </responseMessage>
</ns2:deliveryResponse>
```

```go
Content-Type: application/json
{
    "messageId":"ABC4857BCCF484575FCA",
    "messageLocation" : "https://api.whispir.com/messages/ABC4857BCCF484575FCA",
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

1. Always use a domain name for the callback. Do NOT use an IP.
2. Ensure that your callback server is reachable on the internet. It should not be `localhost` or an intranet only application that cannot be reached from the WWW.
3. Limit the port to 80 or 443. Do no use any other ports.
4. Depending on the type chosen 'json' or 'xml' for the Content-Type, whispir would make a similar GET (and subsequently POST) calls. So, please ensure that your your web server is configured to handle such MIME type.
5. Most importantly, if your application infrastructure is behind a firewall, then make sure that the firewall allows an incoming POST request.

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

*Note:*

1. The callback server must be expecting and accepting both GET and POST requests.
2. During the callback creation, Whispir shall make a GET request to ensure the callback URL provided is valid. The responseCode for this request should be `200`. Any other code is considered a failure and the callback creation will fail.
3. This is the only time a GET request is made. Subsequent requests (callbacks) will all be POST requests.

### Callback Authorization

> Callback Authorization
> > Callback Servers should validate that the inbound request they are receiving is actually coming from Whispir.<br/><br/>

> > **HTTP Header Auth Token**
> > <br/>Users can specify their Authorization token as an HTTP Header. Whispir will add the **X-Whispir-Callback-Key** Header to the request.

> > Below is an example of callback made by Whispir. The example shows the response object format that will be sent to your callback server.

```
HTTP 1.1 POST https://yourserver/callback.php
X-Whispir-Callback-Key: MY_AUTH_TOKEN
```

```xml
Content-Type: application/xml

<ns2:deliveryResponse xmlns:ns2="http://schemas.api.whispir.com">
    <messageId>ABC4857BCCF484575FCA</messageId>
    <messageLocation>https://api.whispir.com/messages/ABC4857BCCF484575FCA</messageLocation>
    <from>
        <name>Fred Waters</name>
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri>
        <mobile>$mobile</mobile>
        <email>me@example.com</email>
        <voice>$mobile</voice>
    </from>
    <responseMessage>
        <channel>SMS</channel>
        <acknowledged>09/01/13 13:22</acknowledged>
        <content>Yes, I accept. Will I need to bring steel cap boots?</content>
    </responseMessage>
</ns2:deliveryResponse>
```

```go
Content-Type: application/json

{
  "messageid" : "ABC4857BCCF484575FCA",
  "messagelocation" : "https://api.whispir.com/messages/ABC4857BCCF484575FCA",
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

<ns2:deliveryResponse xmlns:ns2="http://schemas.api.whispir.com">
    <messageId>ABC4857BCCF484575FCA</messageId>
    <messageLocation>https://api.whispir.com/messages/ABC4857BCCF484575FCA</messageLocation>
    <from>
        <name>Fred Waters</name>
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri>
        <mobile>$mobile</mobile>
        <email>me@example.com</email>
        <voice>$mobile</voice>
    </from>
    <responseMessage>
        <channel>SMS</channel>
        <acknowledged>09/01/13 13:22</acknowledged>
        <content>Yes, I accept. Will I need to bring steel cap boots?</content>
    </responseMessage>
</ns2:deliveryResponse>
```

```go
Content-Type: application/json

{
  "messageId" : "ABC4857BCCF484575FCA",
  "messageLocation" : "https://api.whispir.com/messages/ABC4857BCCF484575FCA",
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
 - Use an unique token

The unique token should be an alphanumeric string generated and assigned specifically for Whispir Callbacks.

When provided in the callback payload, Whipir will include this in every request made to the listening application. The token's presence ensures and confirms that the request has originated truly from Whispir.

There are two options for the location of this Authorization Token:

#### HTTP Header

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

## Callback Parameters

> callback parameters in callback response

> > a single callback parameter

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```go
Content-Type: application/vnd.whispir.message-v1+json
{
   "to" : "$mobile",
   "subject" : "Test SMS",
   "body" : "This is the SMS",
   "callbackId" : "Sample Callback 1",
   "callbackParameters" : {
      "CustomID" : "890h0ef0fe09efw90e0jsdj0"
   }
}

```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test SMS</subject>
    <body>This is the SMS</body>
    <callbackId>Sample Callback 1</callbackId>
    <callbackParameters>
      <entry>
        <key>CustomId</key>
        <value>890h0ef0fe09efw90e0jsdj0</value>
      </entry>
    </callbackParameters>
</ns2:message>
```

> > multiple callback parameters

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```go
Content-Type: application/vnd.whispir.message-v1+json

{
   "to" : "$mobile",
   "subject" : "Test SMS",
   "body" : "This is the SMS",
   "callbackId" : "This is my callback",
   "callbackParameters" : {
      "CustomID" : "890h0ef0fe09efw90e0jsdj0",
      "CustomID2" : "9ef0fe09efw90e0jsdjsd43fw"
   }
}

```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test SMS</subject>
    <body>This is the SMS</body>
    <callbackId>Sample Callback 1</callbackId>
    <callbackParameters>
      <entry>
        <key>CustomId</key>
        <value>890h0ef0fe09efw90e0jsdj0</value>
      </entry>
      <entry>
        <key>CustomId2</key>
        <value>9ef0fe09efw90e0jsdjsd43fw</value>
      </entry>
    </callbackParameters>
</ns2:message>
```

The callback API allows you to pass in any values (parameters), which you want to be returned as is - included in the callback response.

To explain this in a simple scenario driven terms;

- App sends a POST /messages request to Whispir for sending a message to the Customer
- App gets a location, messageID with responseCode as `202`. Means the message is received by Whispir successfully.
- Whispir Queues the request and executes it at the next execution cycle (usually immediate)

then

- Customer receives the message and responds to it
- Whispir receives the message and pushes the response to App via the callback URI

then

- App needs to identify who is the customer that has responded
- App uses the messageID provided earlier (in step 2) to cross check and identify

As evident in the scenario, messageID plays a key role in identifying the message – response chain.

However, rather than using just the Whispir provided messageID, the App can send in its own free-will callback parameters like

 - customerID or
 - an unique hash that corresponds to a specific transaction, or
 - just about anything that can be a unique value in the perspective of your App.

Whispir shall take note of these callback parameters, and when the response is returned via the callback URI, these parameters are included into the payload and sent as `callbackParameters` which is an object. This makes it easy for the App to identify the user data from the single / multiple / follow-on response of a conversation.

The data provided via the ‘callbackParameters' is set as:
 - in JSON as

`{ Key : Value }`

 - in XML as

 `
<entry>
  <key>
  <value>
</entry>
 `

If there are more than one set of values, the data shall be set as:

 - in JSON as

`{ Key : Value }, { Key : Value }`

 - in XML as

 `
<entry>
  <key>
  <value>
</entry>
`
`
<entry>
  <key>
  <value>
</entry>
 `

### Receiving them in Response


```go
HTTP 1.1 POST https://yourserver/callback.php
Content-Type: application/json

{
    "messageId":"ABC4857BCCF4CA",
    "location" : "https://api.whispir.com/messages/ABC4857BCCF4CA",
    "from":{
          "name":"Fred Waters",
          "mri":"Fred_Waters.528798.Sandbox@Contact.whispir.com",
          "mobile":"0430984567",
          "email":"imacros@test.com",
          "voice":"0761881564"
         },
    "responseMessage":{
           "channel":"SMS",
           "acknowledged":"09/01/13 13:22",
           "content":"Yes, I accept. Will I need to bring steel cap boots?"
    },
    "customParameters" : {
        "CustomerId" : "890h0ef0fe09efw90e0jsdj0",
        "TransactionId" : "9ef0fe09efw90e0jsdjsd43fw",
        ...
    }
}
```

```xml
Content-Type: application/xml

<ns2:deliveryResponse xmlns:ns2="http://schemas.api.whispir.com">
    <messageId>ABC4857BCCF484575FCA</messageId>
    <messageLocation>https://api.whispir.com/messages/ABC4857BCCF484575FCA</messageLocation>
    <from>
        <name>Fred Waters</name>
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri>
        <mobile>$mobile</mobile>
        <email>me@example.com</email>
        <voice>$mobile</voice>
    </from>
    <responseMessage>
        <channel>SMS</channel>
        <acknowledged>09/01/13 13:22</acknowledged>
        <content>Yes, I accept. Will I need to bring steel cap boots?</content>
    </responseMessage>
    <customParameters>
      <entry>
        <key>CustomerId</key>
        <value>890h0ef0fe09efw90e0jsdj0</value>
      </entry>
      <entry>
        <key>TransactionId</key>
        <value>9ef0fe09efw90e0jsdjsd43fw</value>
      </entry>
      ...
    </customParameters>
</ns2:deliveryResponse>
```

When the callback is invoked for a reply/delivery failure, the callbackParameters passed are sent in the response call to your callback server.

An important point to note is that - these values shall be part of `customParameters` object. The response does not contain the `callbackParameters` object. The naming convention could be a bit confusing at times, but the naming convention is kept from logical premise.

 - You are passing in parameters that are custom to a specific message in the /messages call. The parameters are sent included in the callback object. So, you include them in the callbackParameters at source and when you receive them, you get them as `customParameters`. the way they are intended. `while(1) { read again; }` :)

*Note*:

- The calling App can supply any number of callback parameters.
- The information will be passed back to the application every time a response is triggered.
- The response type will always be string, even when an integer is used.
- Apart from the callback parameters specified in the /messages request, the API also gives other set of values, that are used to process it.


## Custom Parameters

Custom Parameters are different from callbackParameters. To make it clear again -

- callbackParameters is used by you in /messages endpoint to pass in any custom values that you need to receive back in the callback reponse
- customParameters in used by Whispir in the callback response to pass back the callbackParameters (and other values) that you have passed in earlier

This is important, so you may read that again or have a coffee and read that again. I needed a chocolate to get that going. ;)

Custom Parameters are included in the response object of a callback POST that Whispir makes to your server. These parameters contain important information about

- the dynamically processed values that whispir used to fulfill your request (the sender, receiver channels, timestamps, and destination email address or phone number)
- the message response rule, and condition that was applied to the response (refer to [Matched Rules](/#matched-rule))
- the callbackParameters (refer to [Callback Parameters](/#callback-parameters))

In Detail -

- **the dynamically processed values that whispir used to fulfill your request**

Whispir allows [bulk messaging or dynamic messaging](https://whispir.github.io/api/#dynamic-messages) via the /resources and /messages endpoint. When you use that, you would need to know the processed values that are used by Whispir to replace the @@placeholders@@ used in that specific message template against each row of your csv, json, xml data.

To facilitate that Whispir gives those values in the callback response under customParameters. The list of custom Parameters provided by Whispir are -

```go
"customParameters": {
  "sender_full_name": "John Wick",
  "sender_first_name": "John",
  "sender_last_name": "Wick",
  "sender_sms": "614235552323",
  "sender_email": "JohnWick@example.com",
  "recipient_full_name": "John Wick",
  "recipient_first_name": "John",
  "recipient_last_name": "Wick",
  "recipient_sms": "6593556682",
  "recipient_email": "jWick@whispir.com",
  "recipient_voice": "6593556682",
  "date": "2016-03-04",
  "time": "10:36",
  "yyyy": "2016",
  "month": "March",
  "day": "Friday",
  "yy": "16",
  "mm": "03",
  "dd": "04",
  "hrs": "10",
  "min": "36",
  "sec": "01",
  "matchedCategory": "Reserved",
  "responseRule": "Reserved Words",
  "first_name": "John",
  "last_name": "Wick"
}

```

```xml
<customParameters>
    <entry>
      <key>sender_full_name</key>
      <value>John Wick</value>
    </entry>
    <entry>
      <key>sender_first_name</key>
      <value>John</value>
    </entry>
    <entry>
      <key>sender_last_name</key>
      <value>Wick</value>
    </entry>
    <entry>
      <key>sender_sms</key>
      <value>614235552323</value>
    </entry>
    <entry>
      <key>sender_email</key>
      <value>JohnWick@example.com</value>
    </entry>
    <entry>
      <key>recipient_full_name</key>
      <value>John Wick</value>
    </entry>
    <entry>
      <key>recipient_first_name</key>
      <value>John</value>
    </entry>
    <entry>
      <key>recipient_last_name</key>
      <value>Wick</value>
    </entry>
    <entry>
      <key>recipient_sms</key>
      <value>6593556682</value>
    </entry>
    <entry>
      <key>recipient_email</key>
      <value>jWick@whispir.com</value>
    </entry>
    <entry>
      <key>recipient_voice</key>
      <value>6593556682</value>
    </entry>
    <entry>
      <key>date</key>
      <value>2016-03-04</value>
    </entry>
    <entry>
      <key>time</key>
      <value>10:36</value>
    </entry>
    <entry>
      <key>yyyy</key>
      <value>2016</value>
    </entry>
    <entry>
      <key>month</key>
      <value>March</value>
    </entry>
    <entry>
      <key>day</key>
      <value>Friday</value>
    </entry>
    <entry>
      <key>yy</key>
      <value>16</value>
    </entry>
    <entry>
      <key>mm</key>
      <value>03</value>
    </entry>
    <entry>
      <key>dd</key>
      <value>04</value>
    </entry>
    <entry>
      <key>hrs</key>
      <value>10</value>
    </entry>
    <entry>
      <key>min</key>
      <value>36</value>
    </entry>
    <entry>
      <key>sec</key>
      <value>01</value>
    </entry>
    <entry>
      <key>matchedCategory</key>
      <value>Reserved</value>
    </entry>
    <entry>
      <key>responseRule</key>
      <value>Reserved Words</value>
    </entry>
    <entry>
      <key>first_name</key>
      <value>John</value>
    </entry>
    <entry>
      <key>last_name</key>
      <value>Wick</value>
    </entry>
</customParameters>
```


<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Custom Parameters</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">sender_full_name:</td>
      <td><strong>String</strong><br/>
        Specifies the full name of the sender. This is the name of the user account that was used to make the API call.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">sender_first_name:</td>
      <td><strong>String</strong><br/>
      Specifies the first name of the sender account.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">sender_last_name:</td>
      <td><strong>String</strong><br/>
      Specifies the last name of the sender account.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">sender_sms:</td>
      <td><strong>String</strong><br/>
      Specifies the phone number of the sender account.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">sender_email:</td>
      <td><strong>String</strong><br/>
        Specifies the email address of the sender. This is email address of the user account that was used to make the API call.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">recipient_full_name:</td>
      <td><strong>String</strong><br/>
        Specifies the full name of the recipient. If only the recipient is already a contact/user in the Whispir Platform under your account.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">recipient_first_name:</td>
      <td><strong>String</strong><br/>
      Specifies the first name of the recipient account. If only the recipient is already a contact/user in the Whispir Platform under your account.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">recipient_last_name:</td>
      <td><strong>String</strong><br/>
      Specifies the last name of the recipient account. If only the recipient is already a contact/user in the Whispir Platform under your account.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">recipient_sms:</td>
      <td><strong>String</strong><br/>
      Specifies the phone number of the recipient. If only the channel is SMS or the recipient is already a contact/user in the Whispir Platform under your account.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">recipient_email:</td>
      <td><strong>String</strong><br/>
        Specifies the email address of the recipient. If only the channel is EMAIL or the recipient is already a contact/user in the Whispir Platform under your account
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">recipient_voice:</td>
      <td><strong>String</strong><br/>
        Specifies the phone number of the recipient. If only the channel is SMS/Voice or the recipient is already a contact/user in the Whispir Platform under your account
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">date:</td>
      <td><strong>String</strong><br/>
        Specifies the date value in YYYY-MM-DD format. <br><br>  Ex. 2016-03-04.<br><br>   This is the date when the message was sent. This helps to know the sent date when the message is a <a href="/#schedule-delivery">SCHEDULED</a> message
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">time:</td>
      <td><strong>String</strong><br/>
        Specifies the time value in HH:MI format. <br> <br>  Ex. 10:36. <br><br>  This is the time when the message was sent. This helps to know the sent time when the message is a <a href="/#schedule-delivery">SCHEDULED</a> message
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">Individual broken-down values for Date and Time:</td>
      <td><strong>String</strong><br/>
        Apart from the date and time values above, the API also provides broken down values for use. <br><br>
        <ul>
          <li>yyyy - year (in 4 digit format) <b>Eg.</b> 2016</li>
          <li>month - month (in full month name format) <b>Eg.</b> March</li>
          <li>day - day (in full week day format) <b>Eg.</b> Tuesday</li>
        </ul>
        <br>
        <ul>
          <li>yy - year (in 2 digit format) <b>Eg.</b> 16</li>
          <li>mm - month <b>Eg.</b> 03</li>
          <li>dd - date <b>Eg.</b> 08</li>
        </ul>
        <ul>
          <li>hrs - hours <b>Eg.</b> 16</li>
          <li>min - minutes <b>Eg.</b> 39</li>
          <li>sec - seconds <b>Eg.</b> 50</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


- ****
## Example Flow

Imagine a workflow where the same user gets more than 1 message in a quick time frame, how does whispir know "to which message did this user respond to ?".

Explanation -


 - For communications sent via Email, or web, Whispir has a clear 1:1 relationship, ensuring each outbound communication is unique, with any reply to that communication (regardless of the order of response, or length of time between message send and response) be threaded against the original outbound message.

 - For communications sent via SMS, things get slightly more complex.  Whispir uses a pool of mobile numbers, with Whispir retaining knowledge as to which recipient SMS was sent which message via whispir pool number.  This provides Whispir the ability to know which reply from which recipient is for which initial outbound message – it’s pretty clever. The only challenge is where you have very high volumes of messages being issued to the same recipient (e.g. a new sms sent to the same number every 5 minutes), and the list of pool numbers is exhausted with Whispir needing to re-use pool numbers.  This is a highly unlikely communication use case, but a principal which needs to be understood.

```
{
	"to": "$mobile",
	"subject": "Whispir",
	"body": "Hello there. Reply Y",
	"callbackId": "callbackA"
}

{
	"to": "$mobile",
	"subject": "Whispir",
	"body": "Goodbye. Reply Y",
	"callbackId": "callbackB"
}
```

### Scenario 1:

Assuming in a span of 10 seconds, these 2 SMSes were sent

If user $mobile replies “Y”, which callbackId would be called ?

 - Two separate messages are sent to the same mobile number, with the both including a callbackid.
 - Each message will have been received by the recipient via two different sender numbers.
 - Assuming the recipient responds to the first message they received, Whispir will trigger the callback ‘callbackA’.
 - If they respond to the second message they received, Whispir will trigger the callback ‘callbackB’


### Scenario 2:

> > SMS sent:

```
{
	"to": "$mobile",
	"subject": "Whispir",
	"body": "Hello there. Reply Y",
	"callbackId": "callbackA"
}
```
> > Another SMS sent half hour later (#scenario 2):

```
{
	"to": "$mobile",
	"subject": "Whispir",
	"body": "Goodbye. Reply Y",
	"callbackId": "callbackB"
}
```

If user $mobile replies “Y”, which callbackId would be called?

 - Two separate messages are sent to the same mobile number with a gap of 30 mins, with the both including a callbackid.
 - Each message will have been received by the recipient via two different sender numbers.
 - Assuming the recipient responds to the first message they received, Whispir will trigger the callback ‘callbackA’.
 - If they respond to the second message they received, Whispir will trigger the callback ‘callbackB’


### Scenario 3:

> > SMS sent (#scenario 3):

```
{
	"to": "$mobile",
	"subject": "Whispir",
	"body": "Hello there. Reply Y",
	"callbackId": "callbackA"
}
```

User $mobile replies “Y” half hour later, would the callbackId still be relevant?

 - Assuming this was the only message sent to the recipient in the 30 minutes, the response will trigger the callback ‘callbackA’

How about 1 hour, 2 hours later?

 - The duration between when the message is sent, and the reply received has no significance.
 - The challenge in matching outbound messages and their inbound responses is only relevant when the entire pool of numbers (which continues to grow) is exhausted.
 - Recipients can respond days (max 7) after the message send out occurred and Whispir will still track the correct message that the reply is relevant to.
