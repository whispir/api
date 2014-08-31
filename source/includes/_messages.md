# Messages

> Sample to send an SMS, Email, Voice call, and Web Publishing in one request

```xml
HTTP 1.1 POST https://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>61400000000</to>
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
HTTP 1.1 POST https://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+json

{
    "to" : "61400000000",
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
        "social" : {
            "id" : "social",
            "body" : "Twitter Content."
        },
        "social" : {
            "id" : "social_long",
            "body" : "Facebook Content.",
            "type" : "text/plain"
        }
    },
    "type" : "defaultNoReply"
}
````

Messages are the core of what the Whispir API offers as a service to customers. 

The **messages** endpoint allows a user to perform the following tasks:

1. Retrieve a list of Sent messages
2. Create (send) a new message

These are described in more detail below:

##

As message resources can exist in the default (Company) workspace or other workspace, messages have two access URLs:

* https://api.whispir.com/messages - for Company Workspace messages 
* https://api.whispir.com/workspaces/:id/messages - for other Workspace messages

If your application does not require separate workspaces, you can simply send all messages from the default Company workspace.

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
                Allows the user to modify the message behaviour for replies and DLRs (delivery receipts) e.g.
                <ul>
                    <li>defaultNoReply - Used to reject any replies to this message.</li>
                    <li>noDlr - Used to specify that DLRs should not be enabled for this message.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

## SMS Messages

```xml
HTTP 1.1 POST https://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>61400000000</to>
    <subject>Test SMS Message</subject>    
    <body>This is the body of my test SMS message</body>
</ns2:message> 
```

```go
HTTP 1.1 POST http://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
   "to" : "61400000000",
   "subject" : "Test SMS Message",
   "body" : "This is the body of my test SMS message"
}
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

**Notes:**

Each SMS message can contain up to **1600** characters. 

* The Subject field is Mandatory.
* The Body field is Mandatory.


## Email Messages

> Plain Text Email Example

```xml
HTTP 1.1 POST https://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>john.smith@test.com</to>
    <subject>Test Email Message</subject>    
    <email>
        <body>This is the body of my test Email message</body>
        <footer>This is footer of my test Email</footer>
        <type>text/plain</type>
    </email>
</ns2:message> 
```

```go
HTTP 1.1 POST http://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
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
> Rich Text Email Example

```xml
HTTP 1.1 POST https://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
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
HTTP 1.1 POST http://api.whispir.com/messages?apikey=<yourkey>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
    "to" : "john.smith@test.com",
    "subject" : "Test Email Message",
    "email" : {
        "body" : "<div id='content'><p>This is my content</p></div>",
        "type" : "text/plain"
    }
}
```

Whispir can easily be used as an API email gateway to deliver thousands of rich content emails for your campaigns.

**Mandatory fields**

* The Subject field is Mandatory.
* The Body field is Mandatory.
* The Type field is Mandatory and must specify a value of 'text/plain' or 'text/html' to describe the content of the message.

**Whispir's support of Rich (HTML) Emails**

* HTML, HEAD and BODY HTML elements are not supported.  HTML content assumes that it is starting from within the BODY tag.
* HTML form and input elements are not supported in most email clients.  These can be included in the HTML content but should be thoroughly tested prior to use.
* STYLE elements are supported.  It is recommended that a single STYLE element at the top of the HTML that defines the styles for the entire email.  However, inline styles are also supported.
* Javascript is not supported and should not be used in e-mail messages.
* Images must be referenced through absolute web urls, any other mechanism will not work on most email clients.
<br/><br/>**Note:** Whispir does not host images for clients, you must use another hosting service and reference the URL in your Whispir request payload.