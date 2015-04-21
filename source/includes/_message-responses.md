# Message Responses

Recipients of Whispir Messages have the ability to respond directly to the message via the channels that they received the message on.  

If they received the message via SMS, they can respond directly to the SMS message, and this will be visible through the Whispir.io API.

![](https://developer.whispir.com/files/MessageResponse.png "Message Response")

The sections below describe the process to retrieve the responses to any messages that you have sent via the Whispir.io API.

## Retrieve a Message

> Retrieve a message

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="https://schemas.api.whispir.com" xmlns:ns3="https://schemas.api.whispir.com/dap">
 <to>61400000000</to>
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
{
    "to": "61400000000",
    "subject": "test subject",
    "body": "test body",
    "direction": "OUTGOING",
    "responseCount": "0",
    "createdTime": "2012-09-24T15:36:16+10:00",
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

## Summary Responses

> Sample Summary Responses Request

```xml
<ns3:link method="GET" 
   rel="summaryResponses" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=summary&filter=default&apikey=498nadsasdff09fewdsafjaa90f"/>
```
```go
{
  	"method": "GET",
  	"rel": "summaryResponses",
  	"uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=summary&filter=default&apikey=498nadsasdff09fewdsafjaa90f"
}
```

> Sample Summary Responses Response

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="https://schemas.api.whispir.com/dap" xmlns:ns3="https://schemas.api.whispir.com">
    <ns2:link method="GET" 
              rel="self" 
              uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=summary&filter=default&apikey=498nadsasdff09fewdsafjaa90f"/>
    <ns2:messageresponses>
        <ns2:response type="noresponse">
            <percentageTotal>50%</percentageTotal>
            <responseCount>1</responseCount>
        </ns2:response>
        <ns2:response type="notmatched">
            <percentageTotal>50%</percentageTotal>
            <responseCount>1</responseCount>
        </ns2:response>
    </ns2:messageresponses>
</ns2:return>
```
```go
{
  "messageresponses" : [ {
    "percentageTotal" : "50%",
    "responseCount" : "1",
    "link" : [ ],
    "type" : "noresponse"
  },{
    "percentageTotal" : "50%",
    "responseCount" : "1",
    "link" : [ ],
    "type" : "notmatched"
  } ],
  "link" : [ {
    "uri" : "https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=summary&filter=default&apikey=498nadsasdff09fewdsafjaa90f",
    "rel" : "self",
    "method" : "GET"
  } ]
}
```

Using the links provided in the message response, the user can simply make a new API request to retrieve the **summaryStatus** URL. 

The request for this information would look as follows:

`GET https://api.whispir.com/messages/069BF68E5E0FE99B/messagestatus?view=summary&apikey=498nadsasdff09fewdsafjaa90f`

This request is asking for a couple of things:

1.  The URL is specifically asking for all of the **messageresponses** to the message with ID **069BF68E5E0FE99B**
2.  The **View** parameter is specifying that the message responses should be shown in a **summary** view
3.  The **Filter** parameter is specifying that the filter should not use a response rule, it should show the **default** filter

As this is a **GET** request we don't have to provide any message body.

This response states that of the 2 people that were sent the message, both of them **Acknowledged** it by sending a response.  

Your application can use this information to easily determine the numbers of recipients in each state and show a small graph.

## Detailed Status

> Sample Detailed Responses Request

```xml
<ns3:link method="GET" 
   rel="detailedResponses" 
   uri="https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=detailed&filter=default&apikey=498nadsasdff09fewdsafjaa90f"/>
```
```go
{
    "method": "GET",
    "rel": "detailedResponses",
    "uri": "https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=detailed&filter=default&apikey=498nadsasdff09fewdsafjaa90f"
}
```

> Sample Detailed Responses Response

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <status>1 to 2 of 2</status>
    <ns2:messageresponses>
        <ns2:response>
            <from>
                <email>jsmith@test.com</email>                
                <mobile>61000000000</mobile> 
                <mri>John_Smith.484215.Critical_Incident_Management@Contact.whispir.com</mri>
                <name>John Smith</name>
                <voice>61000000000</voice> 
            </from>
            <responseCategory>noresponse</responseCategory>
            <responseMessage channel="N/A">
                <acknowledged>N/A</acknowledged>
                <content>N/A</content>
            </responseMessage>
        </ns2:response>
        <ns2:response>
            <from>
                <email>fsmith@test.com</email>
                <mobile>61000000001</mobile>  
                <mri>Fred_Smith.341550.Critical_Incident_Management@Contact.whispir.com</mri>
                <name>Fred Smith</name>
                <voice>61000000001</voice> 
            </from>
            <responseCategory>notmatched</responseCategory>
            <responseMessage channel="SMS">
                <acknowledged>28/09/12 08:48</acknowledged>
                <content>OK, got it. Thanks.</content>
            </responseMessage>
        </ns2:response>
    </ns2:messageresponses>
</ns2:return>
```
```go
{
  "status" : "1 to 2 of 2    ",
  "messageresponses" : [ {
    "from" : {
      "name" : "John Smith",
      "mri" : "John_Smith.484215.Critical_Incident_Management@Contact.whispir.com",
      "mobile" : "61000000000",
      "email" : "jsmith@test.com",
      "voice" : "61000000000"
    },
    "responseCategory" : "noresponse",
    "responseMessage" : {
      "content" : "N/A",
      "acknowledged" : "N/A",
      "channel" : "N/A"
    }
  },{
    "from" : {
      "name" : "Fred Smith",
      "mri" : "Fred_Smith.341550.Critical_Incident_Management@Contact.whispir.com",
      "mobile" : "61000000001",
      "email" : "fsmith@test.com",
      "voice" : "61000000001"
    },
    "responseCategory" : "notmatched",
    "responseMessage" : {
      "content" : "OK, got it. Thanks.",
      "acknowledged" : "28/09/12 08:48",
      "channel" : "SMS"
    }
  } ],
  "link" : [ ]
}
```

>This shows the application client that there were two intended recipients of this message.  1 of the recipients is in the **noresponse** category, meaning they have not provided a response.  1 of the recipients is in the **notmatched** category, meaning the response did not match any search criteria.

Using the links provided in the message response, the user can simply make a new API request to retrieve the **detailedResponses** URL. 

The resulting request would look as follows:

`GET https://api.whispir.com/messages/069BF68E5E0FE99B/messageresponses?view=detailed&filter=default&apikey=498nadsasdff09fewdsafjaa90f`

This request is asking for a couple of things:

1.  The URL is specifically asking for all of the **messageresponses** to the message with ID **069BF68E5E0FE99B**
2.  The **View** parameter is specifying that the message responses should be shown in a **detailed** view
3.  The **Filter** parameter is specifying that the filter should not use a response rule, it should show the **default** filter

As this is a **GET** request we don't have to provide any message body.

**Note:** Searching responses will be described further on in this documentation.

*   The **responseMessage channel** describes the messaging channel that the response has come in to the Whispir Platform via.
*   The **responseMessage content** describes the actual content of the inbound message.
*   The **responseMessage acknowledged** shows the date of when the response was received by the Whispir Platform