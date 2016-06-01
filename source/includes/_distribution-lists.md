# Distribution Lists

> API Endpoint

> > - generic

```xml
https://api.whispir.com/distributionlists/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.distributionlist-v1+xml
```

```go
https://api.whispir.com/distributionlists/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.distributionlist-v1+json
```

> > - limited to a workspace

```xml
https://api.whispir.com/workspaces/{:id}/distributionlists/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.distributionlist-v1+xml
```

```go
https://api.whispir.com/workspaces/{:id}/distributionlists/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.distributionlist-v1+json
```

```
> Resource type

- application/vnd.whispir.distributionlist-v1+xml
- application/vnd.whispir.distributionlist-v1+json


> Methods supported

- GET
- POST
- PUT
- DELETE
```


Whispir's API allows users to categorise their contacts into different groups to simplify the distribution of messages. This allows for 

 - Effective management and maintenance of contacts
 - Group messaging
 - Reporting

These logical groups can help to target specific communications to specific people. A contact can be part of any number of groups.

Distribution lists can easily be created by executing a `POST` request to the `/distributionlists` endpoint in Whispir.

Distribution lists can contain **Contacts**, **Users**, or nested **Distribution Lists** to create any structure that is required within your environment.

##Creating Distribution lists

> Creating Distribution Lists
> > Distribution Lists can contain lists of Contacts, Users or other Distribution Lists

```
POST https://api.whispir.com/distributionlists?apikey=[your api key]
Authorization: Basic [your basic auth]
```

```xml
Content-Type: application/vnd.whispir.distributionlist-v1+xml
 
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns1:distributionlists xmlns:ns2="http://schemas.api.whispir.com">
    <name>My Distribution List</name>
    <description></description>    
    <access>Open</access>
    <visibility>Public</visibility>
    <contactIds></contactIds>
    <userIds></userIds>
    <distListIds></distListIds>
</ns1:distributionlists>
```
```go
Content-Type: application/vnd.whispir.distributionlist-v1+json
 
{
    "name" : "My Distribution List",
    "description" : "",
    "access" : "Open",
    "visibility" : "Public",
    "contactIds" : "",
    "userIds" : "",
    "distListIds" : ""
}
```

> > Users should expect a `201 Created` response after executing this request.

Distribution lists can be created within the Default Workspace, or within a Specific Workspace.  More information on Workspaces will be provided later in this documentation. 

The MRI value is important here. It is the required unique identifier for any communications that are to be sent out to this distribution list.

To create a new distribution list, you can use the /distributionlists endpoint.

Only **3 fields** are required:

 1. name - the name of the distribution list to be created 
 2. access - Open Or Restricted 
 3. visibility - Private Or Public

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">name</td>
            <td>
            <strong>String</strong> <br>
               Specifies the name of the distribution list. This has to be unique.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">description</td>
            <td>
            <strong>String</strong> <br>
            Specifies a description for other users to see what this Distribution List should be used for.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">access</td>
            <td>
            <strong>String</strong> <br>
            Allows the user to specify the access type for this DL. <br>
            <ol>
			<li><strong>Open</strong> - Anyone can subscribe to this distribution list via the Whispir Portal</li>
			<li><strong>ByApproval</strong> - Anyone can subscribe using the Whispir Portal, however they are not officially on the list until their access is approved.</li>
			<li><strong>Restricted</strong> - The distribution list is not visible in the Whispir Portal</li>
			</ol>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">visibility</td>
            <td>
            <strong>String</strong> <br>
            Allows the user to specify the visibility for this DL. <br>
            
            <ol>
				<li><strong>Public</strong> - Any user/contact in any workspace can map themselves to this Distribution List within the Whispir Portal.</li>
				<li><strong>Private</strong> - Only users/contacts in the current workspace can map themselves to this Distribution List</li>
			 </ol>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">contactIds</td>
            <td>
            <strong>String</strong> <br>
            Comma separated list of userIds who can have access, visibility on this Distribution list. This information can be provided at the time of the DL creation or also later updated via a PUT request.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">userIds</td>
            <td>
            <strong>String</strong> <br>
            Comma separated list of userIds who can have access, visibility on this Distribution list. This information can be provided at the time of the DL creation or also later updated via a PUT request.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">distListIds</td>
            <td>
            <strong>String</strong> <br>
            Comma separated list of Distribution List IDs which can be nested distribution list to this DL.
            </td>
        </tr>
    </tbody>
</table>

## Retrieving Distribution Lists

> Retrieving Distribution Lists
> > The following snippets show how you can use the Whispir API to retrieve Distribution List information.

```
HTTP 1.1 GET /distributionlists?apikey=<your_api_key>
Authorization: Basic [your basic auth]
```

```xml
Content-Type: application/vnd.whispir.distributionlist-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <status>1 to 2 of 2</status>
    <ns2:distributionLists>
        <ns2:distributionList>
            <id>CF5AF1AE49ED07A6</id>
            <name>DL 1</name>
            <mri>dl1.company_name@list.company.whispir.sg</mri>
            <description>Distribution list for company 1</description>
            <memberCount>4</memberCount>
            <access>ByApproval</access>
            <visibility>Private</visibility>
            <ns2:link uri="https://api.whispir.com/distributionlists/CF5AF1AE49ED07A6?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:distributionList>
        <ns2:distributionList>
            <id>9FF7C2B470CCEC1E</id>
            <name>Docs Distribution List</name>
            <mri>Docs_Distribution_List.company@list.company.whispir.sg</mri>
            <description>A Distribution List created while writing the docs</description>
            <memberCount>2</memberCount>
            <access>Open</access>
            <visibility>Public</visibility>
            <ns2:link uri="https://api.whispir.com/distributionlists/9FF7C2B470CCEC1E?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:distributionList>
    </ns2:distributionLists>
</ns2:return>
```

```go
Content-Type: application/vnd.whispir.distributionlist-v1+json

{
  "distributionLists" : [ {
    "id" : "CF5AF1AE49ED07A6",
    "name" : "DL 1",
    "mri" : "dl1.company_name@list.company.whispir.sg",
    "description" : "test distribution list for company",
    "memberCount" : "4",
    "access" : "ByApproval",
    "visibility" : "Private",
    "link" : [ {
      "uri" : "https://api.whispir.com/distributionlists/CF5AF1AE49ED07A6?apikey=your_api_key",
      "rel" : "self",
      "method" : "GET"
    } ]
  }, {
    "id" : "9FF7C2B470CCEC1E",
    "name" : "Docs Distribution List",
    "mri" : "Docs_Distribution_List.company@list.company.whispir.sg",
    "description" : "A Distribution List created while writing the docs",
    "memberCount" : "2",
    "access" : "Open",
    "visibility" : "Public",
    "link" : [ {
      "uri" : "https://api.whispir.com/distributionlists/9FF7C2B470CCEC1E?apikey=your_api_key",
      "rel" : "self",
      "method" : "GET"
    } ]
  }],
  "status" : "1 to 2 of 2    ",
  "link" : [ ]
}
```

Similar to the creation of distribution list, retrieval of such list too is bound to the workspace it belongs to. So, a distribution list belonging to a workspace cannot be accessed from another workspace. 

The code samples on the right describe the methods to retrieve Distribution Lists using the Whispir API.

> Retrieving a specific Distribution List by ID

```
HTTP 1.1 GET /distributionlists/E07BA0DA35B0B1EF?apikey=<your_api_key>
Authorization: Basic [your basic auth]
```

## Searching for Distribution Lists

> > **Search for a Distribution List by name**<br/><br/>
> > Users can easily append the `&name=My DL Name` query parameter to search the Whispir API for a specific Distribution List.

```
HTTP 1.1 GET /distributionlists?apikey=<your_api_key>&name=My%20Distribution%20List
Authorization: Basic [your basic auth]
```

> > **Search for a Distribution List by description**<br/><br/>
> > Users can easily append the `&description=My DL Description` query parameter to search the Whispir API for a specific Distribution List.

```
HTTP 1.1 GET /distributionlists?apikey=<your_api_key>&description=company_name
Authorization: Basic [your basic auth]
```

The distribution list is usually retrieved by its `id`, but one can also search or refer to the distribution list by its name. This feature has to do with the **unique name** requirement for the distribution list.

Apart from the name, the `description` field can also be used to search for a distribution list. While name can be directly used to send in messages, the description is solely for the purpose of search. Once search yields the required result, the `mri` has to be picked from the selected DL and then used to send the messages.

Both these operations can be performed by passing in the relevant search parameters in the URL - as query params

* **&name=** - to search for name
* **&description=** - to search by description


## Adding Contacts

> Adding Contacts
> > Contacts can be added to Distribution Lists when the list is created, or by using a `PUT` request at a later stage.

```
POST https://api.whispir.com/distributionlists?apikey=[your api key]
Authorization: Basic [your basic auth]
```

```xml
Content-Type: application/vnd.whispir.distributionlist-v1+xml
 
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns1:distributionlists xmlns:ns2="http://schemas.api.whispir.com">
    <name>Rockstar Distribution List</name>
    <description>All the rocks were once stars - astrophysicist inside me</description>    
    <access>Open</access>
    <visibility>Public</visibility>
    <contactIds>7CC205AE17FFDC8A,92XC05AE154FDC8A</contactIds>
    <userIds></userIds>
    <distListIds></distListIds>
</ns1:distributionlists>
```

```go
Content-Type: application/vnd.whispir.distributionlist-v1+json
 
{
    "name" : "Rockstar Distribution List",
    "description" : "All the rocks were once stars - astrophysicist inside me",
    "access" : "Open",
    "visibility" : "Public",
    "contactIds" : "7CC205AE17FFDC8A,92XC05AE154FDC8A",
    "userIds" : "",
    "distListIds" : ""
}
```

A contact can be added to the distribution list in two ways. 

While creating the distribution list by passing the following 3 values:

- **ContactIds** string is a comma separated list of Contact IDs that you would like added to the list.
- **UserIds** specifies the Whispir Users that should also be notified when this list is used.
- **DistListIds** specifies the nested lists that are contained within this distribution list.

Or, after the distribution list is created by performing these steps:

- A **PUT** request is placed with the distribution list ID specified in the URL.
- The contactIds, userIds, distListIds can be passed all together in a single request.

> > If an existing contactId is again added, it does neither throws an error, nor create two entries. The contactId is just neglected and only 1 record is maintained.

If the PUT request was successful, the expected response code is a `204 No Content`

## Sending Messages

> Sending Messages to Distribution Lists
> > The API call is a `POST` request to the `/messages` endpoint.

```
POST https://api.whispir.com/messages?apikey=[your api key]
Authorization: Basic [your basic auth]
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>Docs_Distribution_List.company@list.company.whispir.sg</to>
    <subject>Simple SMS to List of contacts in the distribution list</subject>
    <body>This is the content of my sample sms message.</body>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "Docs_Distribution_List.company@list.company.whispir.sg",
    "subject" : "Simple SMS to List of contacts in the distribution list",
    "body" : "This is the content of my sample sms message."
}
```

Sending the message via the distribution list is very straight forward. The important key needed here is MRI of the distribution list.

This will result in the response of 202 Accepted and the message will be sent to all distribution list participants.

## Deleting Distribution Lists

> Deleting Distribution Lists
> > The following API requests allow users to remove Distribution Lists from the Whispir API.

```xml
DELETE https://api.whispir.com/distributionlists/E07BA0DA35B0B1EF?apikey=[your api key]
Authorization: Basic [your basic auth]
```

```go
DELETE https://api.whispir.com/distributionlists/E07BA0DA35B0B1EF?apikey=[your api key]
Authorization: Basic [your basic auth]
```

> > After performing the request the expected successful response is `204 No Content`.

Deleting the distribution is done via a `DELETE /distributionlist/{id}` endpoint. 

You can only delete the distribution list that you have created or a valid userId associated with the specific distribution list.

## Location Tags for Distribution Lists

Distribution Lists allow to add Locations as their property. This can be useful to geo-tag a group of users or assets in a single location. The location data can be set of multiple values with each entry specifying the lat, lon values and the type of data. There is no TTL attached to these values, so using the 'type' of location can help with proper identification and data stale ness.


Type can be:

1. 'CurrentLocation' - used to specify that the data is latest and is nearest best last known location of the DL asset
2. '-any-key-identifier' - can be any custom identifier key name that you can use to identify/associate the location value with. Like 'AlternativeLocation' or 'LocationB' or 'LocationX' etc.

> Creating Distribution Lists with Location values
> > Distribution Lists can contain lists of Contacts, Users or other Distribution Lists

```
POST https://api.whispir.com/distributionlists?apikey=[your api key]
Authorization: Basic [your basic auth]
```

```xml
Content-Type: application/vnd.whispir.distributionlist-v1+xml
 
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns1:distributionlists xmlns:ns2="http://schemas.api.whispir.com">
    <name>My Distribution List</name>
    <description></description>
    <access>Open</access>
    <visibility>Public</visibility>
    <contactIds></contactIds>
    <userIds></userIds>
    <distListIds></distListIds>
    <locations>
	<location>
		<latitude>47.6204232</latitude>
		<longitude>-122.3493552</longitude>
		<type>CurrentLocation</type>
	</location>
    </locations>
</ns1:distributionlists>
```
```go
Content-Type: application/vnd.whispir.distributionlist-v1+json
 
{
    "name" : "My Distribution List",
    "description" : "",
    "access" : "Open",
    "visibility" : "Public",
    "contactIds" : "",
    "userIds" : "",
    "distListIds" : "",
    "locations": [
        {
          "longitude": -122.3493552,
          "latitude": 47.6204232,
          "type": "CurrentLocation"
        }
    ]
}
```

> > Users should expect a `201 Created` response after executing this request. Or `204 No Content` in case of a distribution lost update using `PUT`

