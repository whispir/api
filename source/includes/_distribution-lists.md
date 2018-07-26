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

Whispir supports 3 types of distribution lists.

 - **Static** : In a static distribution list you manually add contacts and, if required, one or more existing distribution lists. The contacts on the list don’t change unless you manually add or remove them (unlike a dynamic distribution list).
 - **Dynamic** : In a dynamic distribution list you add contacts based on rules relating to information saved in their Whispir profiles. The list of contacts updates automatically if those specified details change in any profiles. For example, if you add contacts based on a specific role (such as ‘trainer’) and a contact moves to a different role, the list will exclude that contact when the message is sent.
 - **Shared** : You can create a shared distribution list that’s made up of manually selected recipients, like a static distribution list. This list is then available for sharing with other workspaces (unlike static lists).

<aside class="notice">
Only Static, and Dynamic Distribution lists are allowed to be created via the API. Shared Distribution list creation is limited to the Platform UI only.
</aside>

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


> Creating Dynamic Distribution Lists
> > Dynamic Distribution Lists contains rules with filters to determine the members dynamically

```
POST https://api.whispir.com/distributionlists?apikey=[your api key]
Authorization: Basic [your basic auth]
```

```xml
Content-Type: application/vnd.whispir.distributionlist-v1+xml
 
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns1:distributionlist xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
   <name>My Dynamic DistributionList</name>
   <description>My Distribution list</description>
   <access>Open</access>
   <type>dynamic</type>
   <entityType>Contact</entityType>
   <visibility>Public</visibility>
   <rules>
       <ruleContent>sales</ruleContent>
       <ruleFilter>division</ruleFilter>
       <ruleFilterActualName>Division</ruleFilterActualName>
   </rules>
   <rules>
       <ruleContent>apac</ruleContent>
       <ruleFilter>businessUnit</ruleFilter>
       <ruleFilterActualName>Business Unit</ruleFilterActualName>
   </rules>
</ns1:distributionlist>
```
```go
Content-Type: application/vnd.whispir.distributionlist-v1+json
 
  {
    "name" : "My Dynamic DistributionList",
    "description" : "My Distribution list",
    "access" : "Open",
    "visibility" : "Public",
    "type" : "dynamic",
    "entityType" : "Contact",
	"rules" : [{
			"ruleFilter" : "division",
			"ruleFilterActualName" : "Division",
			"ruleContent" : "sales"
		},{
			"ruleFilter" : "businessUnit",
			"ruleFilterActualName" : "Business Unit",
			"ruleContent" : "apac"
		}]
}
```

> > Users should expect a `201 Created` response after executing this request. If the rules are incorrectly passed, then a `422 Unprocessible Entity` is thrown.

Distribution lists can be created within the Default Workspace, or within a Specific Workspace. Distribution lists can contain **Contacts**, **Users**, or nested **Distribution Lists** to create any structure that is required within your environment. 


The MRI value is important here. It is the required unique identifier for any communications that are to be sent out to this distribution list.

To create a new distribution list, you can use the /distributionlists endpoint.

Only **4 fields** are required:

 1. name - the name of the distribution list to be created 
 2. access - Open Or Restricted 
 3. visibility - Private Or Public
 4. type - Static or Dynamic

In the case of _**Dynamic Distribution list**_, the required fields will be more than usual. As following - 

 1. name - the name of the distribution list to be created 
 2. access - Open Or Restricted 
 3. visibility - Private Or Public
 4. type - Dynamic
 5. entityType - contact (limited to contacts only at the moment)
 6. rules - The rules is an object that specifies the rules that should be applied on the entityType values to pick the appropriate contact at the moment of usage (not creation). The rules contain an array of rule definitions with a minimum of one rule to be defined. If not done so, a 422 unprocessable entity is returned by the API duuring the distribution list creation/edit.

**Note**: The contactIds, userIds, and distListIds values are ignored when the _type_ is _dynamic_, as the rules govern the members of the Distribution list

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
               Specifies the name of the distribution list. This has to be unique, and should not contain any special characters (except space) in it.
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
            <td style="text-align: right; font-weight: bold;">type</td>
            <td>
            <strong>String</strong> <br>
            Allows the user to specify the type for this DL. Default is `static`<br>
            
            <ol>
				<li><strong>Static</strong> - The contacts on the list don’t change unless you manually add or remove them (unlike a dynamic distribution list).</li>
				<li><strong>Dynamic</strong> - The contacts on the list change based on the rulesFilter applied at the time of usage. There is good likelyhood of contacts changing for each run depending on the rules</li>
			 </ol>
            </td>
        </tr>
	<tr>
            <td style="text-align: right; font-weight: bold;">entityTpe</td>
            <td>
            <strong>String</strong> <br>
            Only mandatory when the type is dynamic. The value is currently strictly limited to "contact".
            </td>
        </tr>
	<tr>
            <td style="text-align: right; font-weight: bold;">rules</td>
            <td>
            <strong>Object</strong><br>
		The rules contains array (child) of rule definitions. Each rule is a object with 3 keys in them. 
            <ol>
		<li><strong>ruleFilter</strong> - contains any of the contact profile elements that are available for searching e.g. Division, Department, Role.</li>
		<li><strong>ruleFilterActualName</strong> - contains the matching string to be compared for the distribution list.</li>
		<li><strong>ruleContent</strong> - contains the matching string to be compared with the contact element for being a part of the Distribution list</li>
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

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">List of common ruleFilter and ruleFilterActualName values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">Common Values</td>
            <td>
            If your company has custom contact properties, that you want to include in the DL ruleFilter, then please reach out to Whispir Support or your Account Manager for the details.<br>
<ul>
		<li>ruleFilter : ruleFilterActualName</li>
</ul>
               <ol>
		<li>businessUnit : Business Unit</li>
		<li>companyName : Organization Name</li>
		<li>createdtime__timestamp : Created Time</li>
		<li>department : Department</li>
		<li>division : Division</li>
		<li>firstName : First Name</li>
		<li>group_messagingoption_active__boolean : Is Active</li>
		<li>group_messagingoption_fieldmapping : Mapped Field</li>
		<li>group_messagingoption_type__dropdown : Type</li>
		<li>jobTitle : Job Title</li>
		<li>lastName : Last Name</li>
		<li>lastmodifiedtime__timestamp : Last Updated Time</li>
		<li>personalAddress1 : Personal Address1</li>
		<li>personalAddress2 : Personal Address2</li>
		<li>personalCountry : Personal Country</li>
		<li>personalEmailAddress1 : Personal Email Address</li>
		<li>personalEmailAddress2 : Personal Email Address Secondary</li>
		<li>personalMobilePhone1 : Personal Mobile Phone Primary</li>
		<li>personalMobilePhone2 : Personal Mobile Phone Secondary</li>
		<li>personalPhone1 : Personal Phone Primary</li>
		<li>personalPhone2 : Personal Phone Secondary</li>
		<li>personalPhoneAreaCode1 : Personal Phone Areacode Primary</li>
		<li>personalPhoneAreaCode2 : Personal Phone Areacode Secondary</li>
		<li>personalPostCode : Personal Postcode</li>
		<li>personalState : Personal State</li>
		<li>personalSuburb : Personal Suburb</li>
		<li>role1 : Role</li>
		<li>role2 : Additional Role</li>
		<li>teamName1 : Team Name</li>
		<li>teamName2 : Additional Team Name</li>
		<li>timezone : Timezone</li>
		<li>workAddress1 : Work Address1</li>
		<li>workAddress2 : Work Address2</li>
		<li>workCountry : Work Country</li>
		<li>workEmailAddress1 : Work Email Address Primary</li>
		<li>workEmailAddress2 : Work Email Address Secondary</li>
		<li>workMobilePhone1 : Work Mobile Phone Primary</li>
		<li>workMobilePhone2 : Work Mobile Phone Secondary</li>
		<li>workOtherPhone : Phone Other</li>
		<li>workPhone1 : Work Phone Primary</li>
		<li>workPhone2 : Work Phone Secondary</li>
		<li>workPhoneAreaCode1 : Work Phone Areacode Primary</li>
		<li>workPhoneAreaCode2 : Work Phone Areacode Secondary</li>
		<li>workPostCode : Work Postcode</li>
		<li>workPostalAddress1 : Work Postal Address1</li>
		<li>workPostalAddress2 : Work Postal Address2</li>
		<li>workPostalCountry : Work Postal Country</li>
		<li>workPostalPostCode : Work Postal PostCode</li>
		<li>workPostalState : Work Postal State</li>
		<li>workPostalSuburb : Work Postal Suburb</li>
		<li>workSetellitePhone : Satellite Phone</li>
		<li>workState : Work State</li>
		<li>workSuburb : Work Suburb</li>
		</ol>
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


## Modifying Distribution Lists

> Getting the DL

> > Request

```
GET https://api.whispir.com/distributionlists/CF5AF1AE49ED07A6?apikey=[your api key]
Authorization: Basic [your basic auth]
```
> > Response

```xml
Accept: application/vnd.whispir.distributionlist-v1+xml
 
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns1:distributionlists xmlns:ns2="http://schemas.api.whispir.com">
    <id>CF5AF1AE49ED07A6</id>
    <name>Rockstar Distribution List</name>
    <description>All the rocks were once stars - astrophysicist inside me</description>
    <access>Open</access>
    <visibility>Public</visibility>
    <contactIds>7CC205AE17FFDC8A,92XC05AE154FDC8A</contactIds>
    <userIds></userIds>
    <distListIds></distListIds>
...
</ns1:distributionlists>
```

```go
Accept: application/vnd.whispir.distributionlist-v1+json
{
    "id": "CF5AF1AE49ED07A6",
    "name" : "Rockstar Distribution List",
    "description" : "All the rocks were once stars - astrophysicist inside me",
    "access" : "Open",
    "visibility" : "Public",
    "contactIds" : "7CC205AE17FFDC8A,92XC05AE154FDC8A",
    "userIds" : "",
    "distListIds" : "",
...
}
```

> Updating the DL

> > Lets do the following in a single request

> > 1. Remove a contactId
> > 2. Add two new UserId values

> > Request


```
PUT https://api.whispir.com/distributionlists/CF5AF1AE49ED07A6?apikey=[your api key]
Authorization: Basic [your basic auth]
```

```xml
Content-Type: application/vnd.whispir.distributionlist-v1+xml
 
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns1:distributionlists xmlns:ns2="http://schemas.api.whispir.com">
    <id>CF5AF1AE49ED07A6</id>
    <name>Rockstar Distribution List</name>
    <description>All the rocks were once stars - astrophysicist inside me</description>
    <access>Open</access>
    <visibility>Public</visibility>
    <contactIds>7CC205AE17FFDC8A,92XC05AE154FDC8A</contactIds>
    <userIds></userIds>
    <distListIds></distListIds>
...
</ns1:distributionlists>
```


```go
Content-Type: application/vnd.whispir.distributionlist-v1+json

{
    "id": "CF5AF1AE49ED07A6",
    "name" : "Rockstar Distribution List",
    "description" : "All the rocks were once stars - astrophysicist inside me",
    "access" : "Open",
    "visibility" : "Public",
    "contactIds" : "7CC205AE17FFDC8A",
    "userIds" : "F0547F6F2E4839F8,900972D1C916FE84",
    "distListIds" : "",
...
}
```

> > Response

```
204 No Content
```

A distribution list allows you to associate the following -

- **ContactIds** (type: String) is a comma separated list of Contact IDs that you would like added to the list.
- **UserIds** (type: String) specifies the Whispir Users that should also be notified when this list is used.
- **DistListIds** (type: String) specifies the nested lists that are contained within this distribution list.

Any or all three of these can be updated via the PUT method along with the DL properties (name, description, location etc).

The steps usually are -

1. Create a Distribution List (DL)
2. While creating the DL itself, you can put in the ContactIds, UserIds, distListIds (nested) so that the DL is created with those values readily placed in.

1. After the DL is created, if you want to add/update the values, then
2. Do a GET request to retrieve the specific DL.

	a. GET https://api.whispir.com/workspaces/{id}/distributionlists/{id}?apikey=xxxx

	b. This will return you the DL object

3. Modify the DL properties (name, description, contactIds, UserIds, dlIds, location etc) as needed
4. Do a PUT request to update the DL details

	a. PUT https://api.whispir.com/workspaces/{id}/distributionlists/{id}?apikey=xxxx

	b. Successful update gives you a 204 No Content

	c. The contactIds, userIds, distListIds can be passed all together in a single request.

Note:

1. If an existing contactId is again added, it does neither throws an error, nor create two entries. The contactId is just neglected and only 1 record is maintained.

2. If the PUT request was successful, the expected response code is a `204 No Content`

3. For Modifying the Location Information refer to <a href="http://10.0.2.15:4567/#location-tags-for-distribution-lists">Location Tags for Distribution Lists</a>

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

