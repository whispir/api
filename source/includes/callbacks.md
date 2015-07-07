#Callbacks

Whispir utilises API Callbacks to send simple notifications to different registered services in the event that some change has occurred on the Whispir Platform.

## What are Callbacks?

> What are Callbacks?
> > Whispir can notify your application when your SMS, Email or Voice messages receive a reply.
<br/><br/>
> > An example callback that your application or service would receive is specified below.

```xml
HTTP 1.1 POST http://yourserver/callback.php
Content-Type: application/xml

<ns2:deliveryresponse xmlns:ns2="http://schemas.api.whispir.com">
    <messageid>ABC4857BCCF484575FCA</messageid>
    <location>https://api.whispir.com/messages/ABC4857BCCF484575FCA</location>   
    <from>
        <name>Fred Waters</name> 
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri> 
        <mobile>0430984567</mobile> 
        <email>imacros@test.com</email> 
        <voice>0761881564</voice> 
    </from> 
    <responsemessage> 
        <channel>SMS</channel> 
        <acknowledged>09/01/13 13:22</acknowledged> 
        <content>Yes, I accept. Will I need to bring steel cap boots?</content> 
    </responsemessage> 
</ns2:deliveryresponse>
```

```go
HTTP 1.1 POST http://yourserver/callback.php
Content-Type: application/json
{
    "messageId":"ABC4857BCCF484575FCA",
    "location" : "https://api.whispir.com/messages/ABC4857BCCF484575FCA",
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
    }
}
```

Callbacks allow custom applications to register URLs with Whispir that are used for notifications when certain events occur e.g. a response to a message is received, or a message was undeliverable.

<br/><img src="http://developer.whispir.com/files/Whispir_API_diagram.png"/><br/>

Whispir's Callback Service will forward the content of each message response, along with some associated metadata to a URL that the user has pre-registered to receive this information.  

**Note:** Whispir does not check for a response from this callback server.  On setup it is expected that the server will respond to a GET request with a 200 OK.  Any error response sent from this callback server during general use is not considered.  Users should not expect callbacks to be re-tried on error.

## Creating new Callbacks

> Creating new Callbacks
> > The following API calls allow users to create new Callbacks using the Whispir API.

```
HTTP 1.1 POST https://api.whispir.com/callbacks?apikey=<yourkey>
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
````

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
                Object to store the callbacks that should be invoked for this endpoint.  The specific elements of this object are described below. 
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

<ns2:deliveryresponse xmlns:ns2="https://schemas.api.whispir.com">
    <messageid>ABC4857BCCF484575FCA</messageid>
    <location>https://api.whispir.com/messages/ABC4857BCCF484575FCA</location>   
    <from>
        <name>Fred Waters</name> 
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri> 
        <mobile>0430984567</mobile> 
        <email>imacros@test.com</email> 
        <voice>0761881564</voice> 
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

<ns2:deliveryresponse xmlns:ns2="https://schemas.api.whispir.com">
    <messageid>ABC4857BCCF484575FCA</messageid>
    <location>https://api.whispir.com/messages/ABC4857BCCF484575FCA</location>   
    <from>
        <name>Fred Waters</name> 
        <mri>Fred_Waters.528798.Sandbox@Contact.whispir.com</mri> 
        <mobile>0430984567</mobile> 
        <email>imacros@test.com</email> 
        <voice>0761881564</voice> 
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
In order to make your Callback Server processing much safer, whispir recommends the following 

 - Use SSL on your Callback URL
 - IP Whitelisting for Whispir's IP address
 - Use a unique token

The unique token can/should be an alphanumeric/numeric token generated and assigned specifically foWhispir Callback pur rpose. When provided in the callback settings, Whipir shall include this in every request made to the listening application. The token's presence ensures and confirms that the request has originated truly from Whispir.

There are two options for the Authorization Token:

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
- A message delivery failure occurred

Users can control which of these actions are delivered to the endpoint using the `callbacks` object when registering new callbacks.

The options that are available are:

- reply: enabled/disabled
- undeliverable: enabled/disabled

When these are enabled, any reply or failed delivery will cause a `GET` request to be invoked on the URL that was provided.


## Retrieving Callbacks

## Updating Callbacks

## Deleting Callbacks

## Using Callbacks

With the callback server successfully configured, you can now add the ID of it in your message content whenever you are sending any messages. 

The ID is the callback name one has provided while registering the callback URI. Any replies to this message will automatically be forwarded back to the associated server for processing.

The following examples show how you can use your server above to receive responses in JSON.

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+json

{
   "to" : "$mobile",
   "subject" : "Test SMS Message",
   "body" : "This is the body of my test SMS message",
   "callbackId" : "JSON Callback"
}
```
XML responses can also be received by changing the Content-Type to XML as shown below –

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="https://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test SMS Message</subject>    
    <body>This is the body of my test SMS message</body>
    <callbackId>JSON Callback</callbackId>
</ns2:message> 
```

Any responses to the above sent message will be forwarded back to the Callback Server with ID ‘*JSON Callback*' and written to the text file (as shown in the code example above).

### Adding Authentication to your callback






The following code example shows how to use the query parameter for authentication -

```php
<?php
   /*
    * Author: Jordan Walsh
    * Description: Callback Server that supports JSON POSTs and writes the 
    *              content to a file called responses.txt in the same directory.
    * Updates: 
    * 	- Added support for Authentication.
    */        
  
   header("HTTP/1.1 200 OK");

   $text = "";
   $obj = "";
   $query = "";
   $auth = "";
   
   $query = $_SERVER['QUERY_STRING'];
   
   if( "$query" != "" ) {
   
      //GET the auth variable off the query string
      $auth = $_GET["auth"];
      
      if ( "$auth" != "234023490349034" ) {
         writeFile("Authentication failed. Auth = $auth");
      } else {
         //Auth is correct so continue processing
         
         //Get the body of the POST Message (the reply)
         $json = file_get_contents('php://input');
         
         if( $json != false ) {  
            //Decode the JSON object
            $obj = json_decode($json);
           
            //Get the ResponseMessage from the JSON object
            $responseMessage = $obj->{'responseMessage'};
           
            //Get the content of the response
            $text = $responseMessage->{'content'};
           
            //Write the content to a file
            writeFile($text);
         } else {
           writeFile('Request received.  JSON object is empty.');
         }
      }
   } else {
      writeFile('Callback Received.  Querystring not defined.');
   }

   function writeFile($text) {
      file_put_contents("responses.txt", $text, FILE_APPEND);
   }

?>

```

The code checks for the presence of an 'auth' parameter in the URL.  Once this is present and correct, the script will be executed further.  If the auth parameter is not present, or it is incorrect, it shall write the error information to the file and end.

## Callback Failures

Whispir provides a feature as part of the callback offering where in if the provided callback URI could not be reached or if Whispir has faced any issues in reaching / passing the information as expected to provided URI, it can notify about it.

The notification will be done via email and the destination is the email provided to the ‘Notify of errors (email)' during the callback setup.

> Insert image here highlighting the email field

- Whispir will automatically send an email in the following circumstances:
- If the Callback Server returns anything other than an HTTP 200 OK.
- If the authorization to the Callback Server fails (e.g. returns an HTTP 400 level error) 
- If the Callback Server does not connect within 5 seconds.
- If the Callback Server does not return a response within 60 seconds.

In any of these events, Whispir will send an email that resembles the following: - 

```
Dear Customer,  

Your callback <callback_id> failed on <date> with response: <response>.  

The callback that failed is as follows:  

URL: https://yourserver/callback.php?auth=12345 
Location: https://api.whispir.com/messages/ABC4857BCCF484575FCA 
Name: Fred Waters 
Mobile: 0430984567 
Email: imacros@test.com 
Channel: SMS 
Content: Yes, I accept. Will I need to bring steel cap boots? 

Please take the necessary steps to ensure your callback is configured correctly.  

If this callback URL continues to fail, Whispir may remove this until the service is resolved. 

Regards, 
Whispir Support

```

## Enhanced Callbacks

```xml
HTTP 1.1 POST http://myapp.com/statusupdate
Content-Type: application/xml

<ns2:statuscallback xmlns:ns2="http://schemas.api.whispir.com">
    <messageid>ABC4857BCCF484575FCA</messageid> 
    <from>
        <name>John Waters</name> 
        <mri>John_Waters.528798.Sandbox@Contact.whispir.com</mri> 
        <mobile>0430984567</mobile> 
        <email>test@test.com</email> 
        <voice>0761881564</voice> 
    </from> 
    <oldStatus> 
        <status>PEND</status> <!-- PENDING STATUS -->
        <timestamp>09/01/13 13:22</timestamp> 
    </oldStatus>
    <newStatus> 
        <status>SENT</status> <!-- SENT STATUS -->
        <timestamp>09/01/13 13:22</timestamp> 
    </newStatus>  
</ns2:statuscallback>
```

```go
HTTP 1.1 POST http://myapp.com/statusupdate
Content-Type: application/json

{
    "messageId":"ABC4857BCCF484575FCA",
    "location" : "https://api.whispir.com/workspaces/FDD8348CBBED939FCAC/messages/ABC4857BCCF484575FCA",
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
    }
}
```

Whispir currently supports a callback on Message Response.  It is envisaged that Whispir will implement support for the following callbacks:

 - On Message Status Change 
 - On Report Completion

#### Message status change

This callback URL will be triggered whenever the message status changes for each recipient on a message.  

For example, if a user sends a message to two recipients; **John** & **Steve**.  In this message, the user has configured the **Message Status Change** callback URL to be: *http://myapp.com/statusupdate*

In this message, **Steve's** mobile number **is incorrect.**

* Callback 1: Status change from **Pending** to **Sent** for John when the message is sent
* Callback 2: Status change from **Pending** to **Sent** for Steve when the message is sent
* Callback 3: Status change from **Sent** to **Received** for John when the message is received on the handset
* Callback 4: Status change from **Sent** to **Undeliverable** for Steve when the processing of the mobile number fails

If John was to then reply to the message…

* Callback 5: Status change from **Received** to **Acknowleged** for John when the reply is received

**Note:** This may cause a large load on both Whispir and the customer's callback service when large multichannel message sendouts are invoked, as such, the technical implementation details of this callback service are under review.

#### Report Completion

This callback URL will be triggered whenever a report scheduled through the API has completed the generation process.

For example, when a user creates a report that may take some time to generate (i.e. contains years of data), this callback can be utilised to advise an application that the report is ready to be downloaded. 

In this message, the user has configured the **Report Completion** callback URL to be: *http://myapp.com/reportcompletion*

**Callback Structure in XML**
The structure of the on ‘Report Completion' callback will be as follows:

```
HTTP 1.1 POST http://myapp.com/reportcompletion
Content-Type: application/xml

<ns2:reportcompletion xmlns:ns2="http://schemas.api.whispir.com">
    <reportid>ABC4857BCCF484575FCA</reportid>
    <outputLocation>http://203.116.705.600/reports</outputLocation>
    <timestamp>09/01/13 13:22</timestamp>
</ns2:reportcompletion>
```

### Sending custom parameters in callback response
The callback API also provides a way to pass in customparameters which can be returned as is via the callback response.

To explain in simple scenario driven terms –

- App sends a POST /messages request to Whispir for sending a message to the Customer
- App gets a location, messageID over a 202
- Whispir Queues the request and executes it at the next execution cycle (usually immediate)
- Customer receives the message and responds to it
- Whispir receives the message and pushes the response to App via the callback URI
- App needs to identify who is the customer that has responded
- App uses the messageID provided earlier (in step 2) to cross check and identify

As evident in the scenario, messageID plays a key role in identifying the message – response chain. Rather than using the Whispir provided messageID, the App can send in its own customparameters like customerID or a unique hash that corresponds to a specific transaction, or just about anything that can be a unique value in the perspective of the App. 

Whispir shall take note of these customparameters, and when the response is returned via the callback URI, these parameters are also added to the payload. 

This makes it easy for the App to identify the user data from the single / multiple / follow-on response of a conversation.

```
HTTP 1.1 POST /messages
Content-Type: application/vnd.whispir.message-v1+json
{
   "to" : "0423556682",
   "subject" : "Test SMS",
   "body" : "This is the SMS",
   "callbackId" : "This is my callback",
   **"callbackParameters" : {**
      **"CustomID" : "890h0ef0fe09efw90e0jsdj0"**
   **}**
}

```

The data is provided via the ‘callbackParameters' param and it is an array format with each data unit set in a name, value pair.
If there are more than one set of values, the data shall be sent in the following way –

```
HTTP 1.1 POST /messages
Content-Type: application/vnd.whispir.message-v1+json

{
   "to" : "0423556682",
   "subject" : "Test SMS",
   "body" : "This is the SMS",
   "callbackId" : "This is my callback",
   **"callbackParameters" : {
      "CustomID" : "890h0ef0fe09efw90e0jsdj0",
      "CustomID2" : "9ef0fe09efw90e0jsdjsd43fw"
   }**
}

```

In the `Response`, The callback shall include these passed params. Below is an example response –

```
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
    **"customParamters" : [{
        "CustomID" : "890h0ef0fe09efw90e0jsdj0",
        "CustomID2" : "9ef0fe09efw90e0jsdjsd43fw"
    }]**
}
```

*Note*: 
- The calling App can supply any number of custom parameters.
- The information will be passed back to the application every time a response is triggered.
- The response type will always be string, even when an integer is used.
- If no custom parameters are specified, this section will not be included in the callback JSON or XML (backwards compatibility)


### Additional Information

Reach to us directly at out [contact page](https://whispir.io/contact/) for more help/information on this part.