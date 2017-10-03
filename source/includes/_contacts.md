#Contacts

> API Endpoint

> > - generic

```xml
https://api.whispir.com/contacts/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.contact-v1+xml
```

```go
https://api.whispir.com/contacts/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.contact-v1+json
```

> > - limited to a workspace

```xml
https://api.whispir.com/workspaces/{:id}/contacts/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.contact-v1+xml
```

```go
https://api.whispir.com/workspaces/{:id}/contacts/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.contact-v1+json
```

```
> Resource type

- application/vnd.whispir.contact-v1+xml
- application/vnd.whispir.contact-v1+json


> Methods supported

- GET
- POST
- PUT
- DELETE
```

Contacts form the core of the Whispir offerings. They make up the base data to which and from all the communications are performed.

The Whispir API provides secure cloud based storage for your contact information.  This can then easily be retrieved by any application or device that requires access, and has permission to do so.

##Creating new Contacts

> Creating new Contacts
> > Users can easily create new contacts by using the following request structure

```
POST https://api.whispir.com/contacts?apikey=[your api key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.contact-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:contact xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <firstName>John</firstName>
    <lastName>Wick</lastName>
    <status>A</status>
    <timezone>Australia/Melbourne</timezone>
    <workEmailAddress1>jsmith@testcompany.com</workEmailAddress1>
    <workMobilePhone1>61423456789</workMobilePhone1>
    <workCountry>Australia</workCountry>
    <messagingoptions>
        <messagingoption channel="sms">
            <enabled>true</enabled>
            <primary>WorkMobilePhone1</primary>
            <secondary></secondary>
            <tertiary></tertiary>
        </messagingoption>
        <messagingoption channel="email">
            <enabled>true</enabled>
            <primary>WorkEmailAddress1</primary>
            <secondary></secondary>
            <tertiary></tertiary>
        </messagingoption>
        <messagingoption channel="voice">
            <enabled>true</enabled>
            <primary>WorkMobilePhone1</primary>
            <secondary></secondary>
            <tertiary></tertiary>
        </messagingoption>
    </messagingoptions>
</ns2:contact>
```

```go
Content-Type: application/vnd.whispir.contact-v1+json

{
    "firstName": "John",
    "lastName": "Wick",
    "status": "A",
    "timezone": "Australia/Melbourne",
    "workEmailAddress1": "jsmith@testcompany.com",
    "workMobilePhone1": "61423456789",
    "workCountry": "Australia",
    "messagingoptions": [{
          "channel": "sms",
          "enabled": "true",
          "primary": "WorkMobilePhone1"
    },{
          "channel": "email",
          "enabled": "true",
          "primary": "WorkEmailAddress1"
    },{
          "channel": "voice",
          "enabled": "true",
          "primary": "WorkMobilePhone1"
    }]
}
```

> > The successful response will be a 201 with the details of the contact created and its associated unique `mri`.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:contact xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <type>COMPANY</type>
    <firstName>John</firstName>
    <lastName>Wick</lastName>
    <locations>
        <location>
            <latitude>0.0</latitude>
            <longitude>0.0</longitude>
            <type>CurrentLocation</type>
        </location>
    </locations>
    <lastModifiedTime>2015-06-04T17:37:01+10:00</lastModifiedTime>
    <status>A</status>
    <timezone>+10</timezone>
    <workEmailAddress1>jsmith@testcompany.com</workEmailAddress1>
    <workMobilePhone1>61423456789</workMobilePhone1>
    <workCountry>Australia</workCountry>
    <mri>John_Wick.1143139@Contact.whispir.sg</mri>
    <messagingoptions>
        <messagingoption channel="sms">
            <enabled>true</enabled>
            <primary>WorkMobilePhone1</primary>
            <secondary></secondary>
            <tertiary></tertiary>
        </messagingoption>
        <messagingoption channel="email">
            <enabled>true</enabled>
            <primary>WorkEmailAddress1</primary>
            <secondary></secondary>
            <tertiary></tertiary>
        </messagingoption>
        <messagingoption channel="voice">
            <enabled>true</enabled>
            <primary>WorkMobilePhone1</primary>
            <secondary></secondary>
            <tertiary></tertiary>
        </messagingoption>
    </messagingoptions>
    <ns3:link uri="https://api.whispir.com/contacts/CB4558257DD86D09?apikey=[your api key]" rel="self" method="GET"/>
    <ns3:link uri="https://api.whispir.com/contacts/CB4558257DD86D09?apikey=[your api key]" rel="updateContact" method="PUT" type="application/vnd.whispir.contact-v1+json,application/vnd.whispir.contact-v1+xml"/>
    <ns3:link uri="https://api.whispir.com/contacts/CB4558257DD86D09?apikey=[your api key]" rel="deleteContact" method="DELETE"/>
```

```go
{
  "id": "CB4558257DD86D09",
  "type": "COMPANY",
  "firstName": "John",
  "lastName": "Wick",
  "locations": [
    {
      "latitude": "0.0",
      "longitude": "0.0",
      "type": "CurrentLocation"
    }
  ],
  "lastModifiedTime": "2015-06-04T17:37:01+10:00",
  "status": "A",
  "timezone": "+10",
  "workEmailAddress1": "jsmith@testcompany.com",
  "workMobilePhone1": "61423456789",
  "workCountry": "Australia",
  "mri": "John_Wick.1143139@Contact.whispir.sg",
  "messagingoptions": [
    {
      "channel": "sms",
      "enabled": "true",
      "primary": "WorkMobilePhone1"
    },
    {
      "channel": "email",
      "enabled": "true",
      "primary": "WorkEmailAddress1"
    },
    {
      "channel": "voice",
      "enabled": "true",
      "primary": "WorkMobilePhone1"
    }
  ],
  "link": [
    {
      "uri": "https://api.whispir.com/contacts/CB4558257DD86D09?apikey=[your api key]",
      "rel": "self",
      "method": "GET"
    },
    {
      "uri": "https://api.whispir.com/contacts/CB4558257DD86D09?apikey=[your api key]",
      "rel": "updateContact",
      "method": "PUT",
      "type": "application/vnd.whispir.contact-v1+json,application/vnd.whispir.contact-v1+xml"
    },
    {
      "uri": "https://api.whispir.com/contacts/CB4558257DD86D09?apikey=[your api key]",
      "rel": "deleteContact",
      "method": "DELETE"
    }
  ]
}
```

To create a new contact, you can use the `/contacts` endpoint. The method is POST. Ensure that the following mandatory fields are provided for.

The following fields are required:

- firstName
- lastName
- workEmailAddress1
- workMobilePhone1
- workCountry
- timezone

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">firstName:</td>
			<td><strong>String</strong><br/>
				Specifies the firstName of the contact
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">lastName:</td>
			<td><strong>String</strong><br/>
				Specifies the lastName of the contact
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">title:</td>
			<td><strong>String</strong><br/>
				The title of the name
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">status:</td>
			<td><strong>String</strong><br/>
				Specifies the validity status of the contact. The status can be one of - 
				<ul>
					<li>Active (A)</li>
					<li>Disabled (D)</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">companyName:</td>
			<td><strong>String</strong><br/>
				Specifies the company name
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">jobTitle:</td>
			<td><strong>String</strong><br/>
				Specifies the job title at the company
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">division:</td>
			<td><strong>String</strong><br/>
				Specifies the Division in the company to which this contact is associated with
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">businessUnit:</td>
			<td><strong>String</strong><br/>
				Specifies the Business Unit in the company to which this contact is associated with
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">department:</td>
			<td><strong>String</strong><br/>
				Specifies the Department in the company to which this contact is associated with
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">Teams and Roles:</td>
			<td><strong>String</strong><br/>
				Specifies the primary and Secondary values for each respective variable
				<ul>
					<li>teamName1, teamName2</li>
					<li>role1, role2</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">Work Place Address:</td>
			<td><strong>String</strong><br/>
				Specifies the primary and Secondary values for each respective type. Of all these the <b>workEmailAddress1</b> is the mandatory field.
				<ul>
					<li>workEmailAddress1, workEmailAddress2</li>
					<li>workAddress1, workAddress2</li>
					<li>workSuburb, workState</li>
					<li>workPostCode, workCountry</li>
					<li>workPostalAddress1, workPostalAddress2</li>
					<li>workPostalSuburb, workPostalState</li>
					<li>workPostalPostCode, workPostalCountry</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">Work Place Phones:</td>
			<td><strong>Number</strong><br/>
				Specifies the primary and Secondary values for each respective type. Of all these the <b>workMobilePhone1</b> is the mandatory field.
				<ul>
					<li>workMobilePhone1, workMobilePhone2</li>
					<li>workPhoneAreaCode1, workPhone1</li>
					<li>workPhoneAreaCode2, workPhone2</li>
					<li>workFaxAreaCode1, workFax1</li>
					<li>workSetellitePhone, WorkOtherPhone</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">timezone:</td>
			<td><strong>String</strong><br/>
				Specifies the timezone in which the contact lives in. Values in relation to GMT.<br/><br/>
				Supported values are:
				<ul>
					<li>Offset from GMT in the format `+/-NN` e.g. `+10`</li>
					<li>Worldwide Timezone Format in the format `Country/City` e.g. `Australia/Melbourne`</li>
				</ul> 
				For a list of available worldwide timezones, click <a href="http://developer.whispir.com/files/Whispir-Timezones-v1.csv" title="Timezone IDs" target="_blank">here</a>.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">Personal Address:</td>
			<td><strong>String</strong><br/>
				Specifies the primary and Secondary values for each respective type
				<ul>
					<li>personalEmailAddress1, personalEmailAddress2</li>
					<li>personalAddress1, personalAddress2</li>
					<li>personalSuburb, personalState</li>
					<li>personalCountry, personalPostCode</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">Personal Phones:</td>
			<td><strong>Number</strong><br/>
				Specifies the primary and Secondary values for each respective type
				<ul>
					<li>personalPhoneAreaCode1, personalPhone1</li>
					<li>personalPhoneAreaCode2, personalPhone2</li>
					<li>personalFaxAreaCode1, personalFax1</li>
					<li>otherPhoneAreaCode1, otherPhone1</li>
					<li>otherMobile</li>
				</ul>
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
		<tr>
			<td style="text-align: right; font-weight: bold;">Messaging Options:</td>
			<td><strong>Object</strong><br/>
				Read Format of Messaging Options below.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">Other Fields :</td>
			<td><strong>String</strong><br/>
				Whispir allows external developers to build a 'Self-Subscription' portal to allow their own contacts to self-register for internal systems. This is only applicable for customers using Whispir's "Contact Portal" Product. To support this feature, the following fields are provided.<br>
				<ul>
					<li>username - must be unique within the company (users and active contacts)</li>
					<li>password - mandatory only in conjunction with the username</li>
					<li>secretQuestion - mandatory (used for password reset)</li>
					<li>secretAnswer - mandatory (used for password reset)</li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>

### Format of Messaging Options

```xml
	<messagingoptions>
		<messagingoption channel="sms">
			<enabled>true</enabled>
			<primary>WorkMobilePhone1</primary>
			<secondary></secondary>
			<tertiary></tertiary>
		</messagingoption>
		<messagingoption channel="email">
			<enabled>true</enabled>
			<primary>WorkEmailAddress1</primary>
			<secondary></secondary>
			<tertiary></tertiary>
		</messagingoption>
		<messagingoption channel="voice">
			<enabled>true</enabled>
			<primary>WorkMobilePhone1</primary>
			<secondary></secondary>
			<tertiary></tertiary>
		</messagingoption>
	</messagingoptions>
````
```go
"messagingoptions": [
    {
      "channel": "sms",
      "enabled": "true",
      "primary": "WorkMobilePhone1"
    },
    {
      "channel": "email",
      "enabled": "true",
      "primary": "WorkEmailAddress1"
    },
    {
      "channel": "voice",
      "enabled": "true",
      "primary": "WorkMobilePhone1"
    }
  ]
```

Whispir allows to define the different channels that needs to be enabled/used for communication. Using Messaging options, one can define the preferred/allowed channels and the respective primary, secondary, and tertiary contact numbers, emails to be used. These values again are derived from the above specified various personal, work attributes.

Available messaging options -

 - sms
 - email
 - voice


Each messaging options allows to specify the following 3 configuration settings

<dl>
	<dt>enabled</dt>
	<dd>- true</dd>
	<dd>- false</dd>
	<dt>primary</dt>
	<dd>workMobilePhone1 (Can be any of the valid attribute which has a value in it)</dd>
	<dt>secondary</dt>
	<dd><i>optional</i> - workMobilePhone2</dd>
	<dt>tertiary</dt>
	<dd><i>optional</i> - personalMobilePhone1</dd>
</dl>


## Retrieving Contacts

> Retrieving a list of Contacts
> > Contacts can easily be retrieved from the Whispir API using the following endpoints:

```
HTTP 1.1 GET https://api.whispir.com/contacts?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.contact-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <status>1 to 1 of 1</status>
    <ns2:contacts>
        <ns2:contact>
            <id>AF48A9EC3F02E43C</id>
            <firstName>Fred</firstName>
            <lastName>Smith</lastName>
            <status>A</status>
            <messagingoptions/> > 
            <ns2:link method="GET" 
                      rel="self" 
                      uri="http://api.whispir.com/contacts/AF48A9EC3F02E43C?apikey=<your_api_key>"/>
        </ns2:contact>
    </ns2:contacts>
</ns2:return>
```

```go
Accept: application/vnd.whispir.contact-v1+json

{
  "status": "1 to 1 of 1",
  "contacts": [
    {
      "id": "AF48A9EC3F02E43C",
      "firstName": "Fred",
      "lastName": "Smith",
      "status": "A",
      "messagingoptions": [],
      "link": {
        "method": "GET",
        "rel": "self",
        "uri": "http://api.whispir.com/contacts/AF48A9EC3F02E43C?apikey=<your_api_key>"
      }
    }
  ]
}
```

Contacts can be retrieved quite easily with a GET request to the `/contacts`. A simple /contacts will result in all contacts being retrieved with all of their information. No filters are applied.

Once the request is placed, the response will be a list of url's to each of the contacts that the API user has access to/or has requested for via the search criteria.  

**Note:** The sample request here shows contacts from the default workspace. If you need to retrieve contacts from a specific workspace, please ensure that the workspace information is passed in the URL.

<dl>
    <dt>URI for default workspace</dt>
    <dd>- https://api.whispir.com/contacts?apikey=<your_api_key></dd>
</dl>
<dl>
    <dt>URI for a specific workspace with id BC348DC83DF1AB34</dt>
    <dd> > - https://api.whispir.com/workspaces/BC348DC83DF1AB34/contacts?apikey=<your_api_key></dd>
</dl>

### Get a specific contact

> Retrieving a specific Contact
> > Users can retrieve a specific contact by supplying the Contact ID in the URL.

```
HTTP 1.1 GET https://api.whispir.com/contacts/AF48A9EC3F02E43C?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.contact-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:contact xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
   <id>AF48A9EC3F02E43C</id>
   <firstName>Fred</firstName>
   <lastName>Smith</lastName>
   <status>A</status>
   <messagingoptions/> > 
   <ns2:link method="GET" 
             rel="self" 
             uri="http://api.whispir.com/contacts/AF48A9EC3F02E43C?apikey=<your_api_key>"/>
</ns2:contact>
```

```go
Accept: application/vnd.whispir.contact-v1+json

{
   "id": "AF48A9EC3F02E43C",
   "firstName": "Fred",
   "lastName": "Smith",
   "status": "A",
   "messagingoptions": [],
   "link": {
     "method": "GET",
     "rel": "self",
     "uri": "http://api.whispir.com/contacts/AF48A9EC3F02E43C?apikey=<your_api_key>"
   }
}
```

To get details of a specific contact, the URI must be passed with the ID of the contact. So, the URI shall be:

`https://api.whispir.com/contacts/AF48A9EC3F02E43C` 

Where `AF48A9EC3F02E43C` is the contact id.

### Showing Custom Fields

> Showing Custom Fields on Contacts
> > Within Whispir, contacts can have Custom Fields present to store data that is not supported on the default contact profile.  Users can show this custom data for contacts by adding the `customFields=true` query parameter.

```
HTTP 1.1 GET https://api.whispir.com/contacts?apikey=<your_api_key>&customFields=true
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.contact-v1+xml
```

```go
Accept: application/vnd.whispir.contact-v1+json
```

Whispir supports extension of the default Contact Profile through the use of Custom Fields. Custom fields can support other fields that may be required to be stored on your Contacts, such as Staff ID, Internal Billing Codes, or One Up Manager.

These custom fields can be configured on any account through a Change Request to Whispir.

In order to reveal these custom fields on the contact profile, you can use the `customFields=true` flag within your API request.

`/contacts/AB38CB3EFD38AFDB?customFields=true`

## Searching for Contacts

> Searching for Contacts
> > Users can easily use further query parameters to search for specific contacts within Whispir.

```
HTTP 1.1 GET https://api.whispir.com/contacts?apikey=<your_api_key>&firstName=Sam&sortOrder=desc&sortFields=workEmailAddressPrimary
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.contact-v1+xml
```

```go
Accept: application/vnd.whispir.contact-v1+json
```

Contacts can be searched for in a given workspace by passing in valid search criteria. The search criteria usually can be any of the contact elements (field names) and will be sent in as part of the URI as query parameters.

This searching mechanism can be useful to see if any contacts exist in the system with a specific email address, phone number, or job role and so on. Simply to state, the API can help you search based on any attribute associated with the contact.

The key parameters that are required on the URL to facilitate this search are as follows:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">URI Request Elements as Query Params</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">fieldname:</td>
			<td><strong>String</strong><br/>
				Specifies the field name of the contact object. The field name could be any thing as long as it is a valid contact object.
				<br><br>
				<b>Ex:</b><br>
				http://api.whispir.com/contacts?apikey=<your_api_key><b>&firstName=Sam</b>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">sortOrder:</td>
			<td><strong>String</strong><br/>
				The order in which you require the results to be returned. Either `asc` or `desc`.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">sortFields:</td>
			<td><strong>String</strong><br/>
				The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
				<br><br>
				<b>Ex:</b><br>
				http://api.whispir.com/contacts?apikey=<your_api_key>&firstName=Sam<b>&sortFields=lastName,jobTitle</b>
			</td>
		</tr>
	</tbody>
</table>

The search can also be done inside a specific workspace if needed, by adding the workspace information in the URI.

**Note:** There is no global search feature available where one can search on all the workspaces present in the system (under allowed user permission). So, When no workspace is provided, the search is performed on the default workspace of the user.

### Searching for contacts with Custom Fields

> Searching for Contacts using Custom Fields
> > Within Whispir, contacts can have Custom Fields present to store data that is not supported on the default contact profile.  Users can search for contacts using this data using the API.

```
HTTP 1.1 GET https://api.whispir.com/contacts?apikey=<your_api_key>&custom_staffID=123456
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.contact-v1+xml
```

```go
Accept: application/vnd.whispir.contact-v1+json
```

As Whispir supports extension of the default Contact Profile through the use of Custom Fields. There may be cases where users want to search for Contacts that contain these specific fields. As such, the Whispir API supports searching for contacts using these custom fields.

Any custom field can be searched by adding the `custom_` prepended to the name.

For example, if the field name is **StaffId**, then the URL would search for:

`/contacts?custom_StaffId=12345`

## Updating Contacts

> Updating Contacts
> > The following endpoints allow users to update contacts using the Whispir API.

```
HTTP 1.1 PUT https://api.whispir.com/contacts/CB4558257DD86D09?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.contact-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:contact xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <firstName>John</firstName>
    <lastName>Wick</lastName>
    <timeZone>+8</timezone>
    <jobTitle></jobTitle>

    ... remaining of the contact object
</ns2:contact>
```

```go
Content-Type: application/vnd.whispir.contact-v1+json

{
    "firstName": "John",
    "lastName": "Wick",
    "timeZone": "+8",
    "jobTitle": "Whispir API Specialist",

    ... remaining of the contact object
}
```

> > The response to the PUT request upon success is a `204 No Content` with no content being provided.

Updating a contact can be performed using a PUT request to the `/contacts/{id}` endpoint. So, to perform this, one must be knowing the exact “link” associated with the contact.

The application must provide all the fields during the update request, even if they are not being updated. 

**Any missing fields will be automatically removed from the existing record.**

The Content-Type can be -
 
 - application/vnd.whispir.contact-v1+xml **or** 
 - application/vnd.whispir.contact-v1+json


**Note:** You cannot selectively update the contact fields needed as this is a PUT request. 

So the standard process for updating a contact record is -

1. GET /contact/{id of contact}
2. Update the contact field in the object to the required value
3. PUT /contact/{id of contact} the new object

The response to the PUT request upon success is usually a `204` with no content being provided.

## Deleting a contact

> Deleting a contact
> > The following statement allows users to delete contacts using the Whispir API.  Please note, this contact will only be deleted from the current workspace.  

```
HTTP 1.1 DELETE https://api.whispir.com/contacts/124F6B2D46A5A268?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

Deleting a contact can be performed using a DELETE request to the /contacts/{id} endpoint. So, to perform this, one must be knowing the exact “link” associated with the contact.

After performing this request, the response does not contain any information other than the headers as it is not necessary.

The user has requested to delete a contact, and when the response of `204 No Content` is returned, the contact is successfully deleted.

## Advanced Options

Whispir API provides some advanced options to perform search and data related queries on the contact information. These options can be performed by adding relevant query parameters to the URL.

### Searching with multiple criteria

> Searching with multiple search criteria
> > The following query parameters allow users to search with more than one piece of search criteria on the contact profile.

```
HTTP 1.1 GET https://api.whispir.com/contacts?apikey=<your_api_key>&firstName=Sam&lastname=gamjee
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

The API allows to search for a contact based on any attribute/ data element associated with the contact. This is not limited to just one attribute, but multiple attributes can be searched at the same time.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">URI Request Elements as Query Params</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">fieldname:</td>
			<td><strong>String</strong><br/>
				Specifies the field name of the contact object. The field name could be any thing as long as it is a valid contact object.
				<br><br>
				<b>Ex:</b><br>
				http://api.whispir.com/contacts?apikey=<your_api_key><b>&firstName=Sam&lastName=gamjee</b>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">sortOrder:</td>
			<td><strong>String</strong><br/>
				The order in which you require the results to be returned. Either `asc` or `desc`.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">sortFields:</td>
			<td><strong>String</strong><br/>
				The fields that you require the ordering to be performed on. Multiple fields can be provided, separated by a comma.
				<br><br>
				<b>Ex:</b><br>
				http://api.whispir.com/contacts?apikey=<your_api_key>&firstName=Sam<b>&sortFields=lastName,jobTitle</b>
			</td>
		</tr>
	</tbody>
</table>

### Choosing the data elements

> Choosing specific data elements to return
> > The following query parameters allow users to return data fields from the contact profile that are specifically what they are looking to retrieve.

```xml
HTTP 1.1 GET https://api.whispir.com/contacts?apikey=<your_api_key>&fields=workEmailAddress1,workMobilePhone1&firstname=Sam
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Accept: application/vnd.whispir.contact-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <status>1 to 1 of 1</status>
    <ns2:contacts>
        <ns2:contact>
            <id>DC09CC30243A51D5</id>
            <workEmailAddress1>sam@gamjee.com</workEmailAddress1>
            <workMobilePhone1>61423456789</workMobilePhone1>
            <messagingoptions/>
            <ns2:link uri="https://api.whispir.com/contacts/DC09CC30243A51D5?apikey=<your_key_api>" rel="self" method="GET"/>
        </ns2:contact>
	<ns2:contacts>
</ns2:return>
````

```go
HTTP 1.1 GET https://api.whispir.com/contacts?apikey=<your_api_key>&fields=workEmailAddress1,workMobilePhone1&firstname=Sam
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Accept: application/vnd.whispir.contact-v1+json

{
  "contacts": [{
      "id": "DC09CC30243A51D5",
		"workEmailAddress1":"sam@gamjee.com",
		"workMobilePhone1":"61423456789"
        "messagingoptions": [],
        "link": [{
          "uri": "https://api.whispir.com/contacts/DC09CC30243A51D5?apikey=<your_key_api>",
          "rel": "self",
          "method": "GET"
        }]
    }
````

When requesting the contact information, a simple GET request on the /contact API gives you the basic details of the contact.

To get all the details or fields other than the ones given by default, you have to follow the `link` and do another GET request. This can be easily skipped, by asking the API to give you specific fields and data right away in the first `GET \contact` call itself.

This can be done by passing the required fields in the URL via the `fields` parameter. You can also use this in conjunction with the search criteria. An Example use could be to get the mobile  number and the email of all contacts with firstname as 'Sam'.

