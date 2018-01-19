# Messages

> API Endpoint

> > The following calls describe how to access messages from within your workspaces

```xml
<!-- From the default workspace -->

https://api.whispir.com/messages/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.message-v1+xml
```

```go
// From the default workspace

https://api.whispir.com/messages/?apikey=<your_api_key>
Accept: application/vnd.whispir.message-v1+json
```

```xml
<!-- Or from a defined workspace -->

https://api.whispir.com/workspaces/{:id}/messages/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.message-v1+xml
```

```go
// Or from a defined workspace

https://api.whispir.com/workspaces/{:id}/messages/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.message-v1+json
```

> > The following resource types are supported for messages.

```
- application/vnd.whispir.message-v1+xml
- application/vnd.whispir.message-v1+json
```

> > The following methods are supported for the messages endpoint.

```
- GET
- POST
- DELETE
```

> Messages
> > Sample to send an SMS, Email, Voice call, and Web Publishing in one request

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic <YOUR AUTH HEADER>
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test Message</subject>
    <body>This is the body of my test SMS message</body>
    <email>
        <body>This is the body of my test Email message</body>
        <footer>This is footer of test email</footer>
        <type>text/plain</type>
    </email>
    <voice>
        <header>test header</header>
        <body>This is test voice body</body>
        <footer>test footer</footer>
        <type>
            ConfCall:,
            ConfAccountNo:,
            ConfPinNo:,
            ConfModPinNo:,
            Pin:
        </type>
    </voice>
    <web>
        <body>This is web body of my test message</body>
        <type>text/plain</type>
    </web>
    <social>
        <social id="social">
            <body>Twitter Content.</body>
        </social>
        <social id="social_long">
            <body>Facebook Content.</body>
            <type>text/plain</type>
        </social>
    </social>
    <type>defaultNoReply</type>
</ns2:message>
````
```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "$mobile",
    "subject" : "Test Message",
    "body" : "This is the body of my test SMS message",
    "email" : {
        "body" : "This is the body of my test Email message",
        "footer" : "This is the footer of my message
                    (generally where a signature would go)",
        "type" : "text/plain"
    },
    "voice" : {
        "header" : "This is the introduction,
                    read out prior to any key press",
        "body" : "This is the body of the voice call,
                  read out after the key press",
        "type" : "ConfCall:,
                  ConfAccountNo:,
                  ConfPinNo:,
                  ConfModPinNo:,
                  Pin:"
    },
    "web" : {
        "body" : "This is the content of my web publishing
                 or Rich Push Message",
        "type" : "text/plain"
    },
    "social" : {
        "social" : [
		{
		    "id" : "social",
		    "body" : "Twitter Content."
		},
		{
		    "id" : "social_long",
		    "body" : "Facebook Content.",
		    "type" : "text/plain"
		}
	]
    },
    "type" : "defaultNoReply",
    "features" : {
        "pushOptions" : {
            "notifications" : "enabled",
            "escalationMins" : "3"
        }
    }
}
````

Communications are the core of what the Whispir.io API offers as a service to customers.

Whispir has the ability to send communications across 8 different channels in a single API request:

**SMS** - up to 1600&#42; characters per message, premium routes, delivery receipts<br/>
**Email** - free email messaging with HTML and Plain Text support<br/>
**Voice** - high quality outbound voice calls delivered to mobiles and landlines within seconds<br/>
**Rich Messages** - personalised, targeted rich messaging to drive conversations<br/>
**Push** - easily sent push notifications to your apps<br/>
**Twitter** - support for instant publishing to multiple twitter accounts<br/>
**Facebook** - simplify the process of publishing to multiple facebook accounts instantaneously<br/>
**RSS** - easily generate RSS feeds for consumption by other services<br/>


All communications are driven from the `/messages` endpoint within the API.  This endpoint allows a user to perform the following tasks:

1. Create and Send a new message in a given workspace
2. Retrieve a list of previously sent messages in the given workspace

These are described in more detail below:

As message resources can exist in the default (Company) workspace or other workspace, messages have two access URLs:

`https://api.whispir.com/messages` - for Company Workspace messages

`https://api.whispir.com/workspaces/:id/messages` - for other Workspace messages where `:id` is the id of the specific workspace.

<aside class="notice">
Whispir strongly recommends use of workspaces for all messaging needs. Refer <a href="#workspaces">workspaces</a>. If not followed, this may lead to billing and data privacy concerns within your company account.
</aside>

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">to:</td>
            <td><strong>String</strong><br/>
                Specifies the recipients of the message e.g.
                <ul>
                    <li>Mobile Phone: 61423456789</li>
                    <li>Email Address: john.smith@test.com.au</li>
                    <li>Landline: 61386000000</li>
                </ul>
                <strong>Note:</strong> Multiple recipients can be specified using semicolons
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">subject:</td>
            <td><strong>String</strong><br/>
                Specifies the first line of the SMS message or Voice call, and the subject of the Email message.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">body:</td>
            <td><strong>String</strong><br/>
                Specifies the content of the SMS message.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">email:</td>
            <td><strong>Object</strong><br/>
                Email object described below. Used for sending email messages.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">voice:</td>
            <td><strong>Object</strong><br/>
                Voice object described below. Used for sending voice calls to mobile phones and landlines.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">web:</td>
            <td><strong>Object</strong><br/>
                Web object described below. Used for web publishing and Rich Messages.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">social:</td>
            <td><strong>Object</strong><br/>
                Social object described below. Used for publishing content to social media (Twitter, Facebook, LinkedIn).
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">type:</td>
            <td><strong>String</strong><br/>
                Allows the user to modify the message behaviour for replies e.g.
                <ul>
                    <li>defaultNoReply - Used to reject any replies to this message. This is also used to mask the sender's phone number when not using a Message Alias.</li>
                </ul>
            </td>
        </tr>
	<tr>
            <td style="text-align: right; font-weight: bold;">dlr:</td>
            <td><strong>Object</strong><br/>
                Allows the user to specify the turn ON or turn OFF the DLRs (delivery receipts) via the `type` option e.g.
                <ul>
                    <li>NoDlr - Used to specify that DLRs should not be enabled for this message.</li>
                </ul>
		<br/>
		Usage: 
		<ul>
                    <li>for XML: <pre><li><dlr><type>NoDlr</type></dlr></pre></li>
                    <li>for JSON: <pre><li>"dlr":{ "type": "NoDlr" }</pre></li>
		</ul>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">features:</td>
            <td><strong>Object</strong><br/>
                Allows the user to modify the push notifications properties if these are configured in the company.
                <br/>
                <br/>
                <strong>pushOptions:</strong>
                <ul>
                    <li>notifications - enabled/disabled</li>
                    <li>escalationMins - # mins to await a push notifications response</li>
                    <li>appId - the appId to which the push notifications has to be sent to</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

## SMS Messages

> SMS Messages

> > Sending SMS messages using Whispir is as easy as providing the destination phone number(s), a message subject, and the content of the message.

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml
Accept: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test SMS Message</subject>
    <body>This is the body of my test SMS message</body>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
   "to" : "$mobile",
   "subject" : "Test SMS Message",
   "body" : "This is the body of my test SMS message"
}
```

```
Response: 202 Accepted
Location: https://api.whispir.com/messages/{id}?apikey=[your_key]
```
Sending SMS from Whispir is as easy as providing the recipient information and the content of the message.

Only **3 fields** are required:

1. To - the mobile phone number of the recipient
2. Subject - the first line or identifier of the SMS
3. Body - the remainder of the SMS content

The 'to' field can be provided in the following formats:
<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">'To' field options</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">Ad-hoc Recipients</td>
            <td><strong>String</strong><br/>
                <ul>
                    <li>Mobile Phone: 61423456789</li>
                    <li>Email Address: john.smith@test.com.au</li>
                    <li>Landline: 61386000000</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Defined Whispir Recipients</td>
            <td><strong>String</strong><br/>
                <ul>
                    <li>**Contact MRI:**<br/>John_Smith.782749@Contact.whispir.com</li>
                    <li>**User MRI:**<br/>John_Smith@User.whispir.com</li>
                    <li>**Distribution List MRI:**<br/>Incidents.373947@List.whispir.com</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

<aside class="notice">
Whispir strongly recommends use of workspaces for all messaging needs. Refer <a href="#workspaces">workspaces</a>.
</aside>

### Notes:

* Each SMS message can contain up to **1600&#42;** characters
* The Subject field is Mandatory.
* The Body field is Mandatory.
* MRI (Message Resource Identifier) is the unique Whispir address for the Contact, User or Distribution List.

&#42; SMS character counts are limited in some countries. Contact your local Whispir Representative for information about the supported number of characters in your region.

### Response

* If the response is `202 Accepted`, then the `location` header contains the reference to the message request. This value can be used to retrieve the message status, responses later on.
* For any other response codes, please refer to the <a href="#http-response-codes">HTTP Response Codes</a> section.
* If you have failed to capture the `location` header value, then refer to <a href="#retrieve-a-previously-sent-message"> How to Retrieve previously sent messages? </a>
* This process is same for sms, email, voice, push notifications.

## Email Messages

> Email Messages
> > **Sending Plain Text Emails**

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>john.smith@test.com</to>
    <subject>Test Email Message</subject>
    <email>
        <body>Email Body goes here.</body>
        <footer>Email signature goes here.</footer>
        <type>text/plain</type>
    </email>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
    "to" : "john.smith@test.com",
    "subject" : "Test Email Message",
    "email" : {
        "body" : "Email Body goes here.",
        "footer" : "Email signature goes here.",
        "type" : "text/plain"
    }
}
```

> > **Sending Rich Text (HTML) Emails**

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```
```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>john.smith@test.com</to>
    <subject>Test Email Message</subject>
    <email>
        <body>
            <![CDATA[
                <div id="content">
                    <p>This is my content</p>
                </div>
            ]]>
        </body>
        <type>text/html</type>
    </email>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
    "to" : "john.smith@test.com",
    "subject" : "Test Email Message",
    "email" : {
        "body" : "<div id='content'><p>This is my content</p></div>",
        "type" : "text/html"
    }
}
```

Whispir can easily be used as an API email gateway to deliver thousands of rich content emails for your campaigns.

**Mandatory fields**

Only 4 fields are required in order to send an email message.

1. To - the recipient of the email message.
2. Subject - the subject line of the email message.
3. Body - the content of the email (either HTML or Plain Text content).
4. Type - either 'text/plain' or 'text/html' to describe the content of the message.

<aside class="notice">
Whispir strongly recommends use of workspaces for all messaging needs. Refer <a href="#workspaces">workspaces</a>.
</aside>

### Whispir's support of Rich (HTML) Emails

> > **Sending Emails with Attachments**

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>john.smith@test.com</to>
    <subject>Test e-mail message with attachment</subject>
    <email>
        <body>Test Message Content</body>
        <type>text/plain</type>
    <resources>
            <attachment>
                <attachmentName>TestIcon.png</attachmentName>
                <attachmentDesc>TestIcon.png</attachmentDesc>
                <derefUri>iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAIAAADUsmlHAAAAAXNSR0IArs4c6QAAAARnQU1BAACx
jwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMvSURBVDhPTVT5S1RhFD3fezOOOePTXHKriWgj
sogWC1TSMuuHIFqoX0KsIIgSWwiq/6FFU8MKK6KyXYSKpkUKR4QMSSpCLQpyxHHUZpztzdu63xub
5vKWj/fu+c6599z3mMfjSU9P13UdZoiCaLfZYQWiUGKq1WrBLEBDOBpWNTWeQyEIwvT0NAsEAgRO
PKXFxceNbQOtv4ShkKCkaZZ5kYU1Sw6dqT0NMTkLBIbf7zf+xaOuJzgG4RmyPyP/Kwq/oWAYeT+R
6gYOofnmlUQmLQjI6JQkifasu368KdCQWwFEwBiYQOIgiDBETDFIORh/iZ0De55cehgXQJIphce9
d/ebJhuyV0P3QY9Cj/HDUKhseIPomP/CW2QYB42nSx+db76YUM9IusPhYHVM2g5Bpo5xNuIkZibC
F8On0oGVjhWabmR8EBx5GDuHaItsy0zhzA6bo/H5ZSyDMQ1d4YQa0Sqc1hdAe3E7IYkqp9tiUcHG
kXIQZ8+fm+k5uXK3/46YAV3mMMLEt/BHUJ1Vua9oH+WV9ayLyLpVhRYFkT8d4mUzRuI0DAcHmQng
SLrGoBJ/GC/L31JSy/cm91ifXTcboYDJGLX+1kI6WS3AQFSRCUDvwhGEwubiD1yVLkLKWuxoT50k
zGwab6Ru6HIsahpiwTybkwTLU9iUU1Ezf394CmuyV20p2kLg8mcbRHLLxGimLlWFFMpMc6TRFlx2
9aJqePBgx4M3u7tubb1dMXfjw6rHhOwb+/jhV3+qNtMFKspQEZnA+oxSPr9UdjgUllV59pHZhSUF
I/We5AnMv5o7bvhsFu5f3DlmR7ATr/a+rtq2mVulqEqmlFlbUuv5MbqudW0C7PrhGpvwidRhIoyX
qiHoRam/tGrT5n9Wmfcb9TfmBOf0DXy80H0h/uKU6yQRcqlmk+mji0RhbbN2XOpAygzF/9nmfp4o
c4+4y6vLqRnuUTdsfNqYFRop/4JFw4t723qz52YlZpvPd/K30vm+03nAie1ADXAYOADsgHOXs/la
ix7RkzMJyJJ/BjQ09lQ7me8f9/cP9nsnvemzpOIFy3PzclkK0wyNgvDEHP8Z/AXQ58rAz69IBAAA
AABJRU5ErkJggg==</derefUri>
            </attachment>
        </resources>
    </email>
</ns2:message>
```
```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
    "to" : "jsmith@test.com",
    "subject" : "Test e-mail message with attachment",
    "email" : {
        "body" : "This is my content",
        "type" : "text/plain",
        "resources" : {
            "attachment" : [{
                "attachmentName" : "TestIcon.png",
                "attachmentDesc" : "TestIcon.png",
                "derefUri" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAIAAADUsmlHAAAAAXNSR0IArs4c6QAAAARnQU1BAACx
jwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMvSURBVDhPTVT5S1RhFD3fezOOOePTXHKriWgj
sogWC1TSMuuHIFqoX0KsIIgSWwiq/6FFU8MKK6KyXYSKpkUKR4QMSSpCLQpyxHHUZpztzdu63xub
5vKWj/fu+c6599z3mMfjSU9P13UdZoiCaLfZYQWiUGKq1WrBLEBDOBpWNTWeQyEIwvT0NAsEAgRO
PKXFxceNbQOtv4ShkKCkaZZ5kYU1Sw6dqT0NMTkLBIbf7zf+xaOuJzgG4RmyPyP/Kwq/oWAYeT+R
6gYOofnmlUQmLQjI6JQkifasu368KdCQWwFEwBiYQOIgiDBETDFIORh/iZ0De55cehgXQJIphce9
d/ebJhuyV0P3QY9Cj/HDUKhseIPomP/CW2QYB42nSx+db76YUM9IusPhYHVM2g5Bpo5xNuIkZibC
F8On0oGVjhWabmR8EBx5GDuHaItsy0zhzA6bo/H5ZSyDMQ1d4YQa0Sqc1hdAe3E7IYkqp9tiUcHG
kXIQZ8+fm+k5uXK3/46YAV3mMMLEt/BHUJ1Vua9oH+WV9ayLyLpVhRYFkT8d4mUzRuI0DAcHmQng
SLrGoBJ/GC/L31JSy/cm91ifXTcboYDJGLX+1kI6WS3AQFSRCUDvwhGEwubiD1yVLkLKWuxoT50k
zGwab6Ru6HIsahpiwTybkwTLU9iUU1Ezf394CmuyV20p2kLg8mcbRHLLxGimLlWFFMpMc6TRFlx2
9aJqePBgx4M3u7tubb1dMXfjw6rHhOwb+/jhV3+qNtMFKspQEZnA+oxSPr9UdjgUllV59pHZhSUF
I/We5AnMv5o7bvhsFu5f3DlmR7ATr/a+rtq2mVulqEqmlFlbUuv5MbqudW0C7PrhGpvwidRhIoyX
qiHoRam/tGrT5n9Wmfcb9TfmBOf0DXy80H0h/uKU6yQRcqlmk+mji0RhbbN2XOpAygzF/9nmfp4o
c4+4y6vLqRnuUTdsfNqYFRop/4JFw4t723qz52YlZpvPd/K30vm+03nAie1ADXAYOADsgHOXs/la
ix7RkzMJyJJ/BjQ09lQ7me8f9/cP9nsnvemzpOIFy3PzclkK0wyNgvDEHP8Z/AXQ58rAz69IBAAA
AABJRU5ErkJggg=="
            }]
        }
    }
}
```

* HTML, HEAD and BODY HTML elements are not supported.  HTML content assumes that it is starting from within the BODY tag.
* HTML form and input elements are not supported in most email clients.  These can be included in the HTML content but should be thoroughly tested prior to use.
* STYLE elements are supported.  It is recommended that a single STYLE element at the top of the HTML that defines the styles for the entire email.  However, inline styles are also supported.
* Javascript is not supported and should not be used in e-mail messages.
* Images must be referenced through absolute web urls, any other mechanism will not work on most email clients.
<br/><br/>**Note:** Whispir does not host images for clients, you must use another hosting service and reference the URL in your Whispir request payload.

### Including attachments in e-mail messages

The Whispir API provides users with the ability to compose e-mail messages that also contain message attachments.

Attachments can be of any type (e.g. PDF, Images, Documents), and can be up to 10MB in size (maximum for all attachments).

Attachments must be provided in the payload of the message.  URLs can be referenced in the Email, but will not be added as message attachments.

### Notes:

* attachmentName - The name of the file being attached (mandatory)
* attachmentDesc - An optional description of the file being attached
* derefUri - The base64 representation of the file being uploaded

<aside class="notice">
The attachment element in JSON is also an array, so be sure to add the square bracket in there!
</aside>

## Voice Messages

> Voice Messages

> > **Sending Voice Calls**

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test Voice Call</subject>
    <voice>
        <header>
            This is the introduction of the voice call
        </header>
        <body>This is the body of the message</body>
        <!-- Do not include line breaks in your API calls -->
        <type>
            ConfCall:,
            ConfAccountNo:,
            ConfPinNo:,
            ConfModPinNo:,
            Pin:
        </type>
    </voice>
</ns2:message>
```
```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "$mobile",
    "subject" : "Test Voice Call",
    "voice" : {
        "header" : "This is the introduction of the voice call",
        "body" : "This is the body of the message",
        "type" : "ConfCall:,ConfAccountNo:,ConfPinNo:,ConfModPinNo:,Pin:"
    }
}
```

> > **Sending Voice Calls with Teleconferences**

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test Voice Call</subject>
    <voice>
        <header>
            This is the introduction of the voice call
        </header>
        <body>This is body of the message</body>
        <footer>This is the footer of the message</footer>
        <!-- Do not include line breaks in your API calls -->
        <type>
            ConfCall:1800500536,
            ConfAccountNo:12345678,
            ConfPinNo:1234,
            ConfModPinNo:1234,
            Pin:0000
        </type>
    </voice>
</ns2:message>
```
```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "$mobile",
    "subject" : "Test Voice Call",
    "voice" : {
        "header" : "This is the introduction of the voice call",
        "body" : "This is body of the message",
        "footer" : "This is the footer of the message",
        "type" : "ConfCall:1800500536,
                  ConfAccountNo:12345678,
                  ConfPinNo:1234,
                  ConfModPinNo:1234,
                  Pin:"
    }
}
```
Whispir's API provides users the ability to send a Voice Call to any landline or mobile phones around the world.

Whispir supports both **Text to Speech** and **Pre-recorded WAV file** approaches to sending Voice Calls.

Using Whispir's Voice Module, you can easily connect all recipients onto a single bridged call, simplifying your teleconferences and ensuring your message gets through.

### Notes:

* The Subject field is Mandatory.
* The Body field is Mandatory.
* The Type field is Mandatory and at a minimum must specify the following string:
   `<type>ConfCall:,ConfAccountNo:,ConfPinNo:,ConfModPinNo:,Pin:</type>`
* **The Type field is mandatory even when no conference call is being used**
* Pauses can be added in conference call details using a +

Your account must be enabled to use the Voice capability within Whispir for this to function.  If you are unsure whether you can use Voice please contact <a href="mailto:support@whispir.io">support@whispir.io</a>.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Custom Variables for Voice Calls</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@teleconf_number@@</td>
            <td>When Teleconferencing Services are used as part of voice calls, the Teleconference line that is used in the voice call can be accessed via this variable.<br/>e.g. 1800 123 123</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@teleconf_account@@</td>
            <td>When Teleconferencing Services are used as part of voice calls, the Teleconference Account or Room number that is used in the voice call can be accessed via this variable.<br/>e.g. 098711234</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@teleconf_pin@@</td>
            <td>When Teleconferencing Services are used as part of voice calls, the Teleconference Room PIN that is used in the voice call can be accessed via this variable.<br/>e.g. 8181</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@teleconf_mod_pin@@</td>
            <td>When Teleconferencing Services are used as part of voice calls, the Teleconference Moderator PIN that is used in the voice call can be accessed via this variable.<br/>e.g. 8181</td>
        </tr>
    </tbody>
</table>

<aside class="notice">
Whispir's Voice Module doesn't include a Conference Call service.  User's can easily integrate existing conference call services using the fields provided.
</aside>

### Using custom WAV files as the content for Voice Calls

The Whispir API provides users with the ability to compose voice calls using Text-To-Speech (TTS) as well as allowing users to provide custom WAV files to be played over the phone.

Attachments must be WAV files and can be up to 10MB in size (maximum for all attachments).

Each Voice Call is made up of four parts:

 1. Message Introduction - Either TTS or WAV file, mandatory for all messages
 2. Message Acceptance - Requests the recipient to press a button to accept the message
 3. Message Content - The concatenation of the Message Subject and Message Body (either TTS or WAV file)
 4. Message Response - Allows the recipient to provide an acknowledgement to the message, either default options or based off a response rule

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>61423568958</to>
    <subject>Test voice call with attachment</subject>
    <voice>
        <body>Will be replaced by the voicebody.wav file</body>
        <header>Will be replaced by the voiceintro.wav file</header>
        <type>ConfCall:,ConfAccountNo:,ConfPinNo:,ConfModPinNo:,Pin:</type>
        <resources>
            <attachment>
                <attachmentName>Introduction.wav</attachmentName>
                <attachmentDesc>voiceintro.wav</attachmentDesc>
                <derefUri>...</derefUri>
            </attachment>
            <attachment>
                <attachmentName>Body.wav</attachmentName>
                <attachmentDesc>voicebody.wav</attachmentDesc>
                <derefUri>...</derefUri>
            </attachment>
        </resources>
    </voice>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json


{
    "to" : "61423568958",
    "subject" : "Test voice call with attachments",
    "voice" : {
        "body" : "Will be replaced by the voicebody.wav file",
        "header" : "Will be replaced by the voiceintro.wav file",
        "type" : "ConfCall:,ConfAccountNo:,ConfPinNo:,ConfModPinNo:,Pin:",
        "resources" : {
            "attachment" : [{
                "attachmentName" : "Introduction.wav",
                "attachmentDesc" : "voiceintro.wav",
                "derefUri" : "..."
            },{
                "attachmentName" : "Body.wav",
                "attachmentDesc" : "voicebody.wav",
                "derefUri" : "..."
            }]
        }
    }
}
```

#### WAV File Criteria

Before a WAV file will be played, it needs to conform to a certain criteria.

 - All WAV files must be 8bit, 8000Hz, 1ch, 64kbps MAX.
 - If the WAV is supplied outside of these criteria, the TTS will be used instead.  It is vital that TTS is provided even when using WAV files.
 - All of the WAV files combined, may not exceed 10MB in total file size.

### Notes:

* attachmentName - The name of the file being attached (mandatory)
* attachmentDesc - For the WAV file to be played as the introduction, this must be voiceintro.wav
* attachmentDesc - For the WAV file to be played as the body, this must be voicebody.wav
* deferUri - The base64 representation of the WAV file being played
* in case of JSON, The attachment element is also an array, so be sure to add the square bracket in there!

## Rich Messages

> Rich Messages
> > Simple Rich Message using SMS with a Web Link

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test Rich Message</subject>
    <body>This is some content followed by the Rich Message link @@web_link@@</body>
    <web>
        <type>text/html</type>
        <body>
            <![CDATA[
                <div id="content">
                    <p>This is the body of my Rich Message</p>
                </div>
            ]]>
        </body>
    </web>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
   "to" : "$mobile",
   "subject" : "Test Rich Message",
   "body" : "This is some content followed by the Rich Message link @@web_link@@",
   "web" : {
      "type" : "text/html",
      "body" : "<div class='content'>This is the body of my Rich Message</div>"
   }
}
```

> Whispir's Javascript API

> > Users can use Whispir's Javascript API to perform different functions from within Rich Messages.
> > The following example uses javascript to personalise the Rich Message

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test Rich Message</subject>
    <body>This is some content followed by the Rich Message link @@web_link@@</body>
    <web>
        <type>text/html</type>
        <body>
            <![CDATA[
                <div id='content'>
                    <p>Hi <span id='first_name'></span></p>
                    <p>This is the body of my Rich Message</p>
                    <script type='text/javascript'>
                        document.getElementById('first_name').innerHTML = Whispir.data.profile.firstname;
                    </script>
                </div>
            ]]>
        </body>
    </web>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
   "to" : "$mobile",
   "subject" : "Test Rich Message",
   "body" : "This is some content followed by the Rich Message link @@web_link@@",
   "web" : {
      "type" : "text/html",
      "body" : "<div id='content'><p>Hi <span id='first_name'></span></p><p>This is the body of my Rich Message</p><script type='text/javascript'>document.getElementById('first_name').innerHTML = Whispir.data.profile.firstname;</script></div>"
   }
}
```
```php
<!--For ease of reading, the above HTML looks like-->
<div id='content'>
    <p>Hi <span id='first_name'></span></p>
    <p>This is the body of my Rich Message</p>
    <script type='text/javascript'>
        var firstName = Whispir.data.profile.firstname;
        document.getElementById('first_name').innerHTML = firstName;
    </script>
</div>
```

Whispir's Rich Messages provide you with the capability to seamlessly 'push' HTML content to your audience.

This can be in the form of a simple web page, through to a mini web application with interactive widgets such as video, a data visualisation, or map.

For example;

<img src="https://developer.whispir.com/files/rpm-iphone-shift.jpg" />

The inclusion of the `@@web_link@@` tag anywhere in the body of the SMS or Email will automatically generate a URL and embed any content specified in the web body of the same message.

### Requirements to use Rich Messaging

Rich push is utilised when delivered to a mobile device. The receiving device requires the following features to be enabled to ensure the experience is optimised.

The target device:

* Needs to be able to launch a web browser that is HTML5 compliant. Most mainstream smartphones and tablets include modern browsers.
* Requires Javascript to be enabled on the target devices.
* Have an active internet connection.

### Guidelines for authoring the Rich Message HTML

Whispir allows you to control the entire content to be delivered to the end users device. Therefore, it's important that you build to a responsive design to display the content appropriately for every screen size.

* Build to a responsive design that works across your target devices. Ensure you test across these devices.
* Whispir strips body and doctype tags, and replaces them with tags suitable to render on mobile devices. The final DOCTYPE is delivered as a HTML 5 doctype.
* Use style tags at the **bottom** of the HTML content (rather than in the head tag or inline styles).
* Custom javascript should be included at the bottom of the content if possible (speeds up viewing).

### HTML Resources

Any HTML resources (Images, videos and visual assets) must be hosted externally, and referenced in the HTML. This allows you to control and link to resources using your existing CDN assets.

* External hosting also applies to scripts such as javascript libraries. Google CDN has excellent resources here: https://developers.google.com/speed/libraries/. Javascript can also be coded inline if required.
* As content is delivered over HTTPS, it is recommended that all external resources be accessible over HTTPS, as devices may refuse to load or display any mixed (HTTP and HTTPS) content.

### Response rules

Response Rules allow you to define pre-canned responses to your message. Your stakeholders can review these responses and optional reply to your message by selecting one.

* Response Rules can be attached to a Whispir Message Template within the Whispir interface.
* A message with Response Rules displays a response button at the bottom on the page. So ensure your message has at least 60px at the bottom of the page content.

More information about Rich Messages and the `Whispir` object is included later in this documentation.

## Push Messages

>> Push Messages


```
HTTP 1.1 POST https://api.whispir.com/workspaces/{:wid}/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml
Accept: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>contact-mri-value</to>
    <subject>Test Push Message</subject>
    <body>This is the body of my test Push message</body>
    <features>
        <notifications>enabled</notifications>
        <appId>{:appId}</appId>
    </features>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
    "to" : "contact-mri-value",
    "subject" : "Test Push Message",
    "body" : "This is the body of my test Push message",
    "features" : {
        "pushOptions" : {
            "notifications" : "enabled",
            "appId" : "{appId}"
        }
    }
}
```

```
Response: 202 Accepted
Location: https://api.whispir.com/workspaces/{:wid}/messages/{:mid}?apikey=[your_key]
```


Whispir allows to send Push notifications to any IOS, and Android based apps. Sending Push notifcation is done via the /messages endpoint in the REST api, and the recipient is usually a Whispir contact MRI. 

Setting up the platform to do Push involves some 1 time steps, and some periodically repeated steps (updating push tokens). Please refer to the <a href="#apps">Apps</a> endpoint to get a clear understanding of the related steps, and endpoints. Whispir does not support sending push to device tokens directly. Read more in the <a href="#contact-devices">Contact Devices</a> on how to register the device tokens under contacts.

The following fields are required:

1. To - the Whispir Contact MRI value
2. Subject - the first line or the badge header text in the Push Note
3. Body - the remainder of the Push Content
4. appId - the id given by Whispir upon your app registration at the <a href="#apps">\apps</a> endpoint


<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">to:</td>
			<td><strong>String</strong><br/>
				Specifies the mri value of the contact whose devices needs to receive the push
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">subject:</td>
			<td><strong>String</strong><br/>
				Specifies the first line or the badge header text in the Push Note 
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">Body:</td>
			<td><strong>String</strong><br/>
				Specifies the text that goes into the "alert"/"data" section of push structure
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">appId:</td>
			<td><strong>String</strong><br/>
				Specifies the appId of the registered app in Whispir
			</td>
		</tr>
	</tbody>
</table>

> > Or if you have a template, which has the details already set (in the mobile channel), and the features too set, which states the appId and has the notifications set to enabled, you can do.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>contact-mri-value</to>
    <messageTemplateName>Name-Of-the-Template-Goes-Here</messageTemplateName>
</ns2:message> 

```

```go
{
    "to" : "contact-mri-value",
    "messageTemplateName" : "Name-Of-the-Template-Goes-Here"
}
```

### So what happens in the background ?
* Whispir looks for the contact based on the MRI value in the given workspace (only).
* It loads all the devices under that contact
* Filters them down to the device(s) that has the same appId as passed in the message payload Or set in the template
* Sends a push to all the device(s) matched in the previous step.
* There is NO option to specifically pick a single device. If you need to do that, just register only 1 device for that contact.
* If Whispir does not find any devices under the said contact, the message status will be "PENDING" and the info will be "No valid receipients found for this message"

### Notes
* You must register your app with Whispir under the `\apps` endpoint. Refer to <a href="#apps">Apps</a>
* You must register the device token generated by your app with Whispir as a contact's device. Refer to <a href="#contact-devices">Contact Devices</a>
* You must be sending the push to a contact MRI only. So, refer to the <a href="#contacts">Contacts</a> for getting the MRI value.
* The maximum push content length is 256 bytes for both IOS and Android. This includes the payload structure as well.
* Whispir allows sending of custom message attributes with the payload, however these are not available by default, and needs to be configured by Whispir for you.
* Support for other mobile app platforms (Windows is provided upon request via separate enablement process.

## Web and Social Messaging

> Web and Social Messaging
> > Social Media Request/Response Example

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test Web Message</subject>
    <web>
        <body>This is web body of my test message</body>
        <type>text/plain</type>
    </web>
    <social>
        <social id="social">
            <body>This is the content of social message for Twitter</body>
         </social>
        <social id="social_long">
            <body>This is the content of social message for Facebook</body>
            <type>text/plain</type>
        </social>
    </social>
</ns2:message>
```
```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "$mobile",
    "subject" : "Test Web Message",
    "web" : {
        "body" : "This is the body of the web content",
        "type" : "text/plain"
    },
    "social" : {
        "social" : [{
            "id" : "social",
            "body" : "This is the content of social message for Twitter"
        }, {
            "id" : "socialType",
            "body" : "text/plain"
        }, {
            "id" : "social_long",
            "body" : "This is the content of social message for Facebook"
        }]
    }
}
```

The Whispir API supports publishing to Web, RSS and Social Media through existing configurations set up in the Whispir Platform.

If your existing Whispir setup already allows you to publish to these destinations, you can simply specify the information in the message, and it will automatically be published as per your existing setup.

### Web Publishing

The Web section is used to publish information to Whispir's Contact Portal or Whispir Community, or to a pre-defined web destination e.g. your company intranet.  

Whispir can automatically export this content as plain text or HTML and export it to a location for you to either iFrame into your webpage, or include via AJAX.

For more information on web publishing, please contact <a href="mailto:support@whispir.io">support@whispir.io</a>.

### Social Publishing

The Social section is used to publish information to Twitter or Facebook as per your Whispir implementation.  

Whispir can automatically publish content to your pre-configured Twitter and Facebook pages based on the information you have provided us.

For more information about configuring Social Publishing, please contact <a href="mailto:support@whispir.io">support@whispir.io</a>.


## Schedule Delivery

> Sending messages at a later date
> > ONCE

```
HTTP 1.1 POST http://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <to>john.smith@test.com</to>
    <subject>Test scheduled e-mail message</subject>
    <email>
        <body>This is my scheduled content</body>
        <type>text/plain</type>
    </email>
    <messageType>SCHEDULED</messageType>
    <scheduleType>ONCE</scheduleType>
    <scheduleDate>14/02/2017 15:55</scheduleDate>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "john.smith@test.com",
    "subject" : "Test scheduled e-mail message",
    "email" : {
        "body" : "This is my scheduled content",
        "type" : "text/plain"
    },
    "messageType" : "SCHEDULED",
    "scheduleType" : "ONCE",
    "scheduleDate" : "14/02/2017 15:55"
}
```

### Scheduling messages to be **delivered later**

Using the Whispir API, users can schedule messages to be sent later.

Users can configure the schedule of message delivery as part of the message sendout.

For example. the code will schedule a single message to be delivered at 3:55pm on the 14th February 2017.

* Using this method, messages can be easily scheduled so that the message is delivered when the recipient requires it. Or based on their preference time of day.

### Scheduling messages for **repeated delivery**

> > REPEAT

```
HTTP 1.1 POST http://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```
```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <to>john.smith@test.com</to>
    <subject>Test scheduled e-mail message</subject>
    <email>
        <body>This is my scheduled content</body>
        <type>text/plain</type>
    </email>
    <messageType>SCHEDULED</messageType>
    <scheduleType>REPEAT</scheduleType>
    <scheduleDate>14/02/2017 15:55</scheduleDate>
    <repetitionCount>10</repetitionCount>
    <repeatDays>0</repeatDays>
    <repeatHrs>1</repeatHrs>
    <repeatMin>0</repeatMin>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "john.smith@test.com",
    "subject" : "Test scheduled e-mail message",
    "email" : {
        "body" : "This is my scheduled content",
        "type" : "text/plain"
    },
    "messageType" : "SCHEDULED",
    "scheduleType" : "REPEAT",
    "scheduleDate" : "14/02/2017 15:55",
    "repetitionCount" : "10",
    "repeatDays" : "0",
    "repeatHrs" : "1",
    "repeatMin" : "0"
}
```

A second method of scheduling messages is where users can schedule messages to be sent multiple times/repeatedly (e.g. every hour, every day or every 7 days).

Users can configure the repeat rate of the message delivery as part of the message sendout.

For example. the code will schedule a single message to be delivered at 3:55pm on the 14th February 2017, and repeated every hour for 10 times.

* Using this method, users can easily schedule a message to be delivered multiple times starting from a date and continuing until desired.

### **Time Zone**

When a message is scheduled, it is scheduled as per the timezone setting of the user who initiated the message request. Each user in Whispir has a timezone set in their profile. So, messages are sent relative to the user's timezone, not from the timezone from where the user is located now.

For ex:

- If the user timezone setting is UTC, then messages are scheduled to be sent as per UTC, even if the user has triggered the message sitting in Singapore (+8).

This is very important and has to be understood as Whispir does not honor the timezone the recipient is located in. So ensure that communication is sent in appropriate/preferred time given by them.

*Note:* Changing the user timezone after the message is triggered DOES NOT change the original scheduled time.

### **Bulk Sending**
Both of the schedule types are also allowed in bulk messaging. You can upload a [resource](#resources) and trigger a [bulk message](#dynamic-and-bulk-messages) to be sent using that resource at a scheduled time.

However, at this point of time, Whispir does not allow each message row inside the resource file to be sent at different time. They should all be sent at once.


## Message Variables

> Message Variables
> > Demonstration of sending messages with variables (or tags).

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>John_Wick.1143139@Contact.whispir.sg</to>
    <subject>Test SMS Message with tags</subject>
    <body>Hi @@first_name@@.  This is your message.</body>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
   "to" : "John_Wick.1143139@Contact.whispir.sg",
   "subject" : "Test SMS Message with tags",
   "body" : "Hi @@first_name@@.  This is your message."
}
```

When sending messages using the Whispir API, users have the ability to automatically include recipient information as part of the message.  This is facilitated using **tags**.

* One has to use the contact mri/ user mri from the Whispir system to resolve these variables.

The following **tags** can be included in any SMS, Email or Voice message:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Recipient Message Tags</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@first_name@@</td>
            <td>Recipients first name.<br/>e.g. John</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@last_name@@</td>
            <td>Recipients last name.<br/>e.g. Smith</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@recipient_email@@</td>
            <td>Recipients primary email address.<br/>e.g. jsmith@email.com</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@recipient_sms@@</td>
            <td>Recipients primary mobile phone number.<br/>e.g. 61412345678</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@recipient_voice@@</td>
            <td>Recipients primary phone number for voice calls.<br/>e.g. 61412345678</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@pin@@</td>
            <td>Whispir message retrieval service call back PIN (only populated when voice is used).<br/>e.g. 1234</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@recipient_role@@</td>
            <td>Resolves to the recipient's 'Role' field.<br/>e.g. Manager</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@recipient_additionalrole@@</td>
            <td>Resolves to the recipient's 'Additional Role' field.<br/>e.g. Team Leader</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@team_name1@@</td>
            <td>Resolves to the recipient's 'Team Name' field.<br/>e.g. Red Team</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@messagelabel@@</td>
            <td>Resolves to the label field of the sent message.<br/>e.g. Incident #1234</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@messagecategories@@</td>
            <td>Resolves to the list of categories used in the message, separated with commas.<br/>e.g. Product Update</td
        </tr>
    </tbody>
</table>

Each of these tags will resolve on send of the message to the individual recipient's information.  As Whispir needs to know about this information prior to sending the message, the tags will only work when sending messages to **Contacts** or **Distribution Lists**.

For more information about sending messages to Contacts or Distribution Lists, please consult the documentation under Messaging.

**Note: ** Tags do not work in Rich Messages.  The `Whispir` javascript object must be used instead to populate recipient specific fields.

### Using auto-populated system variables in messages

> Using auto-populated system variables in messages
> > Demonstration of sending messages with system variables (or tags).

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>$mobile</to>
    <subject>Test SMS Message with tags</subject>
    <body>The date is @@dd@@ / @@mm@@ / @@yyyy@@.</body>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
   "to" : "$mobile",
   "subject" : "Test SMS Message with tags",
   "body" : "The date is @@dd@@ / @@mm@@ / @@yyyy@@."
}
```

When sending messages using the Whispir API, users have the ability to automatically include system generated information as part of the message.  This is facilitated using **system tags**.

The following **system tags** can be included in any message:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">System Tags</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@dd@@</td>
            <td>Current day with leading zero.<br/>e.g. 25</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@mm@@</td>
            <td>Current month with leading zero.<br/>e.g. 10</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@yy@@</td>
            <td>Current year, short form.<br/>e.g. 14</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@yyyy@@</td>
            <td>Current year, long form.<br/>e.g. 2014</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@day@@</td>
            <td>Day in spoken form.<br/>e.g. Wednesday</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@month@@</td>
            <td>Month in spoken form.<br/>e.g. June</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@hrs@@</td>
            <td>Current hour with leading zero in 24hrs.<br/>e.g. 16</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@min@@</td>
            <td>Current minute with leading zero .<br/>e.g. 37</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@date@@</td>
            <td>Current date in format (yyyy-mm-dd)<br/>e.g. 2014-09-02</td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">@@time@@</td>
            <td>Current time in 24hr format.<br/>e.g. 14:37</td>
        </tr>
    </tbody>
</table>

Each of these system tags will resolve on send of the message to the system information. The system tags will only work when sending messages to any recipient.


## Message Attributes

> Message Attributes
> > Sending an invitation message

```
HTTP 1.1 POST http://api.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```go
Content-Type: application/vnd.whispir.message-v1+json

{
   "to" : "john@api-example.com", 
   "subject" : "Reminder:", 
   "body" : "Your invitation to the Acme Event will expire on 13/06/2014.", 
   "email" : { 
      "type" : "text/plain", 
      "body" : "Your invitation to the Acme Event will expire on 13/06/2014." 
   }
}
```
Whispir's API customers who have Message Attributes configured within the Whispir Platform have the ability to simplify their API message requests by using the Message Attributes directly from the API.

Using Message Attributes allows developers to focus on the data behind a message, rather than focusing on the presentation or messaging channels within the message. 

This separation ensures that the marketing or communications teams within an organisation can focus on what they are best at, and the developers can ensure the system integrations are working as effectively as possible.

- For example:

A message could contain some content, and a potential variable such as the expiry of the invitation:

_Reminder: your invitation to the Acme Event will expire on 13/06/2014._


The API call to populate this without Message Attributes could look as shown in the code example-

### Using Templates to add in attributes

> > Using Templates to add in attributes

```
HTTP 1.1 POST http://api.whispir.com/templates?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```go
Content-Type: application/vnd.whispir.template-v1+json

{ 
   "messageTemplateName" : "Event Reminder", 
   "subject" : "Reminder:", 
   "body" : "Your invitation to the Acme Event will expire on @@event_expiry@@.", 
   "email" : { 
      "type" : "text/plain", 
      "body" : "Your invitation to the Acme Event will expire on @@event_expiry@@." 
   }
}
```

> > Response - Template Created

```
HTTP 1.1 201 Created
Location: http://api.whispir.com/templates/DACADB02209CC93C
```

```go
{ 
   "id": "DACADB02209CC93C", 
   "messageTemplateName" : "Event Reminder", 
   "subject" : "Reminder:", 
   "body" : "Your invitation to the Acme Event will expire on @@event_expiry@@.", 
   "email" : { 
      "type" : "text/plain", 
      "body" : "Your invitation to the Acme Event will expire on @@event_expiry@@." 
   }
}
```

Using Message Attributes and Message Templates allows developers to cleanly separate these responsibilities. This is done by combining both the channels being selected for the message, and the data driving the message.

- For example: 

The same message could be saved into a Whispir Message Template (see code example).

Using this Message Template ID and now using the Message Attribute @@event_expiry@@, the updated is far simpler to implement and is more efficient.

> Using Template (with attributes)
> > to send the Message

```
HTTP 1.1 POST http://api.whispir.com/messages?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```go
Content-Type: application/vnd.whispir.message-v1+json

{ 
   "to" : "john@api-example.com", 
   "messageTemplateId" : "DACADB02209CC93C", 
   "messageattributes" : {
      "attribute" : [{
         "name" : "event_expiry",     
         "value" : "13/06/2014"   
      }]
   } 
} 
```

*Note:* 

* User-defined attributes available through the API are configured at the account level and require Whispir administrative assistance to enable. 
* You can start using user-defined attributes through the api by contacting your Whispir Customer Success Representative or <a href="mailto:sales@whispir.com">sales@whispir.com</a>



## Dynamic and Bulk Messages

> Dynamic Messages
> > Whispir's API allows users to upload structured data, and process this line by line into outbound communications via SMS, Email, Voice, Web or Social Media.

```
|------------|------------|-------------|-------------|------------|
| First Name | Last Name  | Mobile      | Amount Owed | Date Due   |
|------------|------------|-------------|-------------|------------|
| Jono       | Johnson    | +6590091234 | S$1000      | 21/08/2015 |
| Steve      | Smith      | +6590091235 | S$1100      | 22/08/2015 |
|------------|------------|-------------|-------------|------------|
```

```xml
"Content-Type": "application/vnd.whispir.bulkmessage-v1+json"
"Accept": "application/vnd.whispir.bulkmessage-v1+json"

#ToDo
```

```go
"Content-Type": "application/vnd.whispir.bulkmessage-v1+json"
"Accept": "application/vnd.whispir.bulkmessage-v1+json"

{
  "resource" : {
    "resourceId" : resource_id,  # From the resource you created
    "smsMappingField" : "mobile",
    "emailMappingField" : "",
    "voiceMappingField" : "",
    "options" : {
        "resolveRecipients" : ""
      }
  },
  "subject" : "Bulk Send Example,
  "body" : "Hi @@first_name@@. Your account is currently outstanding, with the amount @@amount_due@@ being due on @@due_date@@.  Please make every effort to pay your account on time.  If you would like more information, please contact us on 1800 000 000, regards.",
}
```

> > After processing, the first recipient would receive a message that looks as follows:

```
Hi Jono. Your account is currently outstanding, with the amount S$1000.00 being due on 21/08/2015.  Please make every effort to pay your account on time.  If you would like more information, please contact us on 1800 000 000, regards.
```

Whispir allows you send messages with dynamic content. This is very useful when you are sending SMS or emails in bulk and want to simply replace the placeholders or variables with values from a spreadsheet, data file or database table.

This can be achieved easily by uploading a file with the message content and the message recipient information. Whispir's messaging engine takes this information and processes it in bulk sendout.

This process allows users to easily specify recipient information within the file, and this can be processed within the message content.

This file could be saved and uploaded to Whispir's bulk messaging engine.  As a result, Whispir would then propose the following variables to be available for use in the message:

@@first_name@@<br/>
@@last_name@@<br/>
@@mobile@@<br/>
@@amount_owed@@<br/>
@@date_due@@<br/>

The user then has the option to construct a message using this information, and Whispir will dynamically replace these variables at send time.  For example your message content could be as follows:

<br/>
### Sending Dynamic Messages

The bulk message sending is an easy two-step process.

1. Upload the resource file via API (CSV, JSON or XML)
2. Create a new message using the resource file as source data.

<br/>
**Step 1: Upload the Resource file via API**

```
HTTP 1.1 POST https://api.whispir.com/resources?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.resource-v1+xml
Accept: application/vnd.whispir.resource-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:resource xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <name>sample.json</name>
    <scope>private</scope>
    <mimeType>application/json</mimeType>
    <derefUri><!--base64 encoded JSON content --></derefUri>
</ns3:resource>
```

```go
Content-Type: application/vnd.whispir.resource-v1+json
Accept: application/vnd.whispir.resource-v1+json

{
  "name" : "sample.json",
  "scope" : "private",
  "mimeType" : "application/json",
  "derefUri" : "//base64 encoded JSON content"
}

```

> > This will return a Resource ID that applications can use in the next step.

To upload a file to Whispir's API, users will make an API call to the `/resources` endpoint.

Applications can use this endpoint to store the source files for dynamic messages. This endpoint can also be used to store any file based data (e.g. images, pdf documents, spreadsheets) for an unlimited amount of time.

**Note:** The types of files allowed are - CSV, JSON, XML, Images [JPEG, PNG], and WAV.

Information about the resources endpoint is documented in the [Resources](https://whispir.github.io/api/#resources) section of the documentation.

<br/>
**Step 2: Invoke the bulk message with reference to the resource ID and the desired content**

Once the resource file has been uploaded and the location of the resource being returned, applications can use this to populate a dynamic message using the **/messages** endpoint.

```
HTTP 1.1 POST https://api.whispir.com/messages?apikey=[your_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.bulkmessage-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <resource>
      <resourceId/>
      <smsMappingField/>
      <emailMappingField/>
      <voiceMappingField>
      <options>
        <resolveRecipients/>
      </options>
    </resource>
    <messageTemplateId>
    <subject></subject>
    <body></body>
    <email>
        <body></body>
        <footer></footer>
        <type></type>
    </email>
    <voice>
        <header></header>
        <body></body>
        <footer></footer>
        <other></other>
        <type></type>
    </voice>
    <web>
        <body></body>
        <type></type>
    </web>
    <callbackId/>
</ns2:message>
```

```go
Content-Type: application/vnd.whispir.bulkmessage-v1+json

{
   "resource" : {
        "resourceId" : "",
        "smsMappingField" : "",
        "emailMappingField" : "",
        "voiceMappingField" : "",
        "options" : {
            "resolveRecipients" : ""
        }
    },
    "messageTemplateId" : "",
    "subject" : "",
    "body" : "",
    "email" : {
        "body" : "",
        "footer" : "",
        "type" : ""
    },
    "voice" : {
        "header" : "",
        "body" : "",
        "footer" : "",
        "other" : "",
        "type" : ""
    },
    "web" : {
        "body" : "",
        "type" : ""
    },
    "callbackId" : ""
}
```

### Dynamic Messaging

#### Method Definition and Descriptions

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Service URL</td>
            <td>https://api.whispir.com/messages <br/> https://api.whispir.com/workspaces/[id]/messages</td>
        </tr>
        <tr>
            <td>Methods Supported</td>
            <td>GET, POST</td>
        </tr>
        <tr>
            <td>Request MIME Type</td>
            <td>application/vnd.whispir.bulkmessage-v1+xml <br/> application/vnd.whispir.bulkmessage-v1+json</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">/messages</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">GET:</td>
            <td>
                Provides a List of all the currently sent messages within the company or workspace (URIs)
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">POST:</td>
            <td>
                Creates and sends a new message/bulk message.
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">/messages/{id}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">GET:</td>
            <td>
                Retrieves the representation of the requested message.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">POST:</td>
            <td>
                NOT SUPPORTED
            </td>
        </tr>
    </tbody>
</table>

**Note**: The endpoint does not support PUT and DELETE in bulk messages. Similarly there is no POST for the **/messages/{id}**.

### Request Components

The structure of the Bulk Message is used to define the resource that should be used in the sendout, while also giving the user the capability to override the message content in the event a message template is not desired.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Main Section</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">messageTemplateId</td>
            <td>
                The resource identifier of the Message Template that should be used for this request.<br/>
                Sample Value: 4FBBC384BCE3DAABFE3
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">callbackId</td>
            <td>
                The id of the callback to be used for responses to this message.<br/>
                Sample Value: SampleCallback
                <br/><br/>
                <b>Note:</b> callback IDs are configured by Administrators within the Whispir Platform.
            </td>
        </tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Resource Section</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">resourceId</td>
            <td>
                The resource identifier returned from the POST to /resources.<br/>
                Resource referred to must be a valid CSV file.<br/>
                Sample Value: 384BCE34FBBCDAABFE3
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">smsMappingField</td>
            <td>
                The column name from within the CSV file that refers to the field on each row that should be used for SMS messages.<br/>
                Sample Value: Mobile
                <br/><br/>
                <strong>Note:</strong> This field will default to ‘mobile’ if present in the file and this field is not populated.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">emailMappingField</td>
            <td>
                The column name from within the CSV file that refers to the field on each row that should be used for Email messages.<br/>
                Sample Value: Email
                <br/><br/>
                <strong>Note:</strong> This field will default to ‘email’ if present in the file and this field is not populated.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">voiceMappingField</td>
            <td>
                The column name from within the CSV file that refers to the field on each row that should be used for Voice messages.<br/>
                Sample Value: Mobile
                <br/><br/>
                <strong>Note:</strong> This field will default to ‘mobile’ if present in the file and this field is not populated.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">options</td>
            <td>
                This specifies other options that are available within this bulk message.
                <br/>
                <ul>
                  <li>resolveRecipients (true/false) - Whether recipients should be resolved to contacts in the Whispir Workspace. Default: true for less than 5000 recipients</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Message Content Section – *Required when no template is used.*</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">Subject</td>
            <td>
                Defines the subject of the message.  The subject also acts as the first line of the SMS message.<br/>
                Sample Value: Mary had a little lamb.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Body</td>
            <td>
                The body of the SMS message being delivered.<br/>
                Sample Value: And its fleece was white as snow. Everywhere that Mary went, the lamb was sure to check her in 4Square. Soon, Mary was the president of the town.
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Email Section – *Required for email messages*</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">Body</td>
            <td>
                The body of the email message being delivered.<br/>
                Sample Value: Jack and Jill went up the hill.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Footer</td>
            <td>
                The footer of the email message being delivered. Usually used as an area for a signature.<br/>
                Sample Value: Regards, the well.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Type</td>
            <td>
                The type of the email content.<br/>
                Sample Value: text/plain (default) / text/html.
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Voice Section – *Required for voice messages*</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">Header</td>
            <td>
                The header of the voice content.<br/>
                Sample Value: The text to speech content of the introduction message for the voice call.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Body</td>
            <td>
                The content of the voice message.<br/>
                Sample Value: The text to speech content of the body message for the voice call.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Type</td>
            <td>
                The type parameter defines the other optional elements of the voice call.<br/>
                Sample Value: ConfCall:ConfAccountNo:ConfPinNo:ConfModPinNo:Pin:
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Web Section – *Required for web/rich push messages*</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">Body</td>
            <td>
                The body of the web message<br/>
                Sample Value: The body content of the web message to be delivered.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Type</td>
            <td>
                The type of the web message<br/>
                Sample Value: text/plain (default) / text/html.
            </td>
        </tr>
    </tbody>
</table>

## Response Structure

> > If the /message call is successful, the following response will be received.

```
HTTP 1.1 202 Accepted
Location: https://api.whispir.com/messages/4FBBC384BCE3DAABFE3?apikey=<your_api_key>

Your request has been accepted for processing.
```

> > The Location value in the Header contains the messageId (for the sent message) as shown in the response above.

If the request was successful, the response contains the information for the calling application to retrieve information about the message.

If the request was not successful, the response will contain the information about why the request could not be processed.  This will be as per the standard Whispir API response code rules.

In case of a dynamic message, the outcome of this message will be a complete message with placeholder variables @@ replaced with the supplied values.

For more information about retrieving the responses and status of the sent message, refer to [message status](/#message-status) below.

## Recipient Information

Using the Whispir API, users can send message to either ad-hoc or predefined recipients.

The details below describe how these can be used in the `<to>` field for any type of message.

**For ad-hoc recipients:**

Any valid E-mail address

 * <to>jsmtih@test.com</to>

Any valid Mobile number for SMS or Voice calls (countrycode prefixed)

 * <to>61423589146,6596624876</to>

Any valid Landline number for Voice calls only (countrycode prefixed)

 * <to>6197468794</to>


**For pre-entered Whispir recipients:**

Contacts can be used as a message recipient simply by specifying any valid Whispir Contact MRI

 * <to>John_Smith.782749@Contact.whispir.com</to>

Users can be used as a message recipient simply by specifying any valid Whispir User MRI

 * <to>John_Smith@User.whispir.com</to>

Distribution Lists can be used as a message recipient simply by specifying any valid Whispir Distribution List MRI

 * <to>Crisis_Management.Critical_Incident_Management@list.project.whispir.com</to>

Each of these can be found by using the Whispir API to search for the resource type and locate the MRI field in the response.

## Retrieve a previously sent Message

```
HTTP 1.1 GET https://api.whispir.com/messages/069BF68E5E0FE99B?apikey=[your_key]
Authorization: Basic <YOUR AUTH HEADER>
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <to>$mobile</to>
    <subject>Test Message</subject>
    <body>This is the body of my test SMS message</body>
    <label/> 
    <voice/>
    <from></from>
    <direction>OUTGOING</direction>
    <responseCount>0</responseCount>
    <social/>
    <createdTime>2012-09-24T15:36:16+10:00</createdTime>
    
    ...
    
    <ns3:link method="GET" 
       rel="self" 
       uri="http://api.whispir.com/messages/069BF68E5E0FE99B?apikey=[your-api-key]"/>
</ns2:message> 
````
```go
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "$mobile",
    "subject" : "Test Message",
    "body" : "This is the body of my test SMS message",
    "label" : "",
    "voice" : "",
    "web" : "",
    "from" : "",
    "direction" : "OUTGOING",
    "social" : "",
    "createdTime" : "1469414786000"
    "responseCount" : 0,
    
    ...
    
    "link": [
        {
          "uri": "https://api.whispir.com/messages/069BF68E5E0FE99B?apikey=[your-api-key]",
          "rel": "self",
          "method": "GET"
        }
      ]
}
````

A call to GET /messages gives you the list of last 20 sent messages. You can use the <a href="#pagination">Pagination</a> to retrieve further messages.

If a specific message has to retrieved then, you must know the message ID of the message. This can be done by retrieving the list of messages using *GET /messages* (include workspace if needed) and then loop through them to get details of each and every individual message.

*Note:* GET /messages will only retrieve the messages sent by you. But if you want to retrieve all the messages sent in the workspace (sent by others aswell), then append `&viewType=shared` in the URL query.
