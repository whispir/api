# Imports

> API Endpoint

> > - generic

```xml
https://api.whispir.com/imports/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.import-v1+xml
```

```go
https://api.whispir.com/imports/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.import-v1+json
```

> > - limited to a workspace

```xml
https://api.whispir.com/workspaces/{:id}/imports/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.import-v1+xml
```

```go
https://api.whispir.com/workspaces/{:id}/imports/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.import-v1+json
```

```
> Methods supported

- POST
```

The imports endpoint allows users to import a CSV/JSON/XML file of contacts (via /resources) to be added to the contacts database. 

This is slightly different from the contact API as it doesn't support the deleting of contacts. It will only add and update.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Method Description</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">GET</td>
			<td>
				METHOD not supported
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">POST</td>
			<td>
				/imports
				<ul>
					<li>
					Invokes the import process into the My Company workspace with the specified resource
					</li>
				</ul>
				/imports/{:id}
				<ul>
					<li>
					METHOD not supported
					</li>
				</ul>
				/workspaces/(id)/imports
				<ul>
					<li>
					Invokes the import process into the specified workspace with the specified resource.
					</li>
				</ul>
				/workspaces/(id)/imports/{:id}
				<ul>
					<li>
					METHOD not supported
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">PUT</td>
			<td>
				METHOD not supported
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">DELETE</td>
			<td>
				METHOD not supported
			</td>
		</tr>
	</tbody>
</table> 

##  Bulk contact import

The Whispir API will expose this functionality as a two stage process:
 1. Submit contact data within a CSV, JSON, XML payload using the /resource endpoint – which will return a resource ID,
 2. Create a new import resource by submitting a POST to the /imports endpoint referencing the resource ID created in step 1.

These two stages are further explained below.

### Create a resource specifying the contact information

Applications can upload a valid CSV, XML or JSON resource containing the contact information that will be imported into the Whispir Platform. Whispir will return the resource ID which can be used to import or update contacts within a workspace through the imports endpoint as described below.

#### Request Structure

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:import xmlns:ns2="http://schemas.api.whispir.com" 
             xmlns:ns3="http://schemas.api.whispir.com/dap">
    <ns2:contacts>
        <ns2:contact>
            <firstName>John</firstName>
            <lastName>Smith</lastName>
            <workEmailAddress1>john.smith@testcompany.com</workEmailAddress1>
            <workMobilePhone1>61423456789</workMobilePhone1>
            <workCountry>Australia</workCountry>
            <timezone>+10</timezone>
        </ns2:contact>
        <ns2:contact>
            <firstName>Jane</firstName>
            <lastName>Smith</lastName>
            <workEmailAddress1>jane.smith@testcompany.com</workEmailAddress1>
            <workMobilePhone1>61498765432</workMobilePhone1>
            <workCountry>Australia</workCountry>
            <timezone>+10</timezone>
        </ns2:contact>
   </ns2:contacts>
</ns2:import>
```

```go
{
  "contacts" : [{
    "firstName": "John",
    "lastName": "Smith",
    "workEmailAddress1": "john.smith@testcompany.com",
    "workMobilePhone1": "61423456789",
    "workCountry": "Australia",
    "timezone": "+10"
  },{
    "firstName": "Jane",
    "lastName": "Smith",
    "workEmailAddress1": "jane.smith@testcompany.com",
    "workMobilePhone1": "61498765432",
    "workCountry": "Australia",
    "timezone": "+10"
  }]
}
```

Firstly, the application needs to upload a resource using the Creating Resources.

The resource that needs to be provided for contact importing should be in one the following format:

- XML
- JSON
- CSV

```
> > CSV format

firstName,lastName,workEmailAddress1,workMobilePhone1,workCountry,timezone
John,Smith,john.smith@testcompany.com,61423456789,Australia,+10
Jane,Smith,jane.smith@testcompany,com,61498765432,Australia,+10
```

Once this resource has been imported with the appropriate mime type, the application can reference this resource within the import request.

### Import a resource using the imports endpoint

```
> Import

> > Doing an import by mapping the respective data columns to contact fields

HTTP 1.1 POST https://api.whispir.com/imports?apikey=DFD0FD90u809SDF90832FDS
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
Accept: application/vnd.whispir.import-v1+json

{
    "resourceId": "4FBBC384BCE3DAABFE3",
    "importType" : "contact",
    "importOptions": {
        "fieldMapping" : {
            "firstName": "name",
            "lastName": "surname",
            "workMobilePhone1": "work_mobile",
            "country": "Australia",
            "timezone": "+10"
        },
        "importMode" : "replace"
    }

}
```

```
> > If the request was successful, the response contains the information for the calling application to retrieve information about the import process that has been started.

...
HTTP 1.1 202 Accepted
...
```

After receiving a valid resource ID, applications can make a request to the imports endpoint within a workspace and reference the appropriate resource ID. Whispir will then create an import process that will import the specified data into the workspace.

Once the application has an appropriate resource ID to use within the import endpoint, the following request can be used to begin the import process.

**Note:** Import processes take place asynchronously. Any contacts will be created once the import process starts, and users will be able to utilise imported contacts as soon as each is completed.



<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High Level Request Elements</th>
        </tr>
		<tr>
            <th style="width: 50%">Field</th>
            <th style="width: 50%">Details</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">resourceId:</td>
			<td>
				Description
				<ul>
					<li>
					The resource identifier returned from the POST to /resources. Resource referred to must be a valid CSV, XML, or JSON file.
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				Sample Value
				<ul>
					<li>
					4FBBC384BCE3DAABFE3
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">importType:</td>
			<td>
				Description
				<ul>
					<li>
					This defines the resource that will be created through this import process.
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				Available Values
				<ul>
					<li>
					<b>Contact</b> is the only supported importType at this stage.
					</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">importOptions</td>
			<td>
				Description
				<ul>
					<li>
					The list of options that are passed through to the import engine.
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				Available Values
				<ul>
					<li>fieldMapping</li>
					<li>importMode</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: left; font-weight: bold;" colspan="2">importMode</td>
		</tr>
		<tr>
			<td colspan="2">
				Description
				<ul>
					<li>
					The type of contact import that is occurring.
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				One of three options available: 
				<ul>
					<li>replace</li>
					<li>duplicate</li>
					<li>ignore</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: left; font-weight: bold;" colspan="2">fieldMapping</td>
		</tr>
		<tr>
			<td colspan="2">
				Description
				<ul>
					<li>
					Mapping the data column in your resource file to the contact field value. 
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				The following are the mandatory fields to be present and also to be mapped from the resource file: 
				<ul>
					<li>firstName</li>
					<li>lastName</li>
					<li>workMobilePhone1</li>
					<li>workCountry</li>
					<li>timezone</li>
				</ul>
				The fieldMapping section is used to map field/value pairs within a resource to the field/value pairs within a Whispir contact profile

- fieldMapping elements must use fields that exist within the resource payload. Any incorrect resource field will return a blank value.
- fieldMapping elements must be valid Whispir Contact fields, ie; "firstName".

The complete listing of Contact fields are defined within the [contacts](https://whispir.github.io/api/#creating-new-contacts) API documentation:

- fieldMapping can include custom contact fields previously setup within your organisations Contact profile.

- The minimum requirement must be fulfilled for a contact to be created, this includes firstName, lastName, and one of personalEmailAddress1, workEmailAddress1, workMobilePhone1, personalMobilePhone1, workCountry and timezone.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">firstName</td>
			<td>
				Description
				<ul>
					<li>
					First Name of the Contact. Value of this field is used to map the field within the resource.
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				Sample value
				<ul>
					<li>name</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">lastName</td>
			<td>
				Description
				<ul>
					<li>
					Last Name of the Contact. Value of this field is used to map the field within the resource.
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				Sample value
				<ul>
					<li>surname</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">workMobilePhone1</td>
			<td>
				Description
				<ul>
					<li>
					The mobile phone number of the Contact. Value of this field is used to map the field within the newly created resource.
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				Sample value
				<ul>
					<li>Mobile</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">workCountry</td>
			<td>
				Description
				<ul>
					<li>
					The country field of the contact. The value of this field is used to map to the field within the newly created contact.
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				Sample value
				<ul>
					<li>Australia</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">timezone</td>
			<td>
				Description
				<ul>
					<li>
					The timezone field of the contact. The value of this field is used to map to the timezone field within the newly created contact.
					</li>
				</ul>
				Required
				<ul>
					<li>
					Both Tag and Value
					</li>
				</ul>
				Sample value
				<ul>
					<li> +10 </li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>