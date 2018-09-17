#Scenarios

> API Endpoint

> > - generic

```xml
https://api.<region>.whispir.com/scenarios/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.scenario-v1+xml
```

```go
https://api.<region>.whispir.com/scenarios/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.scenario-v1+json
```

> > - limited to a workspace

```xml
https://api.<region>.whispir.com/workspaces/{:id}/scenarios/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.scenario-v1+xml
```

```go
https://api.<region>.whispir.com/workspaces/{:id}/scenarios/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.scenario-v1+json
```

```
> Resource type

- application/vnd.whispir.scenario-v1+xml
- application/vnd.whispir.scenario-v1+json


> Methods supported

- GET
- POST
- PUT
- DELETE
```

Scenarios allows users to simplify the message delivery processes through automated one click communications. The process involves creating a fixed message Or a message template combined with a contact or a distribution list. When the scenario is executed, the message is sent to the contacts.

Such use cases are widely useful in emergency notification scenarios where time is of essence. Not just messages (text), one can trigger Email, Voice and Social Media posts too suitable for different target audience as part of the scenario process.

**Eg:** "A fire outbreak evacuation notification with escape path" to all members of the office staff can be done much faster if a ready available message text and the handy distribution list of staff is created as a "Scenario". A one click approach here shall trigger the evacuation order to all the staff immediately. No time is lost in composing, selecting the contacts etc. 

The contacts can be picked as a static distribution list or a rule based dynamic distribution list, or just direct available numbers. This improves the effectiveness of the scenario's target group reach.

Not just an emergency, but any scenario where a fixed content/Rich Message has to be sent to a pool of contacts, Whispir's "Scenario" comes very handy.


## Creating a new Scenario

> Creating Scenario

> > The following API calls allow users to create Scenarios using the Whispir API.

```
HTTP 1.1 POST https://api.<region>.whispir.com/scenarios?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```xml
Content-Type: application/vnd.whispir.scenario-v1+xml 

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:scenario xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
	<title>Fire Evacuation Block A</title>
	<description>Fire evacuation notification for A block residents</description>
	<message>
		<to>$mobile</to>
		<subject>Fire Evacuation</subject>
		<body>A fire has been detected at level 55. Please evacuate the building immediately. Please do not use the lifts.</body>
	</message>
</ns2:scenario>
```

```go
Content-Type: application/vnd.whispir.scenario-v1+json

{
 	"title" : "Fire Evacuation Block A",
 	"description" : "Fire evacuation notification for A block residents",
 	"message" : {
	 	"to" : "$mobile",
	 	"subject" : "Fire Evacuation",
	 	"body" : "A fire has been detected at level 55. Please evacuate the building immediately. Please do not use the lifts."
 	}
}
```

> > This will give a successful response [201] along with the details of newly created scenario.

A scenario is a combination of a message and contacts. So, its structure contains section for both message as well as contact information. API currently only supports creation of scenario with SMS as communication mode.

To create a scenario, you can use the /scenarios endpoint.

The following fields are required:

1. name - name of the scenario
2. description - details of the scenario
3. message { to, subject, body }

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
				Specifies the name of the scenario
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">description:</td>
			<td><strong>String</strong><br/>
				Specifies the description of the scenario
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">allowedUsers:</td>
			<td><strong>String</strong><br/>
				Specifies the usage permission - 
				<ul>
					<li>EVERYONE</li>
					<li>SELECTEDUSERS</li>
				</ul>
				<br>
				When SELECTEDUSERS is provided, then `allowedUserIds` shall contain the userID of the allowed users.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">allowedUserIds:</td>
			<td><strong>String</strong><br/>
				Specifies the comma separated list of users who can run this scenario.
				<br>
				Only contains value when the allowedUsers is set to `SELECTEDUSERS`
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">message:</td>
			<td><strong>Object</strong><br/>
				Specifies the messaging options 
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">to:</td>
			<td><strong>String</strong><br/>
				Specifies the phone number or mri or distribution list to which the message has to be sent
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">subject:</td>
			<td><strong>String</strong><br/>
				Specifies the subject of the message
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">body:</td>
			<td><strong>String</strong><br/>
				Specifies the body of the message
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">label:</td>
			<td><strong>String</strong><br/>
				Specifies the label for the message (to view during reporting)
			</td>
		</tr>
		
		<tr>
			<td style="text-align: right; font-weight: bold;">email:</td>
			<td><strong>Object</strong><br/>
				Email message that can be sent as part of this scenario
				<br>
				<ul>
					<li>body: The main content of the email</li>
					<li>footer: footer of the email</li>
					<li>type: text/plain or text/html</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">voice:</td>
			<td><strong>Object</strong><br/>
				Similar to a text message, a voice call can also be triggered. This provides the necessary information for the channel.
				<br>
				<ul>
					<li>header: header for message. This will be played before the subject</li>
					<li>body: The main content of the message</li>
					<li>footer: footer for the message. Played after the body. Usually contains a thank you note.</li>
					<li>type: ConfCall:,ConfAccountNo:,ConfPinNo:,ConfModPinNo:,Pin:</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">web:</td>
			<td><strong>Object</strong><br/>
				Refer to <a href="https://whispir.github.io/api/?xml#web-and-social-messaging" title="web and social media messaging">web messaging</a>.
				The web message structure remains exactly the same
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">social:</td>
			<td><strong>Object</strong><br/>
				Refer to <a href="https://whispir.github.io/api/?xml#web-and-social-messaging" title="web and social media messaging">web messaging</a>
				The social message structure remains exactly the same
			</td>
		</tr>
	</tbody>
</table>

## Retrieving Scenarios


> Retrieving Scenario
> > The following API calls allow users to retrieve scenarios using the Whispir API.

```
HTTP 1.1 GET https://api.<region>.whispir.com/scenarios?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: your_api_key
```

```xml
Accept: application/vnd.whispir.scenario-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <status>1 to 2 of 2</status>
    <ns2:scenarios>
        <ns2:scenario>
            <title>Emergency Comms - Fire</title>
            <description>Scenario to use during fire evacuation</description>
            <createdTime>2015-07-20T17:18:58+08:00</createdTime>
            <ns2:link uri="https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:scenario>
        <ns2:scenario>
            <title>Scenario X</title>
            <description>This is a scenario where a scenario is created</description>
            <createdTime>2015-07-20T17:19:41+08:00</createdTime>
            <ns2:link uri="https://api.<region>.whispir.com/scenarios/6EE7F6F2E48B73B4?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:scenario>
    </ns2:scenarios>
</ns2:return>
```

```go
Accept: application/vnd.whispir.scenario-v1+json

{
  "scenarios": [
    {
      "title": "Emergency Comms - Fire",
      "description": "Scenario to use during fire evacuation",
      "createdTime": 1437383938000,
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "title": "Scenario X",
      "description": "This is a scenario where a scenario is created",
      "createdTime": 1437383981000,
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/scenarios/6EE7F6F2E48B73B4?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    }],
  "status": "1 to 2 of 2",
  "link": []
}
```

To retrieve a list of scenarios from the Whispir.io API you can execute an HTTP GET using the /scenarios endpoint.

You will need to supply one of the following headers (for retrieving JSON or XML):

* Accept: application/vnd.whispir.sceario-v1+xml
* Accept: application/vnd.whispir.scenario-v1+json

An array of Scenarios will be returned to you in the HTTP response body.

Each of these scenarios will provide the following information:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Response Elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">name:</td>
            <td><strong>String</strong><br/>
                Specifies the name of the scenario.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">description:</td>
            <td><strong>String</strong><br/>
                Specifies the broad description of the scenario.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">createdTime:</td>
            <td><strong>Number</strong><br/>
                Specifies the scenario created time value in Epoch
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">link:</td>
            <td><strong>Array</strong><br/>
                Provides a list of URLs that can be used to manipulate or access the scenario.
                <ul>
                  <li>uri - the link to access the scenario</li>
                  <li>rel - the descriptor for what the link will do</li>
                  <li>method - the HTTP method to use with this particular link</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

While that specifies the master list, doing a GET on a single scenario provides the following information - 

> Retrieving details of a single Scenario
> > Retrieving a single scenario details needs the ID of the scenario

```
HTTP 1.1 GET https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: your_api_key
```

```xml
Accept: application/vnd.whispir.scenario-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:scenario xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <title>Emergency Comms - Fire</title>
    <description>Scenario to use during fire evacuation</description>
    <createdTime>2015-07-20T17:18:58+08:00</createdTime>
    <allowedUsers>EVERYONE</allowedUsers>
    <message>
        <to>$mobile</to>
        <subject>Scenario Emergency Comms - Fire</subject>
        <body>sms test</body>
        <label></label>
        <voice/>
        <from>joe.bloggs.company@Contact.Melbourne.whispir.au</from>
        <social>
            <social id="socialType">
                <body>text/plain</body>
            </social>
        </social>
        <createdTime>2015-07-22T20:48:31+08:00</createdTime>
    </message>
    <ns3:link uri="https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]" rel="self" method="GET"/>
    <ns3:link uri="https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]" rel="updateScenario" method="PUT" type="application/vnd.whispir.scenario-v1+json,application/vnd.whispir.scenario-v1+xml"/>
    <ns3:link uri="https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]" rel="deleteScenario" method="DELETE" type="application/vnd.whispir.scenario-v1+json,application/vnd.whispir.scenario-v1+xml"/>
</ns2:scenario>
```

```go
Accept: application/vnd.whispir.scenario-v1+json

{
  "title": "Emergency Comms - Fire",
  "description": "Scenario to use during fire evacuation",
  "createdTime": 1437383938000,
  "allowedUsers": "EVERYONE",
  "message": {
    "to": "$mobile",
    "subject": "Scenario Emergency Comms - Fire",
    "body": "sms test",
    "label": "",
    "voice": {},
    "from": "joe.bloggs.company@Contact.Melbourne.whispir.au",
    "social": {
      "social": [
        {
          "id": "socialType",
          "body": "text/plain"
        }
      ]
    },
    "createdTime": 1437569311000,
  },
  "link": [
    {
      "uri": "https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]",
      "rel": "self",
      "method": "GET"
    },
    {
      "uri": "https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]",
      "rel": "updateScenario",
      "method": "PUT",
      "type": "application/vnd.whispir.scenario-v1+json,application/vnd.whispir.scenario-v1+xml"
    },
    {
      "uri": "https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]",
      "rel": "deleteScenario",
      "method": "DELETE",
      "type": "application/vnd.whispir.scenario-v1+json,application/vnd.whispir.scenario-v1+xml"
    }
  ]
}
```

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Response Elements</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td style="text-align: right; font-weight: bold;">name:</td>
			<td><strong>String</strong><br/>
				Specifies the name of the scenario
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">description:</td>
			<td><strong>String</strong><br/>
				Specifies the description of the scenario
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">createdTime:</td>
			<td><strong>Number</strong><br/>
				Specifies the scenario created time value in Epoch
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">allowedUsers:</td>
			<td><strong>String</strong><br/>
				Specifies the usage permission - 
				<ul>
					<li>EVERYONE</li>
					<li>SELECTEDUSERS</li>
				</ul>
				<br>
				When SELECTEDUSERS is provided, then `allowedUserIds` shall contain the userID of the allowed users.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">allowedUserIds:</td>
			<td><strong>String</strong><br/>
				Specifies the comma separated list of users who can run this scenario.
				<br>
				Only contains value when the allowedUsers is set to `SELECTEDUSERS`
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">message:</td>
			<td><strong>Object</strong><br/>
				Specifies the messaging options 
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">to:</td>
			<td><strong>String</strong><br/>
				Specifies the phone number or mri or distribution list to which the message has to be sent
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">subject:</td>
			<td><strong>String</strong><br/>
				Specifies the subject of the message
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">body:</td>
			<td><strong>String</strong><br/>
				Specifies the body of the message
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">label:</td>
			<td><strong>String</strong><br/>
				Specifies the label for the message (to view during reporting)
			</td>
		</tr>
		
		<tr>
			<td style="text-align: right; font-weight: bold;">email:</td>
			<td><strong>Object</strong><br/>
				Email message that can be sent as part of this scenario
				<br>
				<ul>
					<li>body: The main content of the email</li>
					<li>footer: footer of the email</li>
					<li>type: text/plain or text/html</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">voice:</td>
			<td><strong>Object</strong><br/>
				Similar to a text message, a voice call can also be triggered. This provides the necessary information for the channel.
				<br>
				<ul>
					<li>header: header for message. This will be played before the subject</li>
					<li>body: The main content of the message</li>
					<li>footer: footer for the message. Played after the body. Usually contains a thank you note.</li>
					<li>type: ConfCall:,ConfAccountNo:,ConfPinNo:,ConfModPinNo:,Pin:</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">web:</td>
			<td><strong>Object</strong><br/>
				Refer to <a href="https://whispir.github.io/api/?xml#web-and-social-messaging" title="web and social media messaging">web messaging</a>.
				The web message structure remains exactly the same
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">social:</td>
			<td><strong>Object</strong><br/>
				Refer to <a href="https://whispir.github.io/api/?xml#web-and-social-messaging" title="web and social media messaging">web messaging</a>
				The social message structure remains exactly the same
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">from:</td>
			<td><strong>String</strong><br/>
				The user/contact from whom this communication will be sent out when the scenario is run. <br>
				<b>Eg: </b> joe.bloggs.company@Contact.Melbourne.whispir.au
			</td>
		</tr>
		<tr>
            <td style="text-align: right; font-weight: bold;">link:</td>
            <td><strong>Array</strong><br/>
                Provides a list of URLs that can be used to manipulate or access the scenario.
                <ul>
                  <li>uri - the link to access the scenario</li>
                  <li>rel - the descriptor for what the link will do</li>
                  <li>method - the HTTP method to use with this particular link</li>
                </ul>
            </td>
        </tr>
	</tbody>
</table>

## Running a Scenario


> Running a Scenario
> > A simple POST call to the scenarios endpoint with the scenario ID triggers the scenario execution

```
HTTP 1.1 POST https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key

> > The expected response to this call is an HTTP 204 - No Content.
```

Running a Scenario , in other words, invoking a scenario triggers the communication to the intended recipients. The message (static or dynamic) will be sent on all the provided channels.

Running a scenario is very simple to do. The specific scenario has to called via a /POST request.

Step wise example -

1. Get all the scenarios
2. Pick the required scenario's link attribute
3. Make a /POST call

From the retrieving scenarios call above, we can get all the scenarios in the workspace. Choosing the `Emergency Comms - Fire` named Scenario, the link provided is `https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]`

Now invoking this scenario is just making a /POST call.  There is no need for a `Content-type` header as the payload is empty.


## Updating Scenario

To update existing scenario, you can use a PUT request the /scenarios endpoint.

> Updating a Scenario
> > The following API calls allow users to update Scenarios using the Whispir API.

```
HTTP 1.1 PUT https://api.<region>.whispir.com/scenarios/F0547F6F2E4839F8?apikey=[your_api_key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: your_api_key
```

```xml
Accept: application/vnd.whispir.scenario-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:scenario xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <title>Emergency Comms - Fire</title>
    <description>Scenario to use during fire evacuation</description>
    <allowedUsers>EVERYONE</allowedUsers>
    <message>
        <to>$mobile</to>
        <subject>Scenario Emergency Comms - Fire</subject>
        <body>Evacuate the building Immediately. Do not use the lifts.</body>
        <label></label>
        <voice/>
        <from>joe.bloggs.company@Contact.Melbourne.whispir.au</from>
        <social>
            <social id="socialType">
                <body>text/plain</body>
            </social>
        </social>
    </message>
</ns2:scenario>
```

```go
Accept: application/vnd.whispir.scenario-v1+json

{
  "title": "Emergency Comms - Fire",
  "description": "Scenario to use during fire evacuation",
  "allowedUsers": "EVERYONE",
  "message": {
    "to": "$mobile",
    "subject": "Scenario Emergency Comms - Fire",
    "body": "Evacuate the building Immediately. Do not use the lifts.",
    "label": "",
    "voice": {},
    "from": "joe.bloggs.company@Contact.Melbourne.whispir.au",
    "social": {
      "social": [
        {
          "id": "socialType",
          "body": "text/plain"
        }
      ]
    }
  }
}
```

The following fields are required:

1. name - name of the scenario
2. description - details of the scenario
3. message { to, subject, body }

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
				Specifies the name of the scenario
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">description:</td>
			<td><strong>String</strong><br/>
				Specifies the description of the scenario
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">createdTime:</td>
			<td><strong>Number</strong><br/>
				Specifies the scenario created time value in Epoch
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">allowedUsers:</td>
			<td><strong>String</strong><br/>
				Specifies the usage permission - 
				<ul>
					<li>EVERYONE</li>
					<li>SELECTEDUSERS</li>
				</ul>
				<br>
				When SELECTEDUSERS is provided, then `allowedUserIds` shall contain the userID of the allowed users.
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">allowedUserIds:</td>
			<td><strong>String</strong><br/>
				Specifies the comma separated list of users who can run this scenario.
				<br>
				Only contains value when the allowedUsers is set to `SELECTEDUSERS`
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">message:</td>
			<td><strong>Object</strong><br/>
				Specifies the messaging options 
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">to:</td>
			<td><strong>String</strong><br/>
				Specifies the phone number or mri or distribution list to which the message has to be sent
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">subject:</td>
			<td><strong>String</strong><br/>
				Specifies the subject of the message
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">body:</td>
			<td><strong>String</strong><br/>
				Specifies the body of the message
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">label:</td>
			<td><strong>String</strong><br/>
				Specifies the label for the message (to view during reporting)
			</td>
		</tr>
		
		<tr>
			<td style="text-align: right; font-weight: bold;">email:</td>
			<td><strong>Object</strong><br/>
				Email message that can be sent as part of this scenario
				<br>
				<ul>
					<li>body: The main content of the email</li>
					<li>footer: footer of the email</li>
					<li>type: text/plain or text/html</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">voice:</td>
			<td><strong>Object</strong><br/>
				Similar to a text message, a voice call can also be triggered. This provides the necessary information for the channel.
				<br>
				<ul>
					<li>header: header for message. This will be played before the subject</li>
					<li>body: The main content of the message</li>
					<li>footer: footer for the message. Played after the body. Usually contains a thank you note.</li>
					<li>type: ConfCall:,ConfAccountNo:,ConfPinNo:,ConfModPinNo:,Pin:</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">web:</td>
			<td><strong>Object</strong><br/>
				Refer to <a href="https://whispir.github.io/api/?xml#web-and-social-messaging" title="web and social media messaging">web messaging</a>.
				The web message structure remains exactly the same
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">social:</td>
			<td><strong>Object</strong><br/>
				Refer to <a href="https://whispir.github.io/api/?xml#web-and-social-messaging" title="web and social media messaging">web messaging</a>
				The social message structure remains exactly the same
			</td>
		</tr>
		<tr>
			<td style="text-align: right; font-weight: bold;">from:</td>
			<td><strong>String</strong><br/>
				The user/contact from whom this communication will be sent out when the scenario is run. <br>
				<b>Eg: </b> joe.bloggs.company@Contact.Melbourne.whispir.au
			</td>
		</tr>
	</tbody>
</table>

## Deleting Scenario

> Deleting a Scenario
> > The following API calls allow users to delete Scenarios using the Whispir API.

```
HTTP 1.1 DELETE https://api.<region>.whispir.com/scenarios/6EE7F6F2E48B73B4?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key

> > The expected response to this call is an HTTP 204 - No Content.
```

Deleting a Scenario can be done via a DELETE call to the /scenarios endpoint. The request has to be targeted at a particular Scenario with the Scenario ID in the URI.
