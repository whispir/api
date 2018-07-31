#Workspaces

> API Endpoint

> > - generic

```xml
https://api.<region>.whispir.com/workspaces/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.workspace-v1+xml
```

```go
https://api.<region>.whispir.com/workspaces/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.workspace-v1+json
```

```
> Resource type

- application/vnd.whispir.workspace-v1+xml
- application/vnd.whispir.workspace-v1+json


> Methods supported

- GET
- POST
```

Workspace allows application developers to create new work areas for the varying use cases of their application. They provides different functions that can be provided to users of the application, e.g. creating messages, executing scenarios, or viewing distribution lists. 

Every account upon creation is given a default workspace. All operations are usually carried out in the default workspace. To separate the concerns, one can create multiple (there is no limit) workspaces suited for each of their application needs. 

Each of these work areas are independent from one another and can be governed by user permissions. So, users can be assigned access to these workspaces to restrict the control of information as needed. So, the information, assets, contacts, actions performed in workspace does not or cannot be accessed from another one. This allows the applications to be independent and audited much effectively with proper permissions and keys.


## Creating a new workspace

```
HTTP 1.1 POST https://api.<region>.whispir.com/workspaces?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```xml
Content-Type: application/vnd.whispir.workspace-v1+xml 


<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:workspace xmlns:ns2="http://schemas.api.<region>.whispir.com/dap" xmlns:ns3="http://schemas.api.<region>.whispir.com">
    <projectName>A Space Odessey</projectName>
    <projectNumber>2000</projectNumber>
    <status>A</status>
    <billingcostcentre>Hollywood</billingcostcentre>
</ns3:workspace>
```

```go
Content-Type: application/vnd.whispir.workspace-v1+json

{
  "projectName": "A Space Odessey",
  "projectNumber": "2001",
  "status": "A",
  "billingcostcentre": "Hollywood"
}
```

To create a new workspace, you can use the /workspaces endpoint.

Only **2 fields** are required:

1. projectName - The name of the Workspace to be created.
2. status - The status of the Workspace being created.  This should be 'A' for 'Active' when creating new workspaces.

Note: There is no limit to the amount of workspaces each API user can create.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">projectName :</td>
			<td><strong>String</strong><br/>
				Specifies the name of the Workspace to be created.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">projectNumber:</td>
			<td><strong>String</strong><br/>
				Specifies the reference ID for the workspace from the User Side. Generally not used. <br>
<b>Note</b>: This is not the actual workspace ID. It is just a custom reference ID given by you for your own purposes.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">status:</td>
			<td><strong>String</strong><br/>
				Specifies the status of the Workspace being created. The status can be one of - 
				<ul>
					<li>Active (A)</li>
					<li>Disabled (D)</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">billingcostcentre:</td>
			<td><strong>String</strong><br/>
				<strong>Only applicable to customers with the Billing Cost Centre Module enabled.</strong> Allows the user to set a billing cost centre for the Workspace.
			</td>
		</tr>
	</tbody>
</table>

## Retrieving Workspaces

To retrieve a list of workspaces from the Whispir.io API you can execute an HTTP GET using the /workspaces endpoint.

```
HTTP 1.1 GET https://api.<region>.whispir.com/workspaces?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```xml
Accept: application/vnd.whispir.workspace-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.<region>.whispir.com/dap" xmlns:ns3="http://schemas.api.<region>.whispir.com">
    <status>1 to 4 of 4</status>
    <ns2:workspaces>
        <ns2:workspace>
	    <id>BB9ECBE5BA73CD81</id>
	    <projectName>Sales Lead Notifications</projectName>
            <projectNumber></projectNumber>
            <status>A</status>
            <billingcostcentre>test</billingcostcentre>
            <ns2:link uri="https://api.<region>.whispir.com/workspaces/BB9ECBE5BA73CD81?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:workspace>
        <ns2:workspace>
            <id>7311ABEB701E7C60</id>
	    <projectName>Product Release Management</projectName>
            <projectNumber></projectNumber>
            <status>A</status>
            <billingcostcentre>0</billingcostcentre>
            <ns2:link uri="https://api.<region>.whispir.com/workspaces/7311ABEB701E7C60?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:workspace>
        <ns2:workspace>
            <id>26B1A09C1FEC20A2</id>
	    <projectName>CAAS</projectName>
            <projectNumber></projectNumber>
            <status>A</status>
            <billingcostcentre>0</billingcostcentre>
            <ns2:link uri="https://api.<region>.whispir.com/workspaces/26B1A09C1FEC20A2?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:workspace>
        <ns2:workspace>
            <id>A358845BF004C113</id>
	    <projectName>Business Working Group</projectName>
            <projectNumber></projectNumber>
            <status>A</status>
            <billingcostcentre>CLSA</billingcostcentre>
            <ns2:link uri="https://api.<region>.whispir.com/workspaces/A358845BF004C113?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:workspace>
        <ns2:workspace>
            <projectName>Critical Incident Management</projectName>
            <projectNumber></projectNumber>
            <status>A</status>
            <billingcostcentre></billingcostcentre>
            <ns2:link uri="https://api.<region>.whispir.com/workspaces/B7BFEF555F0F7F81?apikey=[your_api_key]" rel="self" method="GET"/>
       </ns2:workspace>
    </ns2:workspaces>
</ns2:return>
```

```go
Accept: application/vnd.whispir.workspace-v1+json

{
  "workspaces": [
    {
      "id": "7311ABEB701E7C60",
      "projectName": "Sales Lead Notifications",
      "projectNumber": "",
      "status": "A",
      "billingcostcentre": "0",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/workspaces/7311ABEB701E7C60?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "id": "26B1A09C1FEC20A2",
      "projectName": "Product Release Management",
      "projectNumber": "",
      "status": "A",
      "billingcostcentre": "0",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/workspaces/26B1A09C1FEC20A2?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "id": "A358845BF004C113",
      "projectName": "Business Working Group",
      "projectNumber": "",
      "status": "A",
      "billingcostcentre": "CLSA",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/workspaces/A358845BF004C113?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "id": "B7BFEF555F0F7F81",
      "projectName": "Critical Incident Management",
      "projectNumber": "",
      "status": "A",
      "billingcostcentre": "",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/workspaces/B7BFEF555F0F7F81?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    }
   ]
}
```

You will need to supply one of the following headers (for retrieving JSON or XML):

 * Accept: application/vnd.whispir.workspace-v1+xml
 * Accept: application/vnd.whispir.workspace-v1+json

An array of Workspaces will be returned to you in the HTTP response body.

Each of these workspace will provide the following information:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Response Elements</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">projectName :</td>
			<td><strong>String</strong><br/>
				Specifies the name of the Workspace to be created.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">projectNumber:</td>
			<td><strong>String</strong><br/>
				Specifies the reference ID for the workspace from the User Side. Generally not used. <br>
<b>Note</b>: This is not the actual workspace ID. It is just a custom reference ID given by you for your own purposes.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">status:</td>
			<td><strong>String</strong><br/>
				Specifies the status of the Workspace being created. The status can be one of - 
				<ul>
					<li>Active (A)</li>
					<li>Disabled (D)</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">billingcostcentre:</td>
			<td><strong>String</strong><br/>
				<strong>Only applicable to customers with the Billing Cost Centre Module enabled.</strong> Allows the user to set a billing cost centre for the Workspace.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">link:</td>
			<td><strong>Array</strong><br/>
				Provides a list of URLs that can be used to manipulate or access the workspace. 
				<br>
				<ul>
					<li>uri - the link to access the workspace</li>
					<li>rel - the descriptor for what the link will do</li>
					<li>method - the HTTP method to use with this particular link</li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>

## Updating, Deleting a workspace

Workspaces can only be created and retrieved. They **cannot** be updated or deleted via the API. 

One has to use the Platform for this need.
