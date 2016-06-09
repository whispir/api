# Resources

> API Endpoint

> > Default Workspace Example

```xml
https://api.whispir.com/resources/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.resource-v1+xml
```

```go
https://api.whispir.com/resources/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.resource-v1+json
```

> > Workspace Specific Example

```xml
https://api.whispir.com/workspaces/{:id}/resources/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.resource-v1+xml
```

```go
https://api.whispir.com/workspaces/{:id}/resources/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.resource-v1+json
```

> Methods supported

```
- GET
- POST
- PUT
- DELETE
```

Using Whispir’s API, one can submit data payloads to be stored by Whispir and used in various API calls. These files are uploaded through the `/resources` endpoint.

Using the  Resources endpoint, application developers can submit, retrieve, update, and delete resources. These resources can be used as part of either Whispir Bulk (Dynamic) Messages, or to be used for importing Contacts.  

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
        /resources
        <ul>
          <li>
          Provides a List of all the currently saved resources in the company (URIs), sorted by most recently updated
          </li>
        </ul>
        /resources/{:id}
        <ul>
          <li>
          Retrieves the representation of the requested resource. (this does not allow users to download the resource, only the representation)
          </li>
        </ul>
        /workspaces/(id)/resources
        <ul>
          <li>
          Provides a List of all the currently saved resources in the specified workspace(URIs), sorted by most recently updated
          </li>
        </ul>
        /workspaces/(id)/resources/(id)
        <ul>
          <li>
          Retrieves the representation of the requested resource. (this does not allow users to download the resource, only the representation)
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">POST</td>
      <td>
        /resources
        <ul>
          <li>
          Creates a new resource for use in the API
          </li>
        </ul>
        /resources/{:id}
        <ul>
          <li>
          METHOD not supported
          </li>
        </ul>
        /workspaces/(id)/resources
        <ul>
          <li>
          Creates a new resource for use in the API under the particular workspace
          </li>
        </ul>
        /workspaces/(id)/resources/{:id}
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
        /resources
        <ul>
          <li>
          METHOD not supported
          </li>
        </ul>
        /resources/{:id}
        <ul>
          <li>
          Update the specified resource with the one supplied in the request.
          </li>
        </ul>
        /workspaces/(id)/resources
        <ul>
          <li>
          METHOD not supported
          </li>
        </ul>
        /workspaces/(id)/resources/{:id}
        <ul>
          <li>
          Update the specified resource with the one supplied in the request under the particular workspace
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">DELETE</td>
      <td>
        /resources
        <ul>
          <li>
          METHOD not supported
          </li>
        </ul>
        /resources/{:id}
        <ul>
          <li>
          Delete the specified resource from the Whispir Platform.
          </li>
        </ul>
        /workspaces/(id)/resources
        <ul>
          <li>
          METHOD not supported
          </li>
        </ul>
        /workspaces/(id)/resources/{:id}
        <ul>
          <li>
          Delete the specified resource from the Whispir Platform under the particular workspace
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Creating a resource

```
HTTP 1.1 POST https://api.whispir.com/resources?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

```xml
Content-Type: application/vnd.whispir.resource-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:resource xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <name>test.csv</name>
    <scope>private</scope>
    <mimeType>text/csv</mimeType>
   <derefUri>
     ...base64 representation...
     </derefUri>
</ns3:resource>

```

```go
Content-Type: application/vnd.whispir.resource-v1+json

{
  "name" : "test.csv",
  "scope" : "private",
  "mimeType" : "text/csv",
  "derefUri" : "...base64 representation..."
}   

```


> > Response

```
HTTP 1.1 201 Created
...
Location: http://api.whispir.com/resources/4FBBC384BCE3DAABFE3
...
```

Creating a resource is very easy. To create a new resource we should use the `/resources` end point.

The following are the mandatory fields needed to create a resource -

- Name
- Scope
- mimeType
- deferUri

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Response Elements</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">name:</td>
      <td><strong>String</strong><br/>
        Specifies the name of the file being uploaded. The extension of the file too is allowed to be present in the name. <b>Eg:</b> australia-contacts.csv
<br><br>
<b>Note:</b> It is advised that names should not contain spaces or special characters other than `-` and `.`. This helps for easier search and also for a valid URL link (especially) in case of public scoped files. <br><b>Eg:</b> `australia-contacts.csv` is better name convention than `australia contacts.csv` as the latter converts into `australia%20contacts.csv`.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">scope:</td>
      <td><strong>String</strong><br/>
        Specifies the permission scope of the file being uploaded. The scope defines the access restriction of the resource. It can be only one of -
      <ul>
        <li><b>Public</b> - Public files have an addressable URL and are available publicly</li>
        <li><b>Private</b> - Private files have no URL and are only available for bulk messaging purposes and for importing contacts.</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">mimeType:</td>
      <td><strong>String</strong><br/>
        The mime type of the file that is being uploaded. The type is dependent on the scope of the resource.
      <ul>
        <li><b>Public</b> - Public files can be of any mimetype. text/html; text/csv</li>
        <li><b>Private</b> - Private files are restricted to CSV, JSON, and XML.</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">derefUri:</td>
      <td><strong>String</strong><br/>
        The base64 representation of the file being submitted.
      </td>
    </tr>
  </tbody>
</table>

**Note:** When creating a resource, the following conditions apply -

- Maximum of 10MB per file being uploaded.
- Transactions will have an enforced timeout.
- Resources will be available in the Whispir Platform for a limited timeframe (30 days). These will then be automatically cleaned. This will be a configurable setting for Whispir Administrators.

### Example resources

The following are all equivalent representations of the same data structure, across the three supported formats.

### CSV format

As the CSV file format does not support structured objects, they have been omitted from the dataset.

> > CSV

```
fullname,email,mobile,streetaddress,suburb,manifest.name,manifest.value.timestamp
Franco Himboli,fhimboli@gmail.com,0410509001,123 Auburn Rd,Hawthorn,Delivery Manifest,20-10-2014 10:24
Jordan Windsor,jwindsor@yahoo.com,0410509002,360 Walsh Rd,North Melbourne,Delivery Manifest,20-10-2014 10:24
```

### JSON Format

> > JSON

```go
[{
 "fullname": "Franco Himboli",
 "email": "ftrimboli@gmail.com",
 "mobile": "0410509001",
 "streetaddress": "123 Auburn Rd",
 "suburb": "Hawthorn",
 "Reference": "Xpress Mail",
 "MsgData" : {
  "POBDetail": {
    "DateAndTime" : "09-Sep-2015 12:15 PM",
    "Message" : "Please let us know if the time slot is acceptable. Respond with a 'No' to get alternative time slot"
  }
  }
},
{
 "fullname": "Jordan Windsor",
 "email": "jwindsor@yahoo.com",
 "mobile": "0410509002",
 "streetaddress": "360 Walsh Rd",
 "suburb": "North Melbourne",
 "Reference": "Xpress Mail",
 "MsgData" : {
  "POBDetail": {
    "DateAndTime" : "09-Sep-2015 12:30 PM",
    "Message" : "Please let us know if the time slot is acceptable. Respond with a 'No' to get alternative time slot"
  }
  }
}]
```

### XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipients>
   <recipient>
      <name>Franco</name>
      <surname>Himboli</surname>
      <email>ftrimboli@gmail.com</email>
      <mobile>0410509001</mobile>
      <streetaddress>123 Auburn Rd</streetaddress>
      <suburb>Hawthorn</suburb>
    <Reference>Xpress Mail</Reference>
      <MsgData>
    <POBDetail>
      <DateAndTime>09-Sep-2015 12:15 PM</DateAndTime>
      <Message>Please let us know if the time slot is acceptable. Respond with a 'No' to get alternative time slot</Message>
    </POBDetail>
    </MsgData>
   </recipient>
   <recipient>
      <name>Jordan</name>
      <surname>Windsor</surname>
      <email>jwindsor@yahoo.com</email>
      <mobile>0410509002</mobile>
      <streetaddress>360 Walsh Rd</streetaddress>
      <suburb>North Melbourne</suburb>
      <Reference>Xpress Mail</Reference>
      <MsgData>
    <POBDetail>
      <DateAndTime>09-Sep-2015 12:30 PM</DateAndTime>
      <Message>Please let us know if the time slot is acceptable. Respond with a 'No' to get alternative time slot</Message>
    </POBDetail>
    </MsgData>
   </recipient>
</recipients>
```

Once you have your data in one of the above 3 formats, you need to **convert it into Base64** format, but before we do that, let's create our Message Template to determine what we actually want to send to these recipients.

## Encode the JSON, CSV or XML into Base64

In order to prepare the file to be uploaded to Whispir, it needs to be endcoded from it's textual representation into a Base64 encoded version.  Base64 is a common method of encoding binary data in ASCII format. Whispir uses it as a common method of exchange of file data.  It is also used when uploading attachments to messages in Whispir, or specifing custom WAV files for outbound voice calls.  More information about Base64 can be found [here](https://en.wikipedia.org/wiki/Base64) .

Most programming languages will provide a facility to convert text into Base64.  A simple internet search for 'base 64 encode java', or 'base 64 encode PHP' will yeild results on how to accomplish this task.

### JSON file encoded to Base64

The output after encoding the JSON Sample File into Base64 will look as follows:

```
W3sNCiAiZnVsbG5hbWUiOiAiRnJhbmNvIEhpbWJvbGkiLA0KICJlbWFpbCI6ICJmdHJpbWJvbGlAZ21haWwuY29tIiwNCiAibW9iaWxlIjogIjA0MTA1MDkwMDEiLA0KICJzdHJlZXRhZGRyZXNzIjogIjEyMyBBdWJ1cm4gUmQiLA0KICJzdWJ1cmIiOiAiSGF3dGhvcm4iLA0KICJSZWZlcmVuY2UiOiAiWHByZXNzIE1haWwiLA0KICJNc2dEYXRhIiA6IHsgDQoJIlBPQkRldGFpbCI6IHsNCgkJIkRhdGVBbmRUaW1lIiA6ICIwOS1TZXAtMjAxNSAxMjoxNSBQTSIsDQoJCSJNZXNzYWdlIiA6ICJQbGVhc2UgbGV0IHVzIGtub3cgaWYgdGhlIHRpbWUgc2xvdCBpcyBhY2NlcHRhYmxlLiBSZXNwb25kIHdpdGggYSAnTm8nIHRvIGdldCBhbHRlcm5hdGl2ZSB0aW1lIHNsb3QiDQoJfQ0KICB9DQp9LA0Kew0KICJmdWxsbmFtZSI6ICJKb3JkYW4gV2luZHNvciIsDQogImVtYWlsIjogImp3aW5kc29yQHlhaG9vLmNvbSIsDQogIm1vYmlsZSI6ICIwNDEwNTA5MDAyIiwNCiAic3RyZWV0YWRkcmVzcyI6ICIzNjAgV2Fsc2ggUmQiLA0KICJzdWJ1cmIiOiAiTm9ydGggTWVsYm91cm5lIiwNCiAiUmVmZXJlbmNlIjogIlhwcmVzcyBNYWlsIiwNCiAiTXNnRGF0YSIgOiB7IA0KCSJQT0JEZXRhaWwiOiB7DQoJCSJEYXRlQW5kVGltZSIgOiAiMDktU2VwLTIwMTUgMTI6MzAgUE0iLA0KCQkiTWVzc2FnZSIgOiAiUGxlYXNlIGxldCB1cyBrbm93IGlmIHRoZSB0aW1lIHNsb3QgaXMgYWNjZXB0YWJsZS4gUmVzcG9uZCB3aXRoIGEgJ05vJyB0byBnZXQgYWx0ZXJuYXRpdmUgdGltZSBzbG90Ig0KCX0NCiAgfQ0KfV0=
```

This is now ready to be uploaded to Whispir.

### Upload the encoded file to Whispir using the API

```
HTTP 1.1 POST https://api.whispir.com/resources?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

```xml
Content-Type: application/vnd.whispir.resource-v1+xml


<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:resource xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <name>test.json</name>
    <scope>private</scope>
    <mimeType>application/json</mimeType>
 <derefUri>W3sNCiAiZnVsbG5hbWUiOiAiRnJhbmNvIEhpbWJvbGkiLA0KICJlbWFpbCI6ICJmdHJpbWJvbGlAZ21haWwuY29tIiwNCiAibW9iaWxlIjogIjA0MTA1MDkwMDEiLA0KICJzdHJlZXRhZGRyZXNzIjogIjEyMyBBdWJ1cm4gUmQiLA0KICJzdWJ1cmIiOiAiSGF3dGhvcm4iLA0KICJSZWZlcmVuY2UiOiAiWHByZXNzIE1haWwiLA0KICJNc2dEYXRhIiA6IHsgDQoJIlBPQkRldGFpbCI6IHsNCgkJIkRhdGVBbmRUaW1lIiA6ICIwOS1TZXAtMjAxNSAxMjoxNSBQTSIsDQoJCSJNZXNzYWdlIiA6ICJQbGVhc2UgbGV0IHVzIGtub3cgaWYgdGhlIHRpbWUgc2xvdCBpcyBhY2NlcHRhYmxlLiBSZXNwb25kIHdpdGggYSAnTm8nIHRvIGdldCBhbHRlcm5hdGl2ZSB0aW1lIHNsb3QiDQoJfQ0KICB9DQp9LA0Kew0KICJmdWxsbmFtZSI6ICJKb3JkYW4gV2luZHNvciIsDQogImVtYWlsIjogImp3aW5kc29yQHlhaG9vLmNvbSIsDQogIm1vYmlsZSI6ICIwNDEwNTA5MDAyIiwNCiAic3RyZWV0YWRkcmVzcyI6ICIzNjAgV2Fsc2ggUmQiLA0KICJzdWJ1cmIiOiAiTm9ydGggTWVsYm91cm5lIiwNCiAiUmVmZXJlbmNlIjogIlhwcmVzcyBNYWlsIiwNCiAiTXNnRGF0YSIgOiB7IA0KCSJQT0JEZXRhaWwiOiB7DQoJCSJEYXRlQW5kVGltZSIgOiAiMDktU2VwLTIwMTUgMTI6MzAgUE0iLA0KCQkiTWVzc2FnZSIgOiAiUGxlYXNlIGxldCB1cyBrbm93IGlmIHRoZSB0aW1lIHNsb3QgaXMgYWNjZXB0YWJsZS4gUmVzcG9uZCB3aXRoIGEgJ05vJyB0byBnZXQgYWx0ZXJuYXRpdmUgdGltZSBzbG90Ig0KCX0NCiAgfQ0KfV0=</derefUri>
</ns3:resource>

```

```go
Content-Type: application/vnd.whispir.resource-v1+json

{
  "name" : "test.json",
  "scope" : "private",
  "mimeType" : "application/json",
  "derefUri" : "W3sNCiAiZnVsbG5hbWUiOiAiRnJhbmNvIEhpbWJvbGkiLA0KICJlbWFpbCI6ICJmdHJpbWJvbGlAZ21haWwuY29tIiwNCiAibW9iaWxlIjogIjA0MTA1MDkwMDEiLA0KICJzdHJlZXRhZGRyZXNzIjogIjEyMyBBdWJ1cm4gUmQiLA0KICJzdWJ1cmIiOiAiSGF3dGhvcm4iLA0KICJSZWZlcmVuY2UiOiAiWHByZXNzIE1haWwiLA0KICJNc2dEYXRhIiA6IHsgDQoJIlBPQkRldGFpbCI6IHsNCgkJIkRhdGVBbmRUaW1lIiA6ICIwOS1TZXAtMjAxNSAxMjoxNSBQTSIsDQoJCSJNZXNzYWdlIiA6ICJQbGVhc2UgbGV0IHVzIGtub3cgaWYgdGhlIHRpbWUgc2xvdCBpcyBhY2NlcHRhYmxlLiBSZXNwb25kIHdpdGggYSAnTm8nIHRvIGdldCBhbHRlcm5hdGl2ZSB0aW1lIHNsb3QiDQoJfQ0KICB9DQp9LA0Kew0KICJmdWxsbmFtZSI6ICJKb3JkYW4gV2luZHNvciIsDQogImVtYWlsIjogImp3aW5kc29yQHlhaG9vLmNvbSIsDQogIm1vYmlsZSI6ICIwNDEwNTA5MDAyIiwNCiAic3RyZWV0YWRkcmVzcyI6ICIzNjAgV2Fsc2ggUmQiLA0KICJzdWJ1cmIiOiAiTm9ydGggTWVsYm91cm5lIiwNCiAiUmVmZXJlbmNlIjogIlhwcmVzcyBNYWlsIiwNCiAiTXNnRGF0YSIgOiB7IA0KCSJQT0JEZXRhaWwiOiB7DQoJCSJEYXRlQW5kVGltZSIgOiAiMDktU2VwLTIwMTUgMTI6MzAgUE0iLA0KCQkiTWVzc2FnZSIgOiAiUGxlYXNlIGxldCB1cyBrbm93IGlmIHRoZSB0aW1lIHNsb3QgaXMgYWNjZXB0YWJsZS4gUmVzcG9uZCB3aXRoIGEgJ05vJyB0byBnZXQgYWx0ZXJuYXRpdmUgdGltZSBzbG90Ig0KCX0NCiAgfQ0KfV0="
}   

```


> > Response

> > Once the resource is created, you can now use this in Whispir to send a message to each of the recipients using the data within the resource.

```
HTTP 1.1 201 Created
...
Location: http://api.whispir.com/resources/ABD435DBFCD663DEDEFF?apikey=<your_api_key>
...

```

## Sending Messages using template and resources

Apart from use in the [Dynamic Messages](https://whispir.github.io/api/#dynamic-messages), resources can be equally used sending dynamic messages with or without a template.

Assuming there is a template that has already been created with stencil as -

> > TemplateID: BCD384BC3847CD3484CD

```
{
  "messageTemplateName" : "Delivery Plan",
  "subject" : "Delivery Plan:",
  "body" : "Hi @@name@@ @@surname@@, Your planned mail delivery is at @@MsgData.POBDetail.DateAndTime@@. @@MsgData.POBDetail.Message@@. Any questions, please call 1300 WHISPIR."
}
```

Now we have the templateId(for content) with the resourceID (for recipients). Using these two key pieces of information, developers can submit an API request to kick off the Dynamic Messaging process.

The `smsMappingField` should be mapped to the column or key that holds the number to which the SMS has to sent to; and the `emailMappingField` to the email to which the message has to be sent to. refer to [Dynamic Messages](https://whispir.github.io/api/#dynamic-messages) for more details on the mapping.

> Sending the Bulk Message

> > the resource type here is application/vnd.whispir.bulkmessage-v1+xml, application/vnd.whispir.bulkmessage-v1+json. Not the usual application/vnd.whispir.message-v1+xml, application/vnd.whispir.message-v1+json.

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

```xml
Content-Type: application/vnd.whispir.bulkmessage-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
   <resource>
      <resourceId>ABD435DBFCD663DEDEFF</resourceId>
    <smsMappingField>mobile</smsMappingField>
      <emailMappingField>email</emailMappingField>
   </resource>
   <messageTemplateId>BCD384BC3847CD3484CD</messageTemplateId>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.bulkmessage-v1+json

{
  "resource" :{
    "resourceId" : "ABD435DBFCD663DEDEFF",
    "smsMappingField" : "mobile",
    "emailMappingField" : "email",
    "voiceMappingField" : ""
  },
  "messageTemplateId": "BCD384BC3847CD3484CD"
}
```

> Final Message delivered to Customer (Individually)

> > The message when combined with the data will be -

```
Hi Franco Thimboli, Your planned mail delivery is at 09-Sep-2015 12:15 PM. Please let us know if the time slot is acceptable. Respond with a 'No' to get alternative time slot. Any questions, please call 1300 WHISPIR.

Hi Jordan Windsor, Your planned mail delivery is at 09-Sep-2015 12:30 PM. Please let us know if the time slot is acceptable. Respond with a 'No' to get alternative time slot. Any questions, please call 1300 WHISPIR.
```

> Response

```
HTTP 1.1 202 Accepted
Location: http://api.whispir.com/messages/CDB938478CD6DBC3784C?apikey=[your_api_key]
```

## Error in creating a resource

The API may report error in the resource processing. The reason would be part of the response to the POST call.The standard reasons are -


<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Standard Error Scenarios</th>
        </tr>
    <tr>
            <th style="width: 50%">Error Condition</th>
            <th style="width: 50%">Details</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">Request a URI that doesn't exist</td>
      <td>
        Response Code
        <ul>
          <li>
          404 Not Found
          </li>
        </ul>
        Description
        <ul>
          <li>
          The requested URI does not exist
          </li>
        </ul>
        Actions for application client
        <ul>
          <li>
          Resource does not exist. Incorrect resource identifier, or resource has been removed.
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">Provide an attachment that is bigger than 10 MB</td>
      <td>
        Response Code
        <ul>
          <li>
          422 Unprocessable Entity
          </li>
        </ul>
        Description
        <ul>
          <li>
          The POST request entity exceeds allowed size
          </li>
        </ul>
        Actions for application client
        <ul>
          <li>
          Ensure the size of the resource does not exceed 10MiB.
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">Provide a mime type that is not json, xml or csv</td>
      <td>
        Response Code
        <ul>
          <li>
          422 Unprocessable Entity
          </li>
        </ul>
        Description
        <ul>
          <li>
          The request was unsuccessful because the requested content type is not supported by the API.
          </li>
        </ul>
        Actions for application client
        <ul>
          <li>
          Incorrect mime type. Only text/csv, application/xml, application/json are supported as bulk message resources.
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">Malformed XML or JSON passed</td>
      <td>
        Response Code
        <ul>
          <li>
          422 Unprocessable Entity
          </li>
        </ul>
        Description
        <ul>
          <li>
          An error occurred when processing entity in the request.
          </li>
        </ul>
        Actions for application client
        <ul>
          <li>
           Likely to be a malformed CSV, XML, or JSON file. Verify the data structure.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


## Retrieving existing resources

Existing resources can be easily retrieved via the GET /resources API call. The response lists all of the existing public and private resources available in the system.

> Retrieving resources

> > The resources contain the id, and url link of the resource (only public)

```
HTTP 1.1 GET https://api.whispir.com/resources/?apikey=<your_api_key>
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

```xml
Accept: application/vnd.whispir.resource-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <status>1 to 7 of 7    </status>
    <ns2:resources>
        <ns2:resource>
            <name>singapore.csv</name>
            <scope>private</scope>
            <mimeType>application/json</mimeType>
            <ns2:link uri="https://api.whispir.com/resources/D9A8DC34EDRSD7E4?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:resource>
        <ns2:resource>
            <name>australia.json</name>
            <scope>private</scope>
            <mimeType>application/json</mimeType>
            <ns2:link uri="https://api.whispir.com/resources/D3E2XCDF3WS4859?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:resource>
        <ns2:resource>
            <name>usa.csv</name>
            <scope>private</scope>
            <mimeType>text/csv</mimeType>
            <ns2:link uri="https://api.whispir.com/resources/3E2F6E72642F949?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:resource>
        <ns2:resource>
            <name>users.json</name>
            <scope>public</scope>
            <mimeType>application.json</mimeType>
            <url>https://cdn-ap.whispir.com/public/resources/216asdfgjgedf1sdf56fd472360cd.json</url>
            <ns2:link uri="https://api.whispir.com/resources/F1212CF334EDR68?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:resource>
        <ns2:resource>
            <name>whispir-example-bulk-message-1.csv</name>
            <scope>private</scope>
            <mimeType>text/csv</mimeType>
            <ns2:link uri="https://api.whispir.com/resources/32SDF43ED6829B2?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:resource>
        <ns2:resource>
            <name>whispir-example-bulk-message-2.csv</name>
            <scope>private</scope>
            <mimeType>text/csv</mimeType>
            <ns2:link uri="https://api.whispir.com/resources/C708D712EDRB0?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:resource>
        <ns2:resource>
            <name>whispir-example-bulk-message-3.csv</name>
            <scope>private</scope>
            <mimeType>text/csv</mimeType>
            <ns2:link uri="https://api.whispir.com/resources/2FEED897U46E2?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:resource>
    </ns2:resources>
</ns2:return>
```

```go
Accept: application/vnd.whispir.resource-v1+json

{
  "resources": [
    {
      "name": "singapore.csv",
      "scope": "private",
      "mimeType": "application/json",
      "link": [
        {
          "uri": "https://api.whispir.com/resources/D9A8DC34EDRSD7E4?apikey=<your_api_key>",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "name": "australia.json",
      "scope": "private",
      "mimeType": "application/json",
      "link": [
        {
          "uri": "https://api.whispir.com/resources/D3E2XCDF3WS4859?apikey=<your_api_key>",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "name": "usa.csv",
      "scope": "private",
      "mimeType": "text/csv",
      "link": [
        {
          "uri": "https://api.whispir.com/resources/3E2F6E72642F949?apikey=<your_api_key>",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "name": "users.json",
      "scope": "public",
      "mimeType": "application/json",
      "url": "https://cdn-ap.whispir.com/public/resources/2163b29d4edf1bd77d71a36210d472360cd.json",
      "link": [
        {
          "uri": "https://api.whispir.com/resources/F1212CF334EDR68?apikey=<your_api_key>",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "name": "whispir-example-bulk-message-1.csv",
      "scope": "private",
      "mimeType": "text/csv",
      "link": [
        {
          "uri": "https://api.whispir.com/resources/32SDF43ED6829B2?apikey=<your_api_key>",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "name": "whispir-example-bulk-message-2.csv",
      "scope": "private",
      "mimeType": "text/csv",
      "link": [
        {
          "uri": "https://api.whispir.com/resources/C708D712EDRB0?apikey=<your_api_key>",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "name": "whispir-example-bulk-message-3.csv",
      "scope": "private",
      "mimeType": "text/csv",
      "link": [
        {
          "uri": "https://api.whispir.com/resources/2FEED897U46E2?apikey=<your_api_key>",
          "rel": "self",
          "method": "GET"
        }
      ]
    }
  ],
  "status": "1 to 7 of 7    ",
  "link": []
}
```

### Retrieving a single resource

A single resource (public|private) can be retrieved from the available resource by using the resource's specific link uri.

> Retrieving a single resource

> > use the resource's link uri for private scope file

```
HTTP 1.1 GET https://api.whispir.com/resources/D3E2XCDF3WS4859?apikey=<your_api_key>
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

```xml
Accept: application/vnd.whispir.resource-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:resource xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <name>australia.json</name>
    <scope>private</scope>
    <mimeType>application/json</mimeType>
    <ns2:link uri="https://api.whispir.com/resources/D3E2XCDF3WS4859?apikey=<your_api_key>" rel="self" method="GET"/>
    <ns2:link uri="https://api.whispir.com/resources/D3E2XCDF3WS4859?apikey=<your_api_key>" rel="updateResource" method="PUT" type="application/vnd.whispir.resource-v1+json,application/vnd.whispir.resource-v1+xml"/>
    <ns2:link uri="https://api.whispir.com/resources/D3E2XCDF3WS4859?apikey=<your_api_key>" rel="deleteResource" method="DELETE"/>
</ns3:resource>

```

```go
Accept: application/vnd.whispir.resource-v1+json

{
  "name": "australia.json",
  "scope": "private",
  "mimeType": "application/json",
  "link": [
    {
      "uri": "https://api.whispir.com/resources/D3E2XCDF3WS4859?apikey=<your_api_key>",
      "rel": "self",
      "method": "GET"
    },
    {
      "uri": "https://api.whispir.com/resources/D3E2XCDF3WS4859?apikey=<your_api_key>",
      "rel": "updateResource",
      "method": "PUT",
      "type": "application/vnd.whispir.resource-v1+json,application/vnd.whispir.resource-v1+xml"
    },
    {
      "uri": "https://api.whispir.com/resources/D3E2XCDF3WS4859?apikey=<your_api_key>",
      "rel": "deleteResource",
      "method": "DELETE"
    }
  ]
}
```

```
> > use the resource's link uri for public scope file

```

```
HTTP 1.1 GET https://api.whispir.com/resources/F1212CF334EDR68?apikey=<your_api_key>
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

```xml
Accept: application/vnd.whispir.resource-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:resource xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <name>users.json</name>
    <scope>public</scope>
    <mimeType>application/json</mimeType>
  <url>https://cdn-ap.whispir.com/public/resources/2163b29d4edf1bd77d71a36210d472360cd.json</url>
    <ns2:link uri="https://api.whispir.com/resources/F1212CF334EDR68?apikey=<your_api_key>" rel="self" method="GET"/>
    <ns2:link uri="https://api.whispir.com/resources/F1212CF334EDR68?apikey=<your_api_key>" rel="updateResource" method="PUT" type="application/vnd.whispir.resource-v1+json,application/vnd.whispir.resource-v1+xml"/>
    <ns2:link uri="https://api.whispir.com/resources/F1212CF334EDR68?apikey=<your_api_key>" rel="deleteResource" method="DELETE"/>
</ns3:resource>

```

```go
Accept: application/vnd.whispir.resource-v1+json

{
  "name": "users.json",
  "scope": "public",
  "mimeType": "application/json",
  "url": "https://cdn-ap.whispir.com/public/resources/2163b29d4edf1bd77d71a36210d472360cd.json",
  "link": [
    {
      "uri": "https://api.whispir.com/resources/F1212CF334EDR68?apikey=<your_api_key>",
      "rel": "self",
      "method": "GET"
    },
    {
      "uri": "https://api.whispir.com/resources/F1212CF334EDR68?apikey=<your_api_key>",
      "rel": "updateResource",
      "method": "PUT",
      "type": "application/vnd.whispir.resource-v1+json,application/vnd.whispir.resource-v1+xml"
    },
    {
      "uri": "https://api.whispir.com/resources/F1212CF334EDR68?apikey=<your_api_key>",
      "rel": "deleteResource",
      "method": "DELETE"
    }
  ]
}
```

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Response Elements</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">name:</td>
      <td><strong>String</strong><br/>
        Specifies the name of the resource. The name is given during creation.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">scope:</td>
      <td><strong>String</strong><br/>
        Specifies the permission scope of the file being uploaded.
      </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">mimeType:</td>
      <td><strong>String</strong><br/>
        The mime type of the file that is being uploaded.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">url:</td>
      <td><strong>String</strong><br/>
        The downloaded link to the resource location. Browsing this link results in a download of the resource.
        <br><br>
        <b>Note:</b> Only available for Public scoped resources.
      </td>
    </tr>
    <tr>
            <td style="text-align: right; font-weight: bold;">link:</td>
            <td><strong>Array</strong><br/>
                Provides a list of URLs that can be used to manipulate or access the message template.
                <ul>
                  <li>uri - the link to access the message template</li>
                  <li>rel - the descriptor for what the link will do</li>
                  <li>method - the HTTP method to use with this particular link</li>
                </ul>
            </td>
        </tr>
  </tbody>
</table>


### Filtering search results

#### Filtering By scope

Resources can be filtered by their scope. This can be achieved by sending in the required scope type in the URL as query parameter. The scope can be one of the allowed scope types.

* Public - `&scope=public`
* Private - `&scope=private`


> Filtering resources by scope

> > Only get the public resources

```
HTTP 1.1 GET https://api.whispir.com/resources/?apikey=<your_api_key>&scope=public
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

> > Only get the private resources

```
HTTP 1.1 GET https://api.whispir.com/resources/?apikey=<your_api_key>&scope=private
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

#### Filtering By name


> Filtering resources by scope

> > With extension of file type

```
HTTP 1.1 GET https://api.whispir.com/resources/?apikey=<your_api_key>&name=australia.csv
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

> > Response will be array of records that match exactly the whole name given in the query


> > Only part of name

```
HTTP 1.1 GET https://api.whispir.com/resources/?apikey=<your_api_key>&name=au
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

> > Response will match all records that have `au` in their file name. So, multiple records are returned.

Resources can be filtered by their name. This can be achieved by sending in the name in the URL as query parameter.

**Note:** The name including the file extension makes it a unique search.

Eg: - `&name=australia.csv`


## Updating a resource

```
HTTP 1.1 PUT https://api.whispir.com/resources/ABD435DBFCD663DEDEFF?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
```

```xml
Content-Type: application/vnd.whispir.resource-v1+xml


<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:resource xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <name>australia.json</name>
    <scope>private</scope>
    <mimeType>application/json</mimeType>
 <derefUri>W3sNCiAiZnVsbG5hbWUiOiAiRnJhbmNvIEhpbWJvbGkiLA0KICJlbWFpbCI6ICJmdHJpbWJvbGlAZ21haWwuY29tIiwNCiAibW9iaWxlIjogIjA0MTA1MDkwMDEiLA0KICJzdHJlZXRhZGRyZXNzIjogIjEyMyBBdWJ1cm4gUmQiLA0KICJzdWJ1cmIiOiAiSGF3dGhvcm4iLA0KICJSZWZlcmVuY2UiOiAiWHByZXNzIE1haWwiLA0KICJNc2dEYXRhIiA6IHsgDQoJIlBPQkRldGFpbCI6IHsNCgkJIkRhdGVBbmRUaW1lIiA6ICIwOS1TZXAtMjAxNSAxMjoxNSBQTSIsDQoJCSJNZXNzYWdlIiA6ICJQbGVhc2UgbGV0IHVzIGtub3cgaWYgdGhlIHRpbWUgc2xvdCBpcyBhY2NlcHRhYmxlLiBSZXNwb25kIHdpdGggYSAnTm8nIHRvIGdldCBhbHRlcm5hdGl2ZSB0aW1lIHNsb3QiDQoJfQ0KICB9DQp9LA0Kew0KICJmdWxsbmFtZSI6ICJKb3JkYW4gV2luZHNvciIsDQogImVtYWlsIjogImp3aW5kc29yQHlhaG9vLmNvbSIsDQogIm1vYmlsZSI6ICIwNDEwNTA5MDAyIiwNCiAic3RyZWV0YWRkcmVzcyI6ICIzNjAgV2Fsc2ggUmQiLA0KICJzdWJ1cmIiOiAiTm9ydGggTWVsYm91cm5lIiwNCiAiUmVmZXJlbmNlIjogIlhwcmVzcyBNYWlsIiwNCiAiTXNnRGF0YSIgOiB7IA0KCSJQT0JEZXRhaWwiOiB7DQoJCSJEYXRlQW5kVGltZSIgOiAiMDktU2VwLTIwMTUgMTI6MzAgUE0iLA0KCQkiTWVzc2FnZSIgOiAiUGxlYXNlIGxldCB1cyBrbm93IGlmIHRoZSB0aW1lIHNsb3QgaXMgYWNjZXB0YWJsZS4gUmVzcG9uZCB3aXRoIGEgJ05vJyB0byBnZXQgYWx0ZXJuYXRpdmUgdGltZSBzbG90Ig0KCX0NCiAgfQ0KfV0=</derefUri>
</ns3:resource>

```

```go
Content-Type: application/vnd.whispir.resource-v1+json

{
  "name" : "australia.json",
  "scope" : "private",
  "mimeType" : "application/json",
  "derefUri" : "W3sNCiAiZnVsbG5hbWUiOiAiRnJhbmNvIEhpbWJvbGkiLA0KICJlbWFpbCI6ICJmdHJpbWJvbGlAZ21haWwuY29tIiwNCiAibW9iaWxlIjogIjA0MTA1MDkwMDEiLA0KICJzdHJlZXRhZGRyZXNzIjogIjEyMyBBdWJ1cm4gUmQiLA0KICJzdWJ1cmIiOiAiSGF3dGhvcm4iLA0KICJSZWZlcmVuY2UiOiAiWHByZXNzIE1haWwiLA0KICJNc2dEYXRhIiA6IHsgDQoJIlBPQkRldGFpbCI6IHsNCgkJIkRhdGVBbmRUaW1lIiA6ICIwOS1TZXAtMjAxNSAxMjoxNSBQTSIsDQoJCSJNZXNzYWdlIiA6ICJQbGVhc2UgbGV0IHVzIGtub3cgaWYgdGhlIHRpbWUgc2xvdCBpcyBhY2NlcHRhYmxlLiBSZXNwb25kIHdpdGggYSAnTm8nIHRvIGdldCBhbHRlcm5hdGl2ZSB0aW1lIHNsb3QiDQoJfQ0KICB9DQp9LA0Kew0KICJmdWxsbmFtZSI6ICJKb3JkYW4gV2luZHNvciIsDQogImVtYWlsIjogImp3aW5kc29yQHlhaG9vLmNvbSIsDQogIm1vYmlsZSI6ICIwNDEwNTA5MDAyIiwNCiAic3RyZWV0YWRkcmVzcyI6ICIzNjAgV2Fsc2ggUmQiLA0KICJzdWJ1cmIiOiAiTm9ydGggTWVsYm91cm5lIiwNCiAiUmVmZXJlbmNlIjogIlhwcmVzcyBNYWlsIiwNCiAiTXNnRGF0YSIgOiB7IA0KCSJQT0JEZXRhaWwiOiB7DQoJCSJEYXRlQW5kVGltZSIgOiAiMDktU2VwLTIwMTUgMTI6MzAgUE0iLA0KCQkiTWVzc2FnZSIgOiAiUGxlYXNlIGxldCB1cyBrbm93IGlmIHRoZSB0aW1lIHNsb3QgaXMgYWNjZXB0YWJsZS4gUmVzcG9uZCB3aXRoIGEgJ05vJyB0byBnZXQgYWx0ZXJuYXRpdmUgdGltZSBzbG90Ig0KCX0NCiAgfQ0KfV0="
}   

```

> > Response

> > Once the resource is updated, the older version is technically removed. The new resource data will be used in all the references of the resource (via the ID)

```
HTTP 1.1 204 No Content
```

Updating a resource involves the same process as in creating a resource. The process of using one of the format (CSV, JSON, XML) for private and any format for public -> converting to base64 encoded data is the same.

The change is doing a `PUT` to the existing resource URL that needs to be updated. Please be careful that doing an update overwrites the previous resource. There is no versioning available in Whispir for the resources.

Any or all of the 4 values can be changed. **i.e,** name, scope, mimeType, deferUri, but all 4 are mandatory values to be sent.

## Deleting a resource


> Deleting a resource

> > Exact URI of the resource has to be provided.

```
HTTP 1.1 DELETE https://api.whispir.com/resources/F1212CF334EDR68?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

> Response

> > 204 No Content

Resources can be deleted after use. These can be both public and private in scope.

**Note:** Deleting a public resource may result in `404 File Not Found` error for any sites or material referencing to it. So, ensure that DELETE is only executed when the reference to all material is removed or the content has to be removed for other purposes immediately.
