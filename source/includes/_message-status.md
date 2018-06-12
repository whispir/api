#Message Status

> API Endpoint

> > The following calls describe how to access message status information from within your message resource

```xml
<!-- From the default workspace -->

https://api.whispir.com/messages/{:messageId}/messagestatus/?apikey=<your_api_key>
Accept: application/vnd.whispir.messagestatus-v1+xml
```

```go
//From the default workspace

https://api.whispir.com/messages/{:messageId}/messagestatus/?apikey=<your_api_key>
Accept: application/vnd.whispir.messagestatus-v1+json
```

```xml
<!-- or from a defined workspace -->

https://api.whispir.com/workspaces/{:id}/messages/{:messageId}/messagestatus/?apikey=<your_api_key>
Accept: application/vnd.whispir.messagestatus-v1+xml
```

```go
//or from a defined workspace

https://api.whispir.com/workspaces/{:id}/messages/{:messageId}/messagestatus/?apikey=<your_api_key>
Accept: application/vnd.whispir.messagestatus-v1+json
```

> > The following resource types are supported for messages status

```
- application/vnd.whispir.messagestatus-v1+xml
- application/vnd.whispir.messagestatus-v1+json
```

> > The following methods are supported for the message status endpoint

```
- GET
```

Whispir will automatically monitor the status of each message after it has been sent to each recipient.  Using the message status information, you are able to determine who received the message, what exact time they received it, on what message channel (SMS, Email, Voice, Web, Push Notification), whether they replied to the message, what time they replied, and on what messaging channel.

Each message progresses through various states, from Pending to Acknowledged.

![](https://developer.whispir.com/files/MessageStatus.png)

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Message Status Descriptions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">Pending (PENDING):</td>
            <td>
                The message has not yet been processed by Whispir.  It is in a queue and will be processed shortly.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Sent (SENT):</td>
            <td>
                The message has been sent from Whispir to the recipient, however, there has been no acknowledgement from the recipient via read receipt that the message has arrived.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Received (DELIVRD):</td>
            <td><strong>Email:</strong> Whispir has received acknowledgement via a read receipt that the message has arrived in the inbox.
            <br/><br/>
			<strong>SMS:</strong> Received status can mean one of two things for SMS.

			<ol>
				<li>The message has been received by the network and is being processed for delivery to the handset.<br/><br/>How long the message stays in this state is up to the telco.<br/><br/></li>
				<li>The message has been received by the handset and confirmed by the telco.</li>
			</ol>

            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Acknowledged (READ):</td>
            <td>
               Whispir has received an intended response from the recipient, either by reply SMS, Email or Voice prompt
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Undeliverable (FAILED):</td>
            <td>
               Whispir was not able to deliver the message to the intended recipient on the specified channel.  This may be due to incorrect information e.g. wrong phone number or email address, or due to poor network coverage.
            </td>
        </tr>
    </tbody>
</table>

Using the API, developers are able to access this status information at either a **Summary** or **Detailed** level.

The first thing a developer must do in order to retrieve the status of a sent message is retrieve the message using the API.

## Retrieve a Message

> Retrieve a message
> > Use the API to retrieve a sent Message 

```
HTTP 1.1 GET https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
 <to>$mobile</to>
 <subject>test subject</subject>
 <body>test body</body>
 <voice/>
 <from></from>
 <direction>OUTGOING</direction>
 <responseCount>0</responseCount>
 <social/>
 <createdTime>2012-09-24T15:36:16+10:00</createdTime>
 <ns3:link method="GET" 
   rel="self" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B?apikey=498nadsasdff09fewdsafjaa90f"/>
 <ns3:link method="GET" 
   rel="summaryStatus" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=summary&apikey=498nadsasdff09fewdsafjaa90f"/>
 <ns3:link method="GET" 
   rel="detailedStatus" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=detailed&apikey=498nadsasdff09fewdsafjaa90f"/>
 <ns3:link method="GET" 
   rel="summaryResponses" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=summary&filter=default&apikey=498nadsasdff09fewdsafjaa90f"/>
 <ns3:link method="GET" 
   rel="detailedResponses" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=detailed&filter=default&apikey=498nadsasdff09fewdsafjaa90f"/>
 <ns3:link method="GET" 
   rel="summaryResponsesWithResponseRule" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=summary&filter=responserule&apikey=498nadsasdff09fewdsafjaa90f"/>
 <ns3:link method="GET" 
   rel="detailedResponsesWithResponseRule" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=detailed&filter=responserule&apikey=498nadsasdff09fewdsafjaa90f"/>
</ns2:message>
```
```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to": "$mobile",
    "subject": "test subject",
    "body": "test body",
    "direction": "OUTGOING",
    "responseCount": "0",
    "createdTime": "1460070991",
    "link": [{
      "method": "GET",
      "rel": "self",
      "uri": "https://api.whispir.com/messages/069BF68E5E0FE99B?apikey=498nadsasdff09fewdsafjaa90f"
    },{
      "method": "GET",
      "rel": "summaryStatus",
      "uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=summary&apikey=498nadsasdff09fewdsafjaa90f"
    },{
      "method": "GET",
      "rel": "detailedStatus",
      "uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=detailed&apikey=498nadsasdff09fewdsafjaa90f"
    },{
      "method": "GET",
      "rel": "summaryResponses",
      "uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=summary&filter=default&apikey=498nadsasdff09fewdsafjaa90f"
    },{
      "method": "GET",
      "rel": "detailedResponses",
      "uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=detailed&filter=default&apikey=498nadsasdff09fewdsafjaa90f"
    },{
      "method": "GET",
      "rel": "summaryResponsesWithResponseRule",
      "uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=summary&filter=responserule&apikey=498nadsasdff09fewdsafjaa90f"
    },{
      "method": "GET",
      "rel": "detailedResponsesWithResponseRule",
      "uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=detailed&filter=responserule&apikey=498nadsasdff09fewdsafjaa90f"
    }]
}
```

The example request below returns the Message that the API user requested.  

`GET /messages/069BF68E5E0FE99B?apikey=498nadsasdff09fewdsafjaa90f`

Each of the URLs specified in the response can be accessed using the REL and appropriate METHOD to perform the specified functionality.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Rel Attribute Descriptions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">self:</td>
            <td>
                Retrieves the current message.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">summaryStatus:</td>
            <td>
                Returns the status information of the message as a messagestatus object, in a summary view.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">detailedStatus:</td>
            <td>Returns the status information of the message as a messagestatus object, in a detailed view.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">summaryResponses:</td>
            <td>
               Returns the response information of the message as a messageresponse object, in a summary view.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">detailedResponses:</td>
            <td>
               Returns the response information of the message as a messageresponse object, in a detailed view.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">summaryResponsesWithResponseRule:</td>
            <td>
               Returns the response information of the message as a messageresponse object, filtered by the Response Rule (if one was used) in a summary view.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">detailedResponsesWithResponseRule:</td>
            <td>
               Returns the response information of the message as a messageresponse object, filtered by the Response Rule (if one was used) in a detailed view.
            </td>
        </tr>
    </tbody>
</table>

## Retrieve Summary Status

> Retrieve Summary Status
> > This sample of code will retrieve the Summary Status for a message

```xml
<ns3:link method="GET" 
   rel="summaryStatus" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=summary&apikey=498nadsasdff09fewdsafjaa90f"/>
```
```go
{
  	"method": "GET",
  	"rel": "summaryStatus",
  	"uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=summary&apikey=498nadsasdff09fewdsafjaa90f"
}
```

> Sample Summary Status Response
> > This sample of code will retrieve the Summary Status for a message

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
 <ns2:messageStatuses>
  <ns2:messageStatus>
    <ns2:link method="GET" 
             rel="self" 
             uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=summary&apikey=498nadsasdff09fewdsafjaa90f"/>
    <categories>
      <status name="Sent">
        <percentageTotal>0.0%</percentageTotal>
        <recipientCount>0</recipientCount>
      </status>
      <status name="Pending">
        <percentageTotal>0.0%</percentageTotal>
        <recipientCount>0</recipientCount>
      </status>
      <status name="Received">
        <percentageTotal>0.0%</percentageTotal>
        <recipientCount>0</recipientCount>
      </status>
      <status name="Acknowledged">
        <percentageTotal>100.0%</percentageTotal>
        <recipientCount>2</recipientCount>
      </status>
      <status name="Undeliverable">
        <percentageTotal>0.0%</percentageTotal>
        <recipientCount>0</recipientCount>
      </status>
    </categories>
  </ns2:messageStatus>
 </ns2:messageStatuses>
</ns2:return>
```
```go
{
  "messageStatuses" : [ {
    "link" : [ {
      "uri" : "https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=summary&apikey=498nadsasdff09fewdsafjaa90f",
      "rel" : "self",
      "method" : "GET"
    } ],
    "categories" : [ {
      "name" : "Sent",
      "recipientCount" : 0,
      "percentageTotal" : "0.0%"
    }, {
      "name" : "Pending",
      "recipientCount" : 0,
      "percentageTotal" : "0.0%"
    }, {
      "name" : "Received",
      "recipientCount" : 0,
      "percentageTotal" : "0.0%"
    }, {
      "name" : "Acknowledged",
      "recipientCount" : 2,
      "percentageTotal" : "100.0%"
    }, {
      "name" : "Undeliverable",
      "recipientCount" : 0,
      "percentageTotal" : "0.0%"
    } ]
  } ],
  "link" : [ ]
}
```

Using the links provided in the message response, the user can simply make a new API request to retrieve the **summaryStatus** URL. 

In the example above, the **summaryStatus** URL is:

So the request would look as follows:

`GET https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=summary&apikey=498nadsasdff09fewdsafjaa90f`

As this is a **GET** request we don't have to provide any message body.

This response states that of the 2 people that were sent the message, both of them **Acknowledged** it by sending a response.  

Your application can use this information to easily determine the numbers of recipients in each state and show a small graph.

## Retrieve Detailed Status

> Retrieve Detailed Status
> > This snippet will retrieve the detailed status for a message.

```xml
<ns3:link method="GET" 
   rel="detailedStatus" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=detailed&apikey=498nadsasdff09fewdsafjaa90f"/>
```
```go
{
  	"method": "GET",
  	"rel": "detailedStatus",
  	"uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=detailed&apikey=498nadsasdff09fewdsafjaa90f"
}
```

> Sample Detailed Status Response

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
  <status>1 to 2 of 2</status>
  <ns2:messageStatuses>
    <ns2:messageStatus>
      <ns2:link method="GET" 
	        rel="self" 
                uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?apikey=498nadsasdff09fewdsafjaa90f&view=detailed"/>
      <status type="email">
        <destination></destination>
        <status></status>
      </status>
      <status type="sms">
        <acknowlegedTimestamp>2012-09-28T08:47:50+10:00</acknowlegedTimestamp>
        <destination>$mobile</destination>
        <receivedTimestamp>2012-09-28T08:47:20+10:00</receivedTimestamp>
        <sentTimestamp>2012-09-28T08:47:17+10:00</sentTimestamp>
        <status>READ</status>
      </status>
      <status type="voice">
        <destination></destination>
        <status></status>
      </status>
      <info> Out bound SMS text message sent OK. </info>
      <name>John Smith</name>
    </ns2:messageStatus>
    <ns2:messageStatus>
      <ns2:link method="GET" 
	        rel="self" 
                uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?apikey=498nadsasdff09fewdsafjaa90f&view=detailed"/>
      <status type="email">
        <destination></destination>
        <status></status>
      </status>
      <status type="sms">
        <acknowlegedTimestamp>2012-09-28T08:47:49+10:00</acknowlegedTimestamp>
        <destination>$mobile</destination>
        <receivedTimestamp>2012-09-28T08:47:20+10:00</receivedTimestamp>
        <sentTimestamp>2012-09-28T08:47:17+10:00</sentTimestamp>
        <status>READ</status>
      </status>
      <status type="voice">
        <destination></destination>
        <status></status>
      </status>
      <info> Out bound SMS text message sent OK. </info>
      <name>Fred Smith</name>
    </ns2:messageStatus>
  </ns2:messageStatuses>
</ns2:return>
```
```go
{
  "messageStatuses" : [ {
    "name" : "John Smith",
    "info" : "Out bound SMS text message sent OK.",
    "link" : [ {
      "uri" : "https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?apikey=498nadsasdff09fewdsafjaa90f&view=detailed",
      "rel" : "self",
      "method" : "GET"
    } ],
    "status" : [ {
      "type" : "email",
      "status" : "",
      "destination" : ""
    }, {
      "type" : "sms",
      "status" : "READ",
      "destination" : "$mobile",
      "sentTimestamp" : "1460070991",
      "receivedTimestamp" : "1460070991",
      "acknowlegedTimestamp" : "1460070991"
    }, {
      "type" : "voice",
      "status" : "",
      "destination" : ""
    },{
    "name" : "Fred Smith",
    "info" : "Out bound SMS text message sent OK.",
    "link" : [ {
      "uri" : "https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?apikey=498nadsasdff09fewdsafjaa90f&view=detailed",
      "rel" : "self",
      "method" : "GET"
    } ],
    "status" : [ {
      "type" : "email",
      "status" : "",
      "destination" : ""
    }, {
      "type" : "sms",
      "status" : "READ",
      "destination" : "$mobile",
      "sentTimestamp" : "1460070991",
      "receivedTimestamp" : "1460070991",
      "acknowlegedTimestamp" : "1460070991"
    }, {
      "type" : "voice",
      "status" : "",
      "destination" : ""
    } ],
  "status" : "1 to 2 of 2",
  "link" : [ ]
}
```

Similar to the **summaryStatus**, using the links provided in the message response, the user can simply make a new API request to retrieve the **detailedStatus** URL. 

` GET https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=detailed&apikey=`

As this is a **GET** request we don't have to provide any message body.	

The user can easily use this information to receive a far more detailed status breakdown of (for each recipient):

*   The name of the recipient
*   The channel type (SMS, Email, Voice, Web)
*   The sent timestamp for each channel
*   The received timestamp for each channel
*   The acknowledged timestamp for each channel
*   The undeliverable timestamp (only present when the channel is undeliverable)
*   The overall status for this recipient (PENDING, SENT, DELIVRD, READ, FAILED)
*   The information text describing how this message has progressed.

Once you have processed the status information, the next likely piece of information you will be looking to find is the content of the responses (if any).  The section on Message Responses describes how to retrieve this information.
