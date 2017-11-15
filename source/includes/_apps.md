# Apps

Apps serve as the Mobile App definition endpoints, where you one can register their Mobile App at Whispir, and be able to do the push notifications with the help of `/messages`, `/contacts` and `devices` endpoints.

The endpoint serves the need for 

* Whispir to store the Push Notifications credentials to facilitate Push. The entity to store this within Whispir is an 'App'.
* Your Company Administrators need visibility over the Apps that are present within the company.

> API Endpoint

> > Apps exist at Company level, and are then made available to workspaces. So, there is no workspace-id to be provided in the URL.

```xml
https://api.whispir.com/apps?apikey=<your_api_key>
Content-Type: application/vnd.whispir.app-v1+xml
```

```go
https://api.whispir.com/apps?apikey=<your_api_key>
Content-Type: application/vnd.whispir.app-v1+json
```

```
> Resource type

- application/vnd.whispir.app-v1+xml
- application/vnd.whispir.app-v1+json


> Methods supported

- GET
- POST
- PUT
- DELETE
```


To understand the relationship between your app and Whispir endpoints, refer to this image.

<br/><p style="text-align: left"><img src="images/Push-relationship.png"/><br/></p>

## Registering an App

App registration is a one time process, and once created, the app information can be used to register the pushTokens as devices (under contacts), and use the contact mri value to send the push messages to the app.

```
POST https://api.whispir.com/apps?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.app-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:app xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <name>My Push App</name>
    <description>Description of the App</description>
    <options>
        <apiKey>A valid UUID value</apiKey>
        <clientSecret>A valid UUID value without the `-` dashes</clientSecret>
        <deviceLimit>3</deviceLimit>
        <workspaces>46FEEB0398DDCE9A</workspaces>
        <contactDescriptionField>role</contactDescriptionField>
    </options>
    <apns>
        <certificate></certificate>
        <privateKey></privateKey>
    </apns>
    <apnsSandbox>
        <certificate></certificate>
        <privateKey></privateKey>
    </apnsSandbox>
    <defaultWorkspaceEnabled>true</defaultWorkspaceEnabled>
    <gcm>
        <gcmProjectNumber>0</gcmProjectNumber>
        <gcmSenderNumber>0</gcmSenderNumber>
        <gcmApiKey>GCM provided API Key</gcmApiKey>
    </gcm>
    <defaultWorkspaceEnabled>true</defaultWorkspaceEnabled>
    <managedBySystem>false</managedBySystem>
    <registrationTypes>SELF</registrationTypes>
</ns2:app>
```

```go
Content-Type: application/vnd.whispir.app-v1+json

{
 "name": "string",
 "description": "string",
 "options": {
    "apikey": "string",
    "clientSecret": "string",
    "deviceLimit": 0,
    "workspaces": "string",
    "contactDescriptionField": "string"
 },
 "apns": {
    "certificate": "string",
    "privateKey": "string"
 },
 "apnsSandbox": {
    "certificate": "string",
    "privateKey": "string"
 },
 "gcm": {
    "gcmProjectId": "string",
    "gcmSenderNumber": "string",
    "gcmApiKey": "string"
 },
 "defaultWorkspaceEnabled": true,
 "managedBySystem" : true,
 "registrationTypes": [
    "SELF"
 ]
}
```

> > The successful response will be a 201 with the details of the app created and its associated unique `appID`. Also, for security reasons, Whispir will NOT show the APNS certificate information at any time post app creation. The API response will only show the certificateDate so that one can use that to update the certificate upon expiry.


Almost all the fields are mandatory. So, please ensure the information is provided properly.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">name:</td>
			<td><strong>String</strong><br/>
				Specifies the name of the application
			</td>
			<td>
				<b>Required.</b> Alphanumeric. Max length: 32 <br>
				<b>Sample:</b> My Awesome Application
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">description:</td>
			<td><strong>String</strong><br/>
				The description of the application for display within Whispir and whispir.io 
			</td>
			<td>
				Not Required. Alphanumeric. No max length. Default: "" <br>
				<b>Sample:</b> App for sending messages to My Awesome App
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">options.apiKey:</td>
			<td><strong>string</strong><br/>
				A unique username tied to this app for usage monitoring purposes
			</td>
			<td>
				Not Required. Alphanumeric. Generated if not provided <br>
				<b>Sample:</b> dfsdfsfds09fds-asdf9dsf-asdf9dfsa
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">options.clientSecret:</td>
			<td><strong>string</strong><br/>
				The password tied to the apiKey and used by this app for usage monitoring purposes
			</td>
			<td>
				Not Required. Alphanumeric. Max length 64 chars. Can use `.` as special character <br>
				<b>Sample:</b> dfsdfsfds09fds.lkrt
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">options.deviceLimit:</td>
			<td><strong>Numeric</strong><br/>
				The number of devices that are allowed to be registered under a single contact per app
			</td>
			<td>
				Not Required. Numeric. Default: 3 <br>
				<b>Sample:</b> 3
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">options.workspaces:</td>
			<td><strong>String</strong><br/>
				The comma separated list of Workspace IDs that will make this application usable/visible for messages sendout in those workspaces.
			</td>
			<td>
				Not Required. Alphanumeric. No max length. Default: "" <br>
				<b>Sample:</b> <a-workspace-id>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">options.contactDescriptionField:</td>
			<td><strong>String</strong><br/>
				The field on the contact profile that should be used to distinguish between contacts with the same name within the user list (mobile applications only).

<br> E.g. if you call the /app/users endpoint and receive 3 people named 'John Smith', how does a user differentiate between them? The contactDescriptionField provides a secondary mechanism to display a 'Role', 'JobTitle' or 'BusinessUnit' to help distinguish between similar contacts.
			</td>
			<td>
				Not Required. Alphanumeric. No max length. Default: "". <br> <b>Note:</b> should reference a Whispir Contact Profile Field. <br>
				<b>Sample:</b> jobTitle
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">apns.certificate:</td>
			<td><strong>String</strong><br/>
				The APNS Push Notifications certificate that has downloaded from the iOS developer console
			</td>
			<td>
				Single line. Alphanumeric. No max length. Default: "" <br>
				<b>Sample:</b> -----BEGIN CERTIFICATE-----\nMIIGSjCCBTKgAwIBAgIICdjQ9d41eiYwDQYJKoZIhvcNAQELBQAwgZYxCzAJ.....\n-----END CERTIFICATE----- <br>
				<b>IMP:</b> You must ensure that the value is provided in a single line only with the use of `\n` to specify the line breaks. If you have .p12, then use any of the valid converter tools to extract the certificate, and private key correctly.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">apns.privateKey:</td>
			<td><strong>String</strong><br/>
				The APNS Push Notifications private key from the certificate chain that was downloaded from the iOS developer console
			</td>
			<td>
				Single line. Alphanumeric. No max length. Default: "" <br>
				<b>Sample:</b> -----BEGIN PRIVATE KEY-----\nMIIGSjCCBTKgAwIBAgIICdjQ9d41eiYwDQYJKoZIhvcNAQELBQAwgZYxCzAJ.....\n-----END PRIVATE KEY----- <br>
				<b>IMP:</b> You must ensure that the value is provided in a single line only with the use of `\n` to specify the line breaks.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">apnsSandbox.certificate:</td>
			<td><strong>String</strong><br/>
				The APNS Push Notifications Sandbox certificate that has downloaded from the iOS developer console
			</td>
			<td>
				Single line. Alphanumeric. No max length. Default: "" <br>
				<b>Sample:</b> -----BEGIN CERTIFICATE-----\nMIIGSjCCBTKgAwIBAgIICdjQ9d41eiYwDQYJKoZIhvcNAQELBQAwgZYxCzAJ.....\n-----END CERTIFICATE----- <br>
				<b>IMP:</b> You must ensure that the value is provided in a single line only with the use of `\n` to specify the line breaks. These values are usually different from the above values.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">apnsSandbox.privateKey:</td>
			<td><strong>String</strong><br/>
				The APNS Push Notifications Sandbox private key from the certificate chain that was downloaded from the iOS developer console
			</td>
			<td>
				Single line. Alphanumeric. No max length. Default: "" <br>
				<b>Sample:</b> -----BEGIN PRIVATE KEY-----\nMIIGSjCCBTKgAwIBAgIICdjQ9d41eiYwDQYJKoZIhvcNAQELBQAwgZYxCzAJ.....\n-----END PRIVATE KEY----- <br>
				<b>IMP:</b> You must ensure that the value is provided in a single line only with the use of `\n` to specify the line breaks.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">gcm.gcmProjectId:</td>
			<td><strong>String</strong><br/>
				The Project ID from the Google Cloud Messaging Console
			</td>
			<td>
				Alphanumeric. No max length. Default: "" <br>
				<b>Sample:</b> My-Sample-Project
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">gcm.gcmSenderNumber:</td>
			<td><strong>String</strong><br/>
				The Sender ID from the Google Cloud Messaging Console
			</td>
			<td>
				Numeric. No max length. Default: "" <br>
				<b>Sample:</b> 1000202045211
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">gcm.gcmApiKey:</td>
			<td><strong>String</strong><br/>
				The GCM API Key from the Google Cloud Messaging Console
			</td>
			<td>
				AlphaNumeric. No max length. Default: "" <br>
				<b>Sample:</b> fcde7ecfdefc6defcfde7faacbd637ca
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">defaultWorkspaceEnabled:</td>
			<td><strong>String</strong><br/>
				Whether or not 'My Company' should be supported within this application.
			</td>
			<td>
				Not Required. Boolean. Default: false <br>
				<b>Sample:</b> true
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">managedBySystem:</td>
			<td><strong>String</strong><br/>
				Whether or not this application has been automatically created by Whispir (vs created by a user).
			</td>
			<td>
				Not editable by a user. Generated field. <br>
				<b>Sample:</b> N/A
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">registrationTypes:</td>
			<td><strong>String</strong><br/>
				The array of registration types that are supported by this particular application 
				<ul>
					<li>SELF</li>
					<li>INVITE</li>
				</ul>
			</td>
			<td>
				<b>SELF:</b> Used for Apps, where Whispir is given the push Token readily by you. This is the common scenario for almost all the apps. <br>
				<b>INVITE:</b> Used for Apps, where Whispir's Mobile SDK is used inside your App, and it captures the push Token upon app Installation, and passes to Whispir for registration of the device.
			</td>
		</tr>
	</tbody>
</table>

*Note: * Do NOT try to register both an APNS, and GCM app underr a single app. Doing so would result in failed Push Notifications.

## Updating an App

Updating an exisiting app is done via the PUT request on the `/apps/{:aid}` endpoint. 

Please remember that you do not need to pass on the APNS certificates every time, only do so, if there is a need to update the certificate values.

> Updating Apps
> > The following endpoints allow users to update contact's devices using the Whispir API.

```
HTTP 1.1 PUT https://api.whispir.com/apps/{:aid}?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.app-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:app xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <id>521BBA863C2C230BD0E1BBA86</id>
    <name>My Push App</name>
    <description>Description of the App</description>
    <options>
        <apiKey>A valid UUID value</apiKey>
        <clientSecret>A valid UUID value without the `-` dashes</clientSecret>
        <deviceLimit>3</deviceLimit>
        <workspaces>46FEEB0398DDCE9A</workspaces>
        <contactDescriptionField>jobTitle</contactDescriptionField>
    </options>
    <apns>
        <certificateDate>2017-03-21T00:59:08.930Z</certificateDate>
    </apns>
    <apnsSandbox>
        <certificateDate>2017-03-21T00:59:08.930Z</certificateDate>
    </apnsSandbox>
    <defaultWorkspaceEnabled>true</defaultWorkspaceEnabled>
    <gcm>
        <gcmProjectNumber>0</gcmProjectNumber>
        <gcmSenderNumber>0</gcmSenderNumber>
        <gcmApiKey>GCM provided API Key</gcmApiKey>
    </gcm>
    <defaultWorkspaceEnabled>true</defaultWorkspaceEnabled>
    <managedBySystem>false</managedBySystem>
    <registrationTypes>SELF</registrationTypes>
</ns2:app>
```

```go
Content-Type: application/vnd.whispir.app-v1+json

{
    "id": "521BBA863C2C230BD0E1BBA86",
    "name": "My Push App",
    "description": "Description of the App",
    "options": {
        "apiKey": "A valid UUID value",
        "deviceLimit": "3",
        "workspaces": "EBDCE9A46FE0398D",
	"contactDescriptionField" : "jobTitle"
    },
    "gcm": {
        "gcmProjectNumber": 0
    },
    "apns": {
        "certificateDate": "2017-03-21T00:59:08.930Z"
    },
    "apnsSandbox": {
        "certificateDate": "2017-03-21T00:59:08.930Z"
    },
    "registrationTypes": [
        "SELF"
    ],
    "managedBySystem": false,
    "defaultWorkspaceEnabled": true,
}
```

> > The response to the PUT request upon success is a `204 No Content` with no content being provided.


## Deleting an App

> Deleting an App
> > The following statement allows users to delete an App using the Whispir API.  Please note, this app cannot be recovered back once deleted, and you must also ensure that the devices that are referreing to this App are also promptly either deleted or updated to refer to a new App.

```
HTTP 1.1 DELETE https://api.whispir.com/apps/{:aid}?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

Deleting an App can be performed using a DELETE request to the /apps/{:aid} endpoint. So, to perform this, one must be knowing the exact “link” associated with the app.

After performing this request, the response does not contain any information other than the headers as it is not necessary. 

The response of `204 No Content` is returned, indicating that the app is successfully deleted.

## Important Note

The endpoint is purely tied to creation of Apps for push notifications. This endpoint has nothing to do with the Apps that you create in the Whispir.io to get your API Keys.

