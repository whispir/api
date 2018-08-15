# Contact Devices

Unlike SMS, or EMail, where the recipient is an adhoc phone number, or email, Push in Whispir has to be sent to registered contacts. So, sending Push by putting in the push-token in "to" field is not allowed. The reason for this primarily is the way Push works. A push/device token alone is not suffecient for the push to succeed, it needs the API Keys (in GCM), and Certificates (in APNS) of your App too. Providing that information in every API call is costly and troublesome, so Whispir has consciouly built the product to reduce the friction from such calls and into a simple pre-registered Apps and contact-devices method.

So, to send a push notification to a user device, one has to register the push token as a device under a contact. The device is a combination of device token, app platform information (APN, GCM, ...), and other meta data that helps Whispir to manage and do push properly.


> API Endpoint

> > - generic

```xml
https://api.<region>.whispir.com/contacts/{:contact-id}/devices?apikey=<your_api_key>
Content-Type: application/vnd.whispir.contactdevice-v1+xml
```

```go
https://api.<region>.whispir.com/contacts/{:contact-id}/devices?apikey=<your_api_key>
Content-Type: application/vnd.whispir.contactdevice-v1+json
```

> > - limited to a workspace

```xml
https://api.<region>.whispir.com/workspaces/{:workspace-id}/contacts/{:contact-id}/devices?apikey=<your_api_key>
Content-Type: application/vnd.whispir.contactdevice-v1+xml
```

```go
https://api.<region>.whispir.com/workspaces/{:workspace-id}/contacts/{:contact-id}/devices?apikey=<your_api_key>
Content-Type: application/vnd.whispir.contactdevice-v1+json
```

```
> Resource type

- application/vnd.whispir.contactdevice-v1+xml
- application/vnd.whispir.contactdevice-v1+json


> Methods supported

- GET
- POST
- PUT
- DELETE
```

A Device is a sub-resource to contact, and a Contact can have minimum of 0 to a maximum of 3 devices by default. However, the 3 device limit can be raised to a 10 depending on your app profile needs. Such limit is set during the <a href="#registering-an-app"> App Registration </a>

To understand the relationship easily, refer to the `apps` section.



##Creating new Devices

> Creating new Devices
> > New Devices can only be created under a given contact easily by following the request structure

```
POST https://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}/devices?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: your_api_key
```

```xml
Content-Type: application/vnd.whispir.contactdevice-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:device xmlns:ns2="http://schemas.api.<region>.whispir.com" xmlns:ns3="http://schemas.api.<region>.whispir.com/dap">
    <deviceName>Device 1</deviceName>
    <appId>B1A24A8BF2DBB10E</appId>
    <platform>APNS</platform>
    <deviceOS>IOS 7</deviceOS>
    <deviceModel>Iphone 7 Plus</deviceModel>
    <status>active</status>
    <pushToken>15a01046 16f6f4f9 2f2055b5 f12d2c93 a70de908 487762f9 7b6c7115 e30083b1</pushToken>
</device>
```

```go
Content-Type: application/vnd.whispir.contactdevice-v1+json

{
    "deviceName": "BCDF6B61-CA55-F287FF272101-4496-9DA9",
    "appId": "B1A24A8BF2DBB10E",
    "platform": "APNS",
    "deviceOS": "IOS 9",
    "deviceModel": "Iphone X",
    "status": "active",
    "pushToken": "15a01046 16f6f4f9 2f2055b5 f12d2c93 a70de908 487762f9 7b6c7115 e30083b1"
}
```

> > The successful response will be a 201 with the details of the device created and its associated unique `deviceID`.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:device xmlns:ns2="http://schemas.api.<region>.whispir.com" xmlns:ns3="http://schemas.api.<region>.whispir.com/dap">
    <id>1B0C3FC62D59BF90</id>
    <deviceName>Device 1</deviceName>
    <appId>B1A24A8BF2DBB10E</appId>
    <registrationDate>2017-11-17</registrationDate>
    <lastModifiedDate>2017-11-17</lastModifiedDate>
    <platform>APNS</platform>
    <deviceOS>IOS</deviceOS>
    <deviceModel>Iphone 7 Plus</deviceModel>
    <status>active</status>
    <pushToken>15a01046 16f6f4f9 2f2055b5 f12d2c93 a70de908 487762f9 7b6c7115 e30083b1</pushToken>
    <ns3:link uri="https://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}/devices/1B0C3FC62D59BF90?apikey=[your api key]" rel="self" method="GET"/>
    <ns3:link uri="https://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}/devices/1B0C3FC62D59BF90?apikey=[your api key]" rel="updateDevice" method="PUT" type="application/vnd.whispir.contactdevice-v1+json,application/vnd.whispir.contactdevice-v1+xml"/>
    <ns3:link uri="https://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}/devices/1B0C3FC62D59BF90?apikey=[your api key]" rel="deleteDevice" method="DELETE"/>
</device>
```

```go
{
    "id": "1B0C3FC62D59BF90",
    "deviceName": "BCDF6B61-CA55-F287FF272101-4496-9DA9",
    "appId": "B1A24A8BF2DBB10E",
    "registrationDate":"2017-11-17",
    "lastModifiedDate":"2017-11-17",
    "platform": "APNS",
    "deviceOS": "IOS 9",
    "deviceModel": "Iphone X",
    "status": "active",
    "pushToken": "15a01046 16f6f4f9 2f2055b5 f12d2c93 a70de908 487762f9 7b6c7115 e30083b1",
  "link": [
    {
      "uri": "https://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}/devices/1B0C3FC62D59BF90?apikey=[your api key]",
      "rel": "self",
      "method": "GET"
    },
    {
      "uri": "https://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}/devices/1B0C3FC62D59BF90?apikey=[your api key]",
      "rel": "updateDevice",
      "method": "PUT",
      "type": "application/vnd.whispir.contactdevice-v1+json,application/vnd.whispir.contactdevice-v1+xml"
    },
    {
      "uri": "https://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}/devices/1B0C3FC62D59BF90?apikey=[your api key]",
      "rel": "deleteDevice",
      "method": "DELETE"
    }
  ]
}
```

To create a new device, you can use the `/contacts/{:cid}/devices` endpoint. The method is POST. Ensure that the following mandatory fields are provided for.

The following fields are required:

- deviceName
- appId
- platform
- deviceOS
- appVersion
- deviceModel
- pushToken

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">deviceName:</td>
			<td><strong>String</strong><br/>
				Specifies the name of the device for visual reference in UI
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">appId:</td>
			<td><strong>String</strong><br/>
				Specifies the ID of the app the device is installed with. This ID refers to the Apps Endpoint > App ID
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">appVersion:</td>
			<td><strong>String</strong><br/>
				The version of your App installed on the user device. This is purely meta information that helps to understand the push success/failure based on app version if any.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">platform:</td>
			<td><strong>String</strong><br/>
				Specifies the app's platform. The value can be one of - 
				<ul>
          <li>APNS - for Production APNS apps</li>
					<li>APNS_SANDBOX - for Sandbox APNS apps</li>
					<li>GCM - for FCM/GCM Apps</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">deviceOS:</td>
			<td><strong>String</strong><br/>
				Specifies the device OS. The value can be one of - 
				<ul>
					<li>IOS</li>
					<li>Android</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">deviceModel:</td>
			<td><strong>String</strong><br/>
				Specifies the model of the user device
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">status:</td>
			<td><strong>String</strong><br/>
				Specifies the status of the device. Push will be only sent to the active devices under a given contact. It can be one of
				<ul>
					<li>ACTIVE (A)</li>
					<li>DISABLED (D)</li>
					<li>DELETED (E)</li>
				</ul>
				Note: The default value is "Active".
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">pushToken:</td>
			<td><strong>String</strong><br/>
				Specifies the pushToken .a.k.a. deviceToken given to your app by APNS/GCM to receive the push notification. 
			</td>
		</tr>
	</tbody>
</table>

### Notes:
* Ensure that the deviceName is unique for each device.
* Ensure that the values for deviceOS, deviceModel are properly set. Do not leave them as blank or give invalid/erroneous data. These values are the ones that are shown on the UI and in the reports. So proper values gives you an easier way to identify the devices under a given contact.
* Ensure that before the Device is created, you have the appID, and the push token values available.
* A contact can have as many number of devices needed, but limited to the value set in the `deviceLimit` in APP creation on the /apps endpoint. You can set it to a maximum of 10 per contact.

## Retrieving Devices

> Retrieving the list of Devices under a Contact
> > Devices can easily be retrieved from the Whispir API using the following endpoints:

```
HTTP 1.1 GET https://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: your_api_key
```

```xml
Accept: application/vnd.whispir.contact-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.<region>.whispir.com/dap" xmlns:ns3="http://schemas.api.<region>.whispir.com">
        <ns2:contact>
            <id>AF48A9EC3F02E43C</id>
            <firstName>Fred</firstName>
            <lastName>Smith</lastName>
            <status>A</status>
            <messagingoptions/>
            <devices/>
            <ns2:link method="GET" 
                      rel="self" 
                      uri="http://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}?apikey=<your_api_key>"/>
        </ns2:contact>
</ns2:return>
```

```go
Accept: application/vnd.whispir.contact-v1+json

{
    {
      "id": "AF48A9EC3F02E43C",
      "firstName": "Fred",
      "lastName": "Smith",
      "status": "A",
      "messagingoptions": [],
      "devices":[], //list of devices as array of objects if any
      "link": {
        "method": "GET",
        "rel": "self",
        "uri": "http://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}?apikey=<your_api_key>"
      }
    }
}
```

Devices are sub-resource to Contacts. So, Devices belonging to a specific contact can be retrieved quite easily with a GET request to the `/workspaces/{:wid}/contacts/{:cid}`. A simple `workspaces/{:wid}/contacts/{:cid}` will result in all devices being retrieved for that contact with all of their information under the `devices` key. No filters are applied.

*Note:* Deleted devices cannot be retrieved. Only the "Active" and "Disabled" status devices can be seen


## Updating Devices

> Updating Contact Devices
> > The following endpoints allow users to update contact's devices using the Whispir API.

```
HTTP 1.1 PUT https://api.<region>.whispir.com/workspaces/{:wid}/contacts/{:cid}/devices/{:did}?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: your_api_key
```

```xml
Content-Type: application/vnd.whispir.contactdevice-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<<ns2:device xmlns:ns2="http://schemas.api.<region>.whispir.com" xmlns:ns3="http://schemas.api.<region>.whispir.com/dap">
    <deviceName>Device 1</deviceName>
    <appId>B1A24A8BF2DBB10E</appId>
    <platform>APNS</platform>
    <deviceOS>IOS 9</deviceOS>
    <deviceModel>Iphone 7 Plus</deviceModel>
    <status>active</status>
    <pushToken>15a01046 16f6f4f9 2f2055b5 f12d2c93 a70de908 487762f9 7b6c7115 e30083b1</pushToken>
</device>
```

```go
Content-Type: application/vnd.whispir.contactdevice-v1+json

{
    "deviceName": "BCDF6B61-CA55-F287FF272101-4496-9DA9",
    "appId": "B1A24A8BF2DBB10E",
    "platform": "APNS",
    "deviceOS": "IOS 9",
    "deviceModel": "Iphone 8",
    "status": "active",
    "pushToken": "15a01046 16f6f4f9 2f2055b5 f12d2c93 a70de908 487762f9 7b6c7115 e30083b1"
}
```

> > The response to the PUT request upon success is a `204 No Content` with no content being provided.

Updating a device can be performed using a PUT request to the `/contacts/{:cid}/devices/{:did}` endpoint. So, to perform this, one must be knowing the exact “link” associated with the contactdevice.

The application must provide all the fields during the update request, even if they are not being updated. 

The Content-Type can be -
 
 - application/vnd.whispir.contactdevice-v1+xml **or** 
 - application/vnd.whispir.contactdevice-v1+json


**Note:** You cannot selectively update the device fields needed as this is a PUT request. 

So the standard process for updating a contact device record is -

1. GET /contact/{id of contact}/devices/{id of device}
2. Update the device field in the object to the required value
3. PUT /contact/{id of contact}/devices/{id of device} the new object

**Reasons to Update**

1. Device token (Push tokens) might change when the user re-installs or upgrades the OS on their phone
2. Device information might have changed as a result of user upgrading their OS
3. Change of device status to "Disabled", if the push fails consistently. Whispir does not update the device to "Disabled" upon first failure, it only does that on second failure given the device was not updated after first failure. So, you will only be charged for the Push, as long as the status is "Active"
4. Update does not automatically reset the "Disabled" status. You as the App owner has to specifically turn on the status back to "ACTIVE", so that new push notifications can be triggered again.
5. Disabled devices will not receive any push notifications.

The response to the PUT request upon success is usually a `204` with no content being provided.

## Deleting a device

> Deleting a contact device
> > The following statement allows users to delete contact's device using the Whispir API.  Please note, this device cannot be recovered back once deleted.

```
HTTP 1.1 DELETE https://api.<region>.whispir.com/contacts/124F6B2D46A5A268/device/{:did}?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: your_api_key
```

Deleting a contact device can be performed using a DELETE request to the /contacts/{:cid}/devices/{:did} endpoint. So, to perform this, one must be knowing the exact “link” associated with the contact device.

After performing this request, the response does not contain any information other than the headers as it is not necessary.

The user has requested to delete a contactdevice, and when the response of `204 No Content` is returned, the contactdevice is successfully deleted.

## FAQ

The following are some of the FAQ on contact devices

1. I do not want to reveal my app user's name under the contact due to security reasons. How can i still create a contact and do Push?
<br>Ans: Whispir asks for firstName, lastName, timeZone, and Country of the contact. You can choose to set any masked value for the firstName and lastName data points. The masked value is only understood by your program and cor-relates that to your actual user in your DB. Whispir has no interest in that information. So, your personal identifiable data is safe withing your servers still.

2. How many devices can i register for a single App?
<br>Ans: This is dependent on the options.deviceLimit value set for the App when you registered it. Default is 3, and max allowed by Whispir is 10. This means your app user has upto 10 devices and has the app installed on all the 10 devices. Something not possible in real world, but still allowed.

3. My app user's push token is changed. What should i do?
<br>Ans: Update the contact devices that are tied to that token with the latest value, by using <a href="#updating-devices"> Updating Devices </a>. Whispir would not know that the token has changed, so its your responsibility to periodically update the token to keep them correct and so Whispir can ensure a successful delivery of your Push

4. What happens if i register two devices with same tokens, and appId information under a single contact?
<br>Ans: If both the devices are "ACTIVE", then Whispir will send 2 push notifcations to the App.

5. Can i specifically mention, which device under my contact should receive the push?
<br>Ans: No. Whispir sends the push to all devices that matches the appID under the given MRI.

6. What If I registered two devices from two different platforms (APNS/GCM) under the same contact, and want to send to both of them at the same time?
<br>Ans: As the Apps registered for each platform will be different, you should trigger the message twice, once for each app. A single trigger does not allow sending messages to both platforms in one go.

7. Can I tie/related the same device to multiple contacts?
<br>Ans: No. You have to register them separately under each contact, and also update them properly if the push token changes.

8. If I use contact mapping, will my devices be also mapped automatically between workspaces?
<br>Ans: Yes, and this feature allows you to register your contacts in one workspace, and with mapping be able to trigger Push in other mapped workspaces also by using the base workspace contact mri value.

