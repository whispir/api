# Activities

> API Endpoint

> > - generic

```xml
https://api.<region>.whispir.com/activities/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.activity-v1+xml
```

```go
https://api.<region>.whispir.com/activities/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.activity-v1+json
```

> > - limited to a workspace

```xml
https://api.<region>.whispir.com/workspaces/{:id}/activities/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.activity-v1+xml
```

```go
https://api.<region>.whispir.com/workspaces/{:id}/activities/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.activity-v1+json
```

```
> Resource type

- application/vnd.whispir.activity-v1+xml
- application/vnd.whispir.activity-v1+json


> Methods supported

- GET
- POST
```

Activities are all the individual changes, tasks, calls, messages.. just about everything performed in a given company workspaces. Each Activity log entry contains information about the workspace, the module(message, email, IVR..), the user who performed it, time stamps, description of the activity, and its status (success, fail) etc.

All of these helps in fulfilling the auditing, standards compliance and also change tracking. For example -

 - As a Whispir API user (Voice Module), If you want to be able to update the Whispir Activity Log as the call progresses through the IVR to ensure that the auditing shows exactly what information a caller heard.
 - As a Whispir API user (SMS Module), If you want to able to retrieve the information about all the message sent by a specific user, the activity log can help you with that.

As activities information is sensitive, stricter permission rules apply to the data served by these endpoints.
- Any API user will be able to perform a GET on /activities
- If the user is a Company Admin or Company Leader, they will receive a 200 OK with the valid response
- If the user is a Company Member or Company Guest, they will receive a 403 Forbidden advising they don't have permission to access this resource
- Company Admin or Company Leader can also create content within the Activity Stream. They can do this through a POST of data to either the /activities endpoint, or to the specific Activity ID.
- They must specify a valid 'Action', 'Description' and 'Status' within their request
- Posting to the /activities endpoint will create a new activity
- Posting to the /activities/ {ID} endpoint will append the content to the detail of the specified activity

## Creating an activity log

```
HTTP 1.1 POST https://api.<region>.whispir.com/activities?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```xml
Content-Type: application/vnd.whispir.activity-v1+xml


<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:activity xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <module>Message</module>
    <action>Send</action>
    <status>Successful</status>
    <description>Message sent via the Whispir's Java library</description>
</ns3:activity>
```

```go
Content-Type: application/vnd.whispir.activity-v1+json

{
  "module": "Message",
  "action" : "Send",
  "status" : "Successful",
  "description" : "Message sent via the Whispir's Java library"
}
```

```
> Response will be `201 Created`
```

To create a new workspace, you can use the /activities endpoint.

Only **3 fields** are required:

1. module - The name of the module in which the activity is performed (see the high-level request elements table below for list of modules).
2. action - The action performed.
3. status - The status of the action.

**Note**: There is no limit to the amount of activities that can be created.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">action :</td>
      <td><strong>String</strong><br/>
        Specifies the action performed during this activity.
        The following are the list of actions that can be performed -
        <ul>
          <li>Create</li>
          <li>Update</li>
          <li>Move</li>
          <li>Copy</li>
          <li>Draft</li>
          <li>Send</li>
          <li>Modified</li>
          <li>Delete</li>
          <li>Contact Import File</li>
          <li>Login</li>
          <li>Approve</li>
          <li>Reject</li>
          <li>Dispatch</li>
          <li>Register</li>
          <li>Accept</li>
          <li>Closed</li>
          <li>Map</li>
          <li>Un-map</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">module:</td>
      <td><strong>String</strong><br/>
        Specifies the module to which this activity belongs to.
        The following are the list of actions that can be performed -
        <ul>
          <li>System</li>
          <li>Message</li>
          <li>Scheduled Message</li>
          <li>User</li>
          <li>Contact</li>
          <li>DistributionList</li>
          <li>Template</li>
          <li>Workspace</li>
          <li>Event</li>
          <li>WebService</li>
          <li>Settings</li>
          <li>Conversation</li>
          <li>Gateway</li>
          <li>Workspace Mapping</li>
          <li>Folders</li>
          <li>Team</li>
          <li>RSS</li>
          <li>API Mapping</li>
          <li>Asset</li>
          <li>Instruction</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">workspace:</td>
      <td><strong>String</strong><br/>
        The workspace in which this activity is performed. This will usually be the API user's default workspace
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">user:</td>
      <td><strong>String</strong><br/>
        The username of the person who performed this activity.	This will usually be the API user invoking the creation.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">status:</td>
      <td><strong>String</strong><br/>
        Specifies the status of the activity. The status can be one of -
        <ul>
          <li>Successful</li>
          <li>Failed</li>
          <li>Rejected</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">description:</td>
      <td><strong>String</strong><br/>
        The description of the activity. This is a free text that details about the activity. <br><br> <b>Note:</b> If this is not provided during the creation of the activity, this field will not exist for the specific activity. As updating an activity is not allowed, care has to be taken to ensure that absence of this field is justified as per your audit - compliance needs.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">time:</td>
      <td><strong>String</strong><br/>
        The date and time of the activity in the format: dd/mm/yy hh:mm. This will be defaulted to the time at which this activity is created.
      </td>
    </tr>
  </tbody>
</table>

## Retrieving Activities

To retrieve a list of activities from the Whispir.io API you can execute an HTTP GET using the /activities endpoint.

```
HTTP 1.1 GET https://api.<region>.whispir.com/activities?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```xml
Accept: application/vnd.whispir.activity-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <ns2:activities>
        <ns2:activity>
            <user>james.cameron</user>
            <time>17/08/15 13:29</time>
            <action>Send</action>
            <description>Message sent via the Whispir's Java library</description>
            <status>Successful</status>
            <module>Message</module>
            <workspaceName>Whispir</workspaceName>
            <ns2:link uri="https://api.<region>.whispir.com/activities/9B26BCE6A7C1997D3E3C04D4C0B62165?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:activity>
        <ns2:activity>
            <user>james.cameron</user>
            <time>17/08/15 12:56</time>
            <action>Create</action>
            <status>Successful</status>
            <module>Workspace</module>
            <workspaceName>Whispir</workspaceName>
            <ns2:link uri="https://api.<region>.whispir.com/activities/CF8F388F18FDDA7CA40F42E888EC8E67?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:activity>
        <ns2:activity>
            <user>james.cameron</user>
            <time>17/08/15 12:26</time>
            <action>Draft</action>
            <description>Template for default notification messages</description>
            <status>Successful</status>
            <module>Template</module>
            <workspaceName>Whispir</workspaceName>
            <ns2:link uri="https://api.<region>.whispir.com/activities/19F603F21E8A7D536D577A6B4DBCFE3F?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:activity>
    <ns2:activity>
            <user>markm</user>
            <time>22/12/14 11:37</time>
            <action>Logout</action>
            <description>Logged out</description>
            <status>Successful</status>
            <module>System</module>
            <workspaceName>ABC Operations</workspaceName>
            <ns2:link uri="http://app19.dev1.whispir.net:8080/api/activities/0DEB48AB3D3B6069D7DA1A808F5A5DE4?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:activity>
        <ns2:activity>
            <user>markm</user>
            <time>22/12/14 11:20</time>
            <action>Login</action>
            <description> Logged in, IP:127.0.0.1, Country: </description>
            <status>Successful</status>
            <module>System</module>
            <workspaceName>ABC Operations</workspaceName>
            <ns2:link uri="http://app19.dev1.whispir.net:8080/api/activities/0CEC8009230B3B92F5B548A22B55C407?apikey=[your_api_key]" rel="self" method="GET"/>
        </ns2:activity>
    </ns2:activities>
</ns2:return>
```

```go
Accept: application/vnd.whispir.activity-v1+json

{
  "activities": [
    {
      "user": "james.cameron",
      "time": "17/08/15 13:29",
      "action": "Send",
      "description": "Message sent via the Whispir's Java library",
      "status": "Successful",
      "module": "Message",
      "workspaceName": "Whispir",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/activities/9B26BCE6A7C1997D3E3C04D4C0B62165?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "user": "james.cameron",
      "time": "17/08/15 12:56",
      "action": "Create",
      "status": "Successful",
      "module": "Workspace",
      "workspaceName": "Whispir",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/activities/CF8F388F18FDDA7CA40F42E888EC8E67?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "user": "james.cameron",
      "time": "17/08/15 12:26",
      "action": "Draft",
      "description": "Template for default notification messages",
      "status": "Successful",
      "module": "Template",
      "workspaceName": "Whispir",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/activities/19F603F21E8A7D536D577A6B4DBCFE3F?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
  {
      "user": "markm",
      "time": "22/12/14 11:37",
      "action": "Logout",
      "description": "Loged out",
      "status": "Successful",
      "module": "System",
      "workspaceName": "ABC Operations",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/activities/0DEB48AB3D3B6069D7DA1A808F5A5DE4?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
  {
      "user": "markm",
      "time": "22/12/14 11:20",
      "action": "Login",
      "description": "Logged in, IP:8.8.8.8, Country: USA",
      "status": "Successful",
      "module": "System",
      "workspaceName": "ABC Operations",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/activities/0CEC8009230B3B92F5B548A22B55C407?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    }
  ],
  "link": []
}
```

You will need to supply one of the following headers (for retrieving JSON or XML):

 * Accept: application/vnd.whispir.activity-v1+xml
 * Accept: application/vnd.whispir.activity-v1+json

An array of activities will be returned to you in the HTTP response body.

Each of these activities will provide the following information:

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Response Elements</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">action :</td>
      <td><strong>String</strong><br/>
        Specifies the action performed during this activity.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">module:</td>
      <td><strong>String</strong><br/>
        Specifies the module to which this activity belongs to.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">workspace:</td>
      <td><strong>String</strong><br/>
        The workspace in which this activity is performed.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">user:</td>
      <td><strong>String</strong><br/>
        The username of the person who performed this activity.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">status:</td>
      <td><strong>String</strong><br/>
        Specifies the status of the activity. The status can be one of -
        <ul>
          <li>Successful</li>
          <li>Failed</li>
          <li>Rejected</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">description:</td>
      <td><strong>String</strong><br/>
        The description of the activity.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">time:</td>
      <td><strong>String</strong><br/>
        The date and time of the activity in the format: dd/mm/yy hh:mm.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">link:</td>
      <td><strong>Array</strong><br/>
        Provides a list of URLs that can be used to manipulate or access the activity.
        <br>
        <ul>
          <li>uri - the link to access the activity</li>
          <li>rel - the descriptor for what the link will do</li>
          <li>method - the HTTP method to use with this particular link</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

**Note:** The API currently results in a `404 Not Found` when there are no activities present in the log for a given search criteria. This should not be not confused with a failed response. But rather as `No Data Found`.

### Restricting to only a single workspace

```
HTTP 1.1 GET https://api.<region>.whispir.com/activities?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```
HTTP 1.1 GET https://api.<region>.whispir.com/workspace/B7BFEF555F0F7F81/activities?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

By default, `GET /activities` returns all the activities at company level. This covers all the workspaces. So, if the items has to limited to a specific workspace, one has to use the workspace as the endpoint and activities followed by it.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Request Information</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">Request</td>
      <td style="text-align: left; font-weight: bold;">Description</td>
    </tr>
    <tr>
      <td style="text-align: right;;">/activities</td>
      <td>Only returns activity that took place in My Company</td>
    </tr>
    <tr>
      <td style="text-align: right;;">/workspaces/:id/activities</td>
      <td>Only returns activity that took place in the specified workspace</td>
    </tr>
  </tbody>
</table>

## Search or Filter on Activity Logs

Activity logs can become quickly huge owing to the amount of actions performed. In such cases, to have a proper filtering of data during a GET /activities, Whispir API provides very neat filtering options on the data.

```
HTTP 1.1 GET https://api.<region>.whispir.com/activities?apikey=[your_api_key]&field=value
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

All filter options are to be passed in as URL query parameters.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Search Criteria</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">action :</td>
      <td>/activities?action=Map</td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">module:</td>
      <td>/activities?module=Message</td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">user:</td>
      <td>/activities?user=james</td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">workspace:</td>
      <td>/activities?workspace=Whispir. <br/><br/>One can also refer to <i>restricting to only a workspace</i> section above</td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">status:</td>
      <td>/activities?status=Successful</td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">description:</td>
      <td>/activities?description=Imported</td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">Start time:</td>
      <td>The date and time to start searching from in the format: dd/mm/yyyy hh:mm. This will search on the `time` field <br/><br/>
        /activities?startTime=01/01/2015%2000:00
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">End time:</td>
      <td>The date and time to start searching from in the format: dd/mm/yyyy hh:mm<br/><br/>
        /activities?endTime=01/01/2015%2000:00
      </td>
    </tr>
  </tbody>
</table>

**Note:** The API currently results in a `404 Not Found` when there are no activities present in the log for a given search criteria. This should not be not confused with a failed response. But rather as `No Data Found`.

## Updating, Deleting an activity

Activities can only be created and retrieved. They **cannot** be updated or deleted.
