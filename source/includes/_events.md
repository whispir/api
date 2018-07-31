# Events

> API Endpoint

> > - generic

```xml
https://api.<region>.whispir.com/events/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.event-v1+xml
```

```go
https://api.<region>.whispir.com/events/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.event-v1+json
```

> > - limited to a workspace

```xml
https://api.<region>.whispir.com/workspaces/{:id}/events/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.event-v1+xml
```

```go
https://api.<region>.whispir.com/workspaces/{:id}/events/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.event-v1+json
```

```
> Resource type

- application/vnd.whispir.event-v1+xml
- application/vnd.whispir.event-v1+json


> Methods supported

- GET
- POST
- PUT
- DELETE
```

Whispir’s Events API allows users to capture, create and manage Events (including Incidents, Issues, Places, and Assets). Link multi-channel communications to each event to track report and disseminate information textually and Geo-spatially.

The Whispir Events module allows customers to easily input, invoke and track communications about current events that are taking place within their organisation. The Events can be customized to accept events and associated information from external systems or to capture more complex information around an event.

Events can be created from within the Whispir Conversation Platform through the web interface, or via the REST or WSDL APIs. This information is then available for the author to distribute templated messages, or (if location enabled) for other users to view on Whispir’s map interface.

Events within the Whispir Conversation Platform are generally active for a short period of time, most commonly defined by a Start Date and an End Date.  Once the end date of the event is reached the event is deemed closed. 

Whispir Consultants work with each customer to design and build an events module that is specific to them, ensuring that the fields, applicable values, and captured information maps directly to the organisational process.

An example of an event could be an outage of an internal system or service, or an organisation wide event 
**e.g.** a media launch, a network outage or an incident (bush fires, a river flooding)

## Creating an Event

As Whispir works with each organisation to build out the requirements of the events module, the required fields are minimal. The bulk of the event information is from fields that are generic, and only applicable to the customer that is using the module.

Events have sub sections under them called as 'actions' (maximum of 10). When an Event occurs/is triggered, the related actions are to be performed. Each action has an owner, a set time, and details associated with it. The owner or responsible person for the event could be a `/contacts` in the system. This ensures that proper communication is sent to the individual based on their preferred channel (message, email, voice) automatically without having to key in the phone, email, and other communication information again.

The Events module captures information specific to an event so the information can be used in as part of messaging for the duration of the event. The Events module can be customized to accept events and associated information from external systems or to capture more complex information around an event.

Events are created within a workspace. As they are custom built the information to be captured will depend on your organisations specific requirements. Generally at a minimum an event will have a label, start date, and a status.

Most importantly, to create an event, one must have the create access for Incident row in the Roles & Permission section of the account settings.

```
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" targetNamespace="http://schemas.api.<region>.whispir.com/dap" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="link">
    <xs:complexType>
      <xs:simpleContent>
        <xs:extension base="xs:string">
          <xs:attribute type="xs:string" name="method"/>
          <xs:attribute type="xs:string" name="rel"/>
          <xs:attribute type="xs:anyURI" name="uri"/>
        </xs:extension>
      </xs:simpleContent>
    </xs:complexType>
  </xs:element>
  <xs:element name="eventLabel" type="xs:string"/>
  <xs:element name="status" type="xs:string"/>
  <xs:element name="eventFormList">
    <xs:complexType>
      <xs:sequence>
        <xs:element type="xs:string" name="formName"/>
        <xs:element name="eventFieldList" maxOccurs="unbounded" minOccurs="0">
          <xs:complexType>
            <xs:sequence>
              <xs:element type="xs:string" name="name"/>
              <xs:element type="xs:string" name="value" minOccurs="0"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>

```

**Required Fields:**

- Event Label – The concatenated unique Event ID and Event Name e.g. (2701095 - Outage of Local Systems in Sydney)
- Event Status – The current status of the event e.g. 'Open' or 'Inactive'

and one set of Actions for this event

- Action Date - The date and time of the action
- Action Owner - The contact who is responsible for this action execution
- Action Detail - The details of the action

All other fields on the event are defined through name/value pairs. E.g.

**Optional Fields:**

- Event Field Name – Start Date
- Event Field Value – 11 Sep 2015


- Event Field Name – End Date
- Event Field Value – 12 Sep 2015


- Event Field Name – Type
- Event Field Value – Notification


- contd..,

You can refer to the schema for a detail of the object structure.


> Creating an event
> > Event can easily be created by using the following request structure

```
HTTP1.1 POST https://api.<region>.whispir.com/events?apikey=<your_api_key>
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```xml
Content-Type: application/vnd.whispir.event-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:event
    xmlns:ns2="http://schemas.api.<region>.whispir.com/dap"
    xmlns:ns3="http://schemas.api.<region>.whispir.com">
    <eventLabel>2701095 - Outage of Local Systems in Sydney</eventLabel>
    <status>Open</status>
    <eventFormList>
        <formName>MetroEvent</formName>
        <eventFieldList>
            <name>summary</name>
            <value>Outage of systems in Sydney</value>
        </eventFieldList>
        <eventFieldList>
            <name>status</name>
            <value>Open</value>
        </eventFieldList>
        <eventFieldList>
            <name>description</name>
            <value>ATMs are non responsive, teams to be sent to investigate.</value>
        </eventFieldList>
        <eventFieldList>
            <name>type</name>
            <value>Notification</value>
        </eventFieldList>
        <eventFieldList>
            <name>category</name>
            <value>Internal</value>
        </eventFieldList>
        <eventFieldList>
            <name>startDate</name>
            <value>26/05/2015 17:51:00</value>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner1</name>
            <value>John Wick</value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate1/name>
            <value>11/09/2015 17:51:00</value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails1</name>
            <value>investigation to take place asap.</value>
        </eventFieldList>
        <eventFieldList>
            <name>severity</name>
            <value>Severity 3 - Minor Outage (Some Service Degradation)</value>
        </eventFieldList>
    </eventFormList>
</ns3:event>
```

```go
Content-Type: application/vnd.whispir.event-v1+json

{
    "eventLabel" : "2701095 - Outage of Local Systems in Sydney",
    "status" : "Open",
    "eventFormList" : [ {
        "formName" : "MetroEvent",
        "eventFieldList" : [ 
            {
              "name" : "summary",
              "value" : "Outage of systems in Sydney"
            }, {
              "name" : "status",
              "value" : "Open"
            }, {
              "name" : "description",
              "value" : "ATMs are non responsive, teams to be sent to investigate."
            }, {
              "name" : "category",
              "value" : "Internal"
            }, {
              "name" : "startDate",
              "value" : "11/09/2015 17:41:00"
            }, {
              "name" : "actionOwner1",
              "value" : "John Wick"
            }, {
              "name" : "actionDate1",
              "value" : "11/09/2015 17:41:00"
            }, {
              "name" : "actionDetails1",
              "value" : "investigation to take place asap."
            }, {
              "name" : "severity",
              "value" : "Severity 3 - Minor Outage (Some Service Degradation)"
            } 
        ]
    } ]
}
```
> > The request if successful shall return a `201 Created` along with the complete event object.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:event xmlns:ns2="http://schemas.api.<region>.whispir.com" xmlns:ns3="http://schemas.api.<region>.whispir.com/dap">
    <id>421FEEBA93GF53A2</id>
    <eventLabel>2701095 - Outage of Local Systems in Sydney</eventLabel>
    <status>Open</status>
    <eventFormList>
        <eventFieldList>
            <name>summary</name>
            <value>Outage of systems in Sydney</value>
        </eventFieldList>
        <eventFieldList>
            <name>location</name>
            <value>0.0,0.0</value>
        </eventFieldList>
        <eventFieldList>
            <name>endDate</name>
        </eventFieldList>
        <eventFieldList>
            <name>type</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails2</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails3</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails1</name>
            <value>investigation to take place asap.</value>
        </eventFieldList>
        <eventFieldList>
            <name>priority</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>description</name>
            <value>ATMs are non responsive, teams to be sent to investigate.</value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails8</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails9</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails6</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails7</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails4</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner10</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails5</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>platform</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>services</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>status</name>
            <value>Open</value>
        </eventFieldList>
        <eventFieldList>
            <name>openedBy</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>category</name>
            <value>Internal</value>
        </eventFieldList>
        <eventFieldList>
            <name>externalVendor</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>externalCaseNumber</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner6</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>startDate</name>
            <value>11/09/2015 00:00:00</value>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner5</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner8</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner7</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner9</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate8</name>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate9</name>
        </eventFieldList>
        <eventFieldList>
            <name>actionDetails10</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate4</name>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner2</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate5</name>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner1</name>
            <value>John Wick</value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate6</name>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner4</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate7</name>
        </eventFieldList>
        <eventFieldList>
            <name>actionOwner3</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate1</name>
            <value>11/09/2015 00:00:00</value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate3</name>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate2</name>
        </eventFieldList>
        <eventFieldList>
            <name>locations</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>impactToOrg</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>actionDate10</name>
        </eventFieldList>
        <eventFieldList>
            <name>locationDisplay</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>subCategory</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>severity</name>
            <value>Severity 3 - Minor Outage (Some Service Degradation)</value>
        </eventFieldList>
        <eventFieldList>
            <name>duration</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>lineNumber</name>
            <value></value>
        </eventFieldList>
        <eventFieldList>
            <name>impactCondition</name>
            <value></value>
        </eventFieldList>
        <formName>MetroEvent</formName>
    </eventFormList>
    <ns3:link uri="https://api.<region>.whispir.com/workspaces/26C20B1A09XS3RA2/events/421FEEBA93GF53A2?apikey=<your_api_key>" rel="self" method="GET"/>
    <ns3:link uri="https://api.<region>.whispir.com/workspaces/26C20B1A09XS3RA2/events/421FEEBA93GF53A2?apikey=<your_api_key>" rel="self" method="PUT" type="application/vnd.whispir.event-v1+xml,application/vnd.whispir.event-v1+json"/>
    <ns3:link uri="https://api.<region>.whispir.com/workspaces/26C20B1A09XS3RA2/messages?label=2701095%20-%20Outage%20of%20Local%20Systems%20in%20Sydney" rel="retrieveEventMessages" method="GET"/>
</ns2:event>
```

```go
{
  "id": "421FEEBA93GF53A2",
  "eventLabel": "2701095 - Outage of Local Systems in Sydney",
  "status": "Active",
  "eventFormList": [
    {
      "formName": "MetroEvent",
      "eventFieldList": [
        {
          "name": "summary",
          "value": "Outage of systems in Sydney"
        },
        {
          "name": "location",
          "value": "0.0,0.0"
        },
        {
          "name": "endDate"
        },
        {
          "name": "type",
          "value": ""
        },
        {
          "name": "actionDetails2",
          "value": ""
        },
        {
          "name": "actionDetails3",
          "value": ""
        },
        {
          "name": "actionDetails1",
          "value": "investigation to take place asap."
        },
        {
          "name": "priority",
          "value": ""
        },
        {
          "name": "description",
          "value": "ATMs are non responsive, teams to be sent to investigate."
        },
        {
          "name": "actionDetails8",
          "value": ""
        },
        {
          "name": "actionDetails9",
          "value": ""
        },
        {
          "name": "actionDetails6",
          "value": ""
        },
        {
          "name": "actionDetails7",
          "value": ""
        },
        {
          "name": "actionDetails4",
          "value": ""
        },
        {
          "name": "actionOwner10",
          "value": ""
        },
        {
          "name": "actionDetails5",
          "value": ""
        },
        {
          "name": "platform",
          "value": ""
        },
        {
          "name": "services",
          "value": ""
        },
        {
          "name": "status",
          "value": "Open"
        },
        {
          "name": "openedBy",
          "value": ""
        },
        {
          "name": "category",
          "value": "Internal"
        },
        {
          "name": "externalVendor",
          "value": ""
        },
        {
          "name": "externalCaseNumber",
          "value": ""
        },
        {
          "name": "actionOwner6",
          "value": ""
        },
        {
          "name": "startDate",
          "value": "11/09/2015 00:00:00"
        },
        {
          "name": "actionOwner5",
          "value": ""
        },
        {
          "name": "actionOwner8",
          "value": ""
        },
        {
          "name": "actionOwner7",
          "value": ""
        },
        {
          "name": "actionOwner9",
          "value": ""
        },
        {
          "name": "actionDate8"
        },
        {
          "name": "actionDate9"
        },
        {
          "name": "actionDetails10",
          "value": ""
        },
        {
          "name": "actionDate4"
        },
        {
          "name": "actionOwner2",
          "value": ""
        },
        {
          "name": "actionDate5"
        },
        {
          "name": "actionOwner1",
          "value": "John Wick"
        },
        {
          "name": "actionDate6"
        },
        {
          "name": "actionOwner4",
          "value": ""
        },
        {
          "name": "actionDate7"
        },
        {
          "name": "actionOwner3",
          "value": ""
        },
        {
          "name": "actionDate1",
          "value": "11/09/2015 00:00:00"
        },
        {
          "name": "actionDate3"
        },
        {
          "name": "actionDate2"
        },
        {
          "name": "locations",
          "value": ""
        },
        {
          "name": "impactToOrg",
          "value": ""
        },
        {
          "name": "actionDate10"
        },
        {
          "name": "locationDisplay",
          "value": ""
        },
        {
          "name": "subCategory",
          "value": ""
        },
        {
          "name": "severity",
          "value": "Severity 3 - Minor Outage (Some Service Degradation)"
        },
        {
          "name": "duration",
          "value": ""
        },
        {
          "name": "lineNumber",
          "value": ""
        },
        {
          "name": "impactCondition",
          "value": ""
        }
      ]
    }
  ],
  "link": [
    {
      "uri": "https://api.<region>.whispir.com/workspaces/26C20B1A09XS3RA2/events/421FEEBA93GF53A2?apikey=<your_api_key>",
      "rel": "self",
      "method": "GET"
    },
    {
      "uri": "https://api.<region>.whispir.com/workspaces/26C20B1A09XS3RA2/events/421FEEBA93GF53A2?apikey=<your_api_key>",
      "rel": "self",
      "method": "PUT",
      "type": "application/vnd.whispir.event-v1+xml,application/vnd.whispir.event-v1+json"
    },
    {
      "uri": "https://api.<region>.whispir.com/workspaces/26C20B1A09XS3RA2/messages?label=2701095%20-%20Outage%20of%20Local%20Systems%20in%20Sydney",
      "rel": "retrieveEventMessages",
      "method": "GET"
    }
  ]
}
```

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">eventLabel:</td>
      <td><strong>String</strong><br/>
        Specifies the name of the label used for the messages sent under this event
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">status:</td>
      <td><strong>String</strong><br/>
        Specifies the status of the event. The status can be one of - 
        <ul>
          <li>Active</li>
          <li>Resolved</li>
        </ul>
        <b>Note: </b>The default status is Open.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">summary:</td>
      <td><strong>String</strong><br/>
        Specifies the summary of the event. A single liner that can be equivalent to the Subject of an email.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">description:</td>
      <td><strong>String</strong><br/>
        Specifies the detailed description of the event
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">location:</td>
      <td><strong>String</strong><br/>
        Specifies the latitude, longitude values of the event location. This helps to show the event location on Whispir's geo-map feature set and coordinated communication based on the geo location of the event.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">startDate:</td>
      <td><strong>String</strong><br/>
        Specifies the startdate of the event. This is a mandatory value.<br>
        The date should be in the format of DD/MM/YYYY HH:MI:SS in 24hrs format. <b>e.g</b> 11/09/2015 17:21:00 for 11th September 2015 5.21 PM.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">endDate:</td>
      <td><strong>String</strong><br/>
        Specifies the endDate of the event.<br>
        The date should be in the format of DD/MM/YYYY HH:MI:SS in 24hrs format. <b>e.g.</b> 11/09/2015 19:26:00 for 11th September 2015 7.26 PM.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">severity:</td>
      <td><strong>String</strong><br/>
        Specifies the severity of the event. While this can change from company to company, the standard value set to be chosen from is -
        <ul>
          <li>Severity 5 - Routine Maintenance Tasks</li>
          <li>Severity 4 - Scheduled System Changes</li>
          <li>Severity SL3 - Minor Outage (Some Service Degradation)</li>
          <li>Severity SL2 - Moderate Outage (Service Degradation)</li>
          <li>Severity SL1 - Major Outage (Significant Service Unavailablity)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">Priority:</td>
      <td><strong>String</strong><br/>
        Specifies the priority of the event. While this can change from company to company, the standard value set to be chosen from is -
        <ul>
          <li>Priority 5 - No Set Resolution Period</li>
          <li>Priority 4 - &lt;1 week Resolution</li>
          <li>Priority 3 - &lt;3 day Resolution</li>
          <li>Priority 2 - &lt;1 day Resolution</li>
          <li>Priority 1 - &lt;2hr Resolution</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">duration:</td>
      <td><strong>String</strong><br/>
        The duration of the event in HH:MI:SS. <b>e.g. </b>02:05:00
        <br>This can be substituted in the place of end date if required. Or a subset of the time between the start and end Dates.
      </td>
    </tr>
    <tr>
      <td style="text-align: left; font-weight: bold;" colspan="2">
        -- Event categorization attributes --
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">category:</td>
      <td><strong>String</strong><br/>
        Specifies the category of event. The default values to choose from are -
        <ul>
          <li>Internal Systems</li>
          <li>External Systems</li>
          <li>Infrasturcture</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">subcategory:</td>
      <td><strong>String</strong><br/>
        Specifies the subcategory in the category. The default values to choose from are -
        <ul>
          <li>Customer Impact</li>
          <li>Cust &amp; Staff Impact</li>
          <li>Staff Impact</li>
          <li>Impact Unknown</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">type:</td>
      <td><strong>String</strong><br/>
        Specifies the type of event. The default values to choose from are -
        <ul>
          <li>Multiple Issues</li>
          <li>NIL</li>
          <li>Network</li>
          <li>Applications</li>
          <li>Mobile Apps</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">externalVendor:</td>
      <td><strong>String</strong><br/>
        Specifies the name/contact who is the external vendor related to this event
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">lineNumber:</td>
      <td><strong>String</strong><br/>
        Specifies the line Number (production lines)
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">externalCaseNumber:</td>
      <td><strong>String</strong><br/>
        Specifies the number as tracked by an external party realted to this event
      </td>
    </tr>
    <tr>
      <td style="text-align: left; font-weight: bold;" colspan="2">
        -- Services effected by this event --
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">platform:</td>
      <td><strong>String</strong><br/>
        Specifies the platform in the company to which this event is associated with
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">services:</td>
      <td><strong>String</strong><br/>
        Specifies the service in the company to which this event is associated with
      </td>
    </tr>
    <tr>
      <td style="text-align: left; font-weight: bold;" colspan="2">
        -- Impact of this event --
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">impactCondition:</td>
      <td><strong>String</strong><br/>
        Specifies the impact condition of this event to the company. These values can be configured via custom lists as these can be very specific to the company. The default list to choose from are - 
        <ul>
          <li>All services not available</li>
          <li>All services degraded</li>
          <li>Some services not available</li>
          <li>Some services degraded</li>
          <li>No Impact</li>
          <li>Unknown</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">impactToOrg:</td>
      <td><strong>String</strong><br/>
        Specifies the impact of this event to the Organization. These values can be configured via custom lists as these can be very specific to the company. The default list to choose from are - 
        <ul>
          <li>Global</li>
          <li>National</li>
          <li>Local</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">locations:</td>
      <td><strong>String</strong><br/>
        Specifies the impact location of this event to the Organization's operational geographies. These values can be configured via custom lists as these can be very specific to the company.
      </td>
    </tr>
    <tr>
      <td style="text-align: left; font-weight: bold;" colspan="2">
        -- Actions for this event --
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">multiple key value sets:</td>
      <td><strong>String</strong><br/>
        Specifies the set of individual actions to be taken during this event.<br>
        Each action consists of - 
        <ul>
          <li>actionDate - the start date of this action in dd/mm/yyyy HH:MI:SS 24hr format</li>
          <li>actionOwner - the individual (contact) responsible for this action's execution</li>
          <li>actionDetails - the detail description of this action</li>
        </ul>
        An event can have a maximum of 10 action. So the action values are numbered.
        actionDate1, actionOwner1, actionDetails1<br>
        actionDate2, actionOwner2, actionDetails2<br>
        ...<br>
        actionDate10, actionOwner10, actionDetails10<br>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">Alias Fields:</td>
      <td><strong>String</strong><br/>
        The other (alias) name and title fields
        <ul>
          <li>otherFirstName, otherLastName, otherTitle</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Sending Messages using event data

> Sending Messages using event data
> > The messages are sent using the /message end point. The added data here is the `eventId`. The id of the event whose data has to be used.

```
HTTP1.1 POST https://api.<region>.whispir.com/messages?apikey=<your_api_key>
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.<region>.whispir.com">
    <to>$mobile</to>
    <subject>Event Notification</subject>    
    <eventId>2EE7FEA3343662BE</eventId>  
    <body>An event has occurred: @@summary@@.  A resolution is required by @@actionDate1@@.</body>
</ns2:message> 

``` 

```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "$mobile",
    "subject" : "Event Notification",
    "eventId" : "2EE7FEA3343662BE",
    "body" : "An event has occurred: @@summary@@.  A resolution is required by @@actionDate1@@."
}
``` 

> > This would resolve as -

```
Event Notification. 
An event has occurred: Outage of systems in Sydney.  A resolution is required by 11/09/2015 17:41:00.
```

> > The response to the request would be as follows -

```
HTTP 1.1 202 Accepted 
Location: http://api.<region>.whispir.com/messages/47707420BAE1288B?apikey=<your_api_key>  

```

> > Once can also use the templates to make the message more structured.

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.<region>.whispir.com">
    <to>$mobile</to>
    <subject>Event Notification</subject>    
    <eventId>2EE7FEA3343662BE</eventId>  
    <messageTemplateId>BCFD647BCD83FED893</messageTemplateId>
</ns2:message> 

``` 

```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "$mobile",
    "subject" : "Event Notification",
    "eventId" : "2EE7FEA3343662BE",
    "messageTemplateId" : "BCFD647BCD83FED893"
}
```

Once you have completed creating your event data into the Whispir Platform, the next logical step is to be able to deliver a notification about the event.

This action can be performed using the existing Messages endpoint, with the Event ID as an attribute of the message.

Including this Event ID will link the message to the event, and allow you to use any attribute of the Event within your message payload.

- Any event fields populated on the event will automatically be populated within the message
- Any attributes that are supplied within the message will take priority over any attributes that are from the event.
- The user should not be required to enter any 'attributes' as these will be retrieved from the linked event.
- The event fields will automatically populate the attributes in the message body (based on the relationships set in the Admin > Settings > Attributes > Message Event Attribute Map)
- The event label will be added to the label field in the message within the Whispir application
- If the event does not contain an event field, and there is no relevant attribute field supplied in the message payload, the @@ tag will not be resolved.
- If you do not supply an attribute in the message payload, and this has also not been supplied from the event, the field simply will not be resolved within the message.

## Retrieving messages sent in relation to the event

> Sample URI for retrieveEventMessages

```xml
<ns2:link 
		uri="http://api.<region>.whispir.com/messages?label=657126%20Outage%20of%20systems%20in%20Sydney" 
		rel="retrieveEventMessages" 
		method="GET" /> 
```

```go
{
   "uri": "http://api.<region>.whispir.com/messages?label=657126%20Outage%20of%20systems%20in%20Sydney",
   "rel": "retrieveEventMessages",
   "method": "GET"
}
```

You can easily retrieve all of the messages that are associated with an Event by using the unique label that is created for each event.

The label that should be used for searching is provided to users in both the /events and /events/<ID> requests as a link element.  The 'rel' field for this element is: **retrieveEventMessages**

The API also supports to use this listing to query the different messages for status or any other purpose. And, any of the features available in Sending Messages, or Advanced Messages, are also available to be used within the Events Messages.


> Sending in request to retrieve Event Messages

```
HTTP 1.1 GET https://api.<region>.whispir.com/messages?label=657126%20Outage%20of%20systems%20in%20Sydney?apikey=<your_api_key>
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

> > response

```xml
Accept: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.<region>.whispir.com/dap" xmlns:ns3="http://schemas.api.<region>.whispir.com">
    <status>1 to 1 of 1</status>
    <ns2:messages>
        <ns2:message>
            <ns2:link method="GET" rel="self" uri="http://api.<region>.whispir.com/messages/47707420BAE1288B?apikey=<your_api_key>"/>
            <subject>Event Notification</subject>
            <repetitionCount>0</repetitionCount>
            <repeatDays>0</repeatDays>
            <repeatHrs>0</repeatHrs>
            <repeatMin>0</repeatMin>
            <from>John Wick</from>
            <direction>OUTGOING</direction>
            <responseCount>0</responseCount>
            <createdTime>1424062773000</createdTime>
        </ns2:message>
    </ns2:messages>
</ns2:return>
```

```go
Accept: application/vnd.whispir.message-v1+json

HTTP 1.1 200 OK

{
   "messages" : [{
     "subject" : "Event Notification",
     "repetitionCount" : 0,
     "repeatDays" : 0,
     "repeatHrs" : 0,
     "repeatMin" : 0,
     "from" : "John Wick",
     "direction" : "OUTGOING",
     "responseCount" : "0",
     "createdTime" : 1424062773000,
     "link" : [ {
       "uri" : "http://api.<region>.whispir.com/messages/47707420BAE1288B?apikey=DFD0FD90u809SDF90832FDS ",
       "rel" : "self",
       "method" : "GET"
     } ]
   } ],
   "status" : "",
   "link" : [ ]
} 
```

## Deleting an Event

It is not currently possible to remove events from the Whispir Platform. Instead, events should be updated to have a status of 'Closed'.
