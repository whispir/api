#Callbacks

Whispir utilises API Callbacks to send simple notifications to different registered services in the event that some change has occurred on the Whispir Platform.

## What is a callback?

> Whispir can notify your application when your SMS, Email or Voice messages receive a reply.

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

Callbacks or Webhooks allow custom applications to register URLs with service providers that are used for notifications when certain events occur e.g. a new contact is created, or a response to a message is received.

Applications can make use of Whispir's Callbacks to reduce the heavy lifting required within their applications by reducing the need to poll different Whispir services to check for changes or updates.

Firstly it might be easier to describe the flow of a message from the Whispir API.

- The user requests the API to send out a message to a group of recipients
- Whispir receives this message request, and adds it to a queue to be processed 
- Whispir then responds to the user with an HTTP 202 Accepted (e.g. I've got the message, I'll be sure to process that in just a bit)

   In this response, Whispir also provides the user with a Message ID reference that can be used to look up this message and query some more information.

   Next, what happens is Whispir sends out the message to the intended recipients.  This happens nearly instantly, but it is important to know that it is a queued and asynchronous process.

- After the message has been sent out, the recipients of the message will begin sending in replies.

   These replies are automatically stored in Whispir, and notifications are sent out to the User who initiated the message.

   But what if we want these replies to come back to an **application** that we have developed?  This is where **callbacks** are useful.

<br/><img src="http://developer.whispir.com/files/Whispir_API_diagram.png"/><br/>

Whispir's Message Response Callback will forward the content of each message response, along with some associated metadata to a URL that the user has pre-registered to receive this information.  

Each message response to a sent message will cause this URL to be invoked and the information sent.  This process allows applications to automatically be notified about the responses to messages that they are sending, without the need to poll!

**Note:** Whispir does not check for a response from this callback server.  On setup it is expected that the server will respond to a GET request with a 200 OK.  Any error response sent from this callback server during general use is not considered.  Users should not expect callbacks to be retried on error.


### Configuring Whispir to use your callback server

Whispir has to be configured to ensure that the received replies are routed to a proper endpoint on your application server. This is a very important step and must be performed before one can send any messages and have the subsequent responses routed.

From your web browser browse to https://www.whispir.com.  Click on the Sign-In button at the top right of the screen, and log into Whispir using your credentials.

Browse to 'Admin -> Company Settings -> API -> Register a Callback URL'.
This page shall show the form/options needed to register and also edit a callback url.

> Insert Image here

The fields with ** * ** are mandatory. In this form you need to provide the following information;

 - A unique name for your callback. This name will be referenced in your API message requests as ‘callbackId' parameter.
 - The Destination URL to your server e.g. https://myserver.mycompany.com/whispir/callback.php (this must be publicly accessible – reachable from wider internet)
 - If you have an authorization required to access the url you can add this here (details will be discussed in section 3.4.6 below)
 - The type of authorization you want to set up (Query String, or HTTP Header)
 - The Content Type to be POSTed to your application (XML or JSON).
 - A valid and operational email address to notify of any callback failures.

Click **[Test URL]** to ensure your URL is valid, then click Add to store this in Whispir.

> Insert Image here

You should be able to see ‘Success' next to the [Test URL] if all the settings are okay. 

### Using a callback ID in your API message

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

Whispir Callbacks have been designed to be simple, yet secure.  
In order to make your Callback Server processing much safer, whispir recommends the following 

 - Use a SSL backed callback URL
 - IP Whitelisting on firewall for Whispir IP address
 - Use a unique token

Make sure your callback URI has a SSL certificate associated with it. This ensures the integrity of data from middle-man-attacks and also brings other encryption benefits.

As every application server these days run behind a firewall, we recommend to whitelist the Whispir IP address (shall be provided separately) and allow HTTP POST request traffic.

The unique token can/should be an alphanumeric/numeric token generated and assigned specifically for Whispir Callback purpose. When provided in the callback settings, Whipir shall include this in every request made to the listening application. The token's presence ensures and confirms that the request has originated truly from Whispir.

First, you'll need to edit your Callback URL configuration within the Whispir Platform to begin sending this new parameter.

Browse to 'Admin -> Company Settings -> API -> Register a Callback URL'.  

In this screen you can enter your desired Authentication Key/Token in the Auth Parameter field provided.

> Insert Image here

As a user, you have two ways to implement this security token to achieve authorization. 
 
 - HTTP Header using custom X-Whispir-Callback-Key
 - Query Parameter with name as auth

As shown in the figure above, the Authorization Type setting helps you with the ways. The default value is “HTTP header”

####HTTP Header

Using an HTTP Header for authorisation is the preferred approach. This method will use a custom HTTP Header X-Whispir-Callback-Key:

```
HTTP 1.1 POST https://yourserver/callback.php
Content-Type: application/xml
X-Whispir-Callback-Key: 234023490349034 

<ns2:deliveryresponse xmlns:ns2="https://schemas.api.whispir.com">
    <messageid>ABC4857BCCF484575FCA</messageid>
    <location>https://api.whispir.com/workspaces/FDD8348CBBED939FCAC/messages/ABC4857BCCF484575FCA</location>   
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

####Query Parameter
In this method, the Authorization will be passed to the callback server on the query string using an 'Auth' parameter as follows:

```
HTTP 1.1 POST https://yourserver/callback.php?auth=234023490349034
Content-Type: application/xml

<ns2:deliveryresponse xmlns:ns2="https://schemas.api.whispir.com">
    <messageid>ABC4857BCCF484575FCA</messageid>
    <location>https://api.whispir.com/workspaces/FDD8348CBBED939FCAC/messages/ABC4857BCCF484575FCA</location>   
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
It is the responsibility of the receiving script to parse this query string parameter and check against the internal application. 

This method should only be used over HTTPS with other means of Auth including IP whitelisting as it is susceptible to packet sniffing and man-in-the-middle attacks.

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

### Getting notified of callback failures

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

###Enhanced Callbacks

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