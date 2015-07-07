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