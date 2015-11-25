#Users

> API Endpoint

> > - generic

```xml
https://api.whispir.com/users/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.user-v1+xml
```

```go
https://api.whispir.com/users/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.user-v1+json
```

> > - limited to a workspace

```xml
https://api.whispir.com/workspaces/{:id}/users/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.user-v1+xml
```

```go
https://api.whispir.com/workspaces/{:id}/users/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.user-v1+json
```

```
> Resource type

- application/vnd.whispir.user-v1+xml
- application/vnd.whispir.user-v1+json


> Methods supported

- GET
- POST
- PUT
- DELETE
```

Access to use the Whispir API, Platform and its features is strictly limited to user permission set. One needs to have 
proper permissions to access all the features provided by the platform, and when using the API, have appropriate permissions to modify the user attributes of themselves or others in their company workspaces.

> Invalid Permission Error
> > If the API user account does not have the permissions needed to operate on an user account, the API will give a `403 Forbidden` response. So make sure the account has all the necessary permissions. Use Whispir Platform Environment URL given in the whispir.io apps screen to login and manage the permissions

The Whispir API provides the /users endpoint to serve the purpose of managing the users of the platform. One can
 - Retrieve users of a workspace
 - Add new users
 - Modify user status (except their own)
 - Modify user's information
 - Delete user

An User ability to access the features is limited to the `STATUS` he/she is assigned to. They can have only one status at any given point of time and the change of status is controlled by the "user state machine". The state machine follows the following tabulated rules -

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">User Status</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">PENDING (P)</td>
      <td>User has been just created and this is the default status one will be given.<br/>
      Status can be modified to - 
      <ul>
        <li>INACTIVE</li>
        <li>DELETED</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">INACTIVE (I)</td>
      <td>User has been set to Inactive Status. During this state they CANNOT access the platform until they are set to Active again.<br/>
      Status can be modified to - 
      <ul>
        <li>ACTIVE</li>
        <li>DELETED</li>
      </ul>
    <br/>
    <b>Note:</b> If you are the user who is changing your status, beware that setting yourself to InActive results you in being locked out of your own account. Always use another account in your company to change your account status. Have a beer to get this slide down your throat. I did too.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">SUSPENDED (B)</td>
      <td>User has been Suspended. In this State they can access the platform, but cannot use the features on the platform<br/>
      Status can be modified to - 
      <ul>
        <li>ACTIVE</li>
        <li>DELETED</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">DELETED (D)</td>
      <td>User has been Deleted. This is Soft delete, so their record exists, but they are marked as deleted.<br/>
      Status cannot be modified once set to Deleted.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">ACTIVE (A)</td>
      <td>User is Active. They can use all the features (they are assigned/allowed to) on the platform.<br/>
      Status can be modified to - 
      <ul>
        <li>SUSPENDED</li>
        <li>DELETED</li>
      </ul> 
      </td>
    </tr>
  </tbody>
</table>

So for example -

If an user has been newly created, the default status is PENDING (P). Now, to Activate the user, the User must be set to INACTIVE first via a `PUT` request and then finally set to ACTIVE (A) via another `PUT`. They cannot be directly set to (A) from (P). 

##Creating new User

> Creating new User
> > Users can easily be created by using the following request structure

```
POST https://api.whispir.com/users?apikey=[your api key]
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.user-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:user xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <firstName>John</firstName>
    <lastName>Wick</lastName>
    <userName>John.Wick</userName>
    <password>AmF10gt_x</password>
    <timezone>Australia/Melbourne</timezone>
    <workEmailAddress1>jsmith@testcompany.com</workEmailAddress1>
    <workMobilePhone1>61423456789</workMobilePhone1>
    <workCountry>Australia</workCountry>
</ns2:user>
```

```go
Content-Type: application/vnd.whispir.user-v1+json

{
    "firstName": "John",
    "lastName": "Wick",
    "userName": "John.Wick",
    "password": "AmF10gt_x",
    "timezone": "Australia/Melbourne",
    "workEmailAddress1": "jwick@testcompany.com",
    "workMobilePhone1": "61423456789",
    "workCountry": "Australia"
}
```
> > The successful response will be a 201 with the details of the user created and their associated unique `mri`.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns3:user xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <userName>John.Wick</userName>
    <password></password>
    <status>PENDING</status>
    <firstName>John</firstName>
    <lastName>Wick</lastName>
    <personalEmailAddress2></personalEmailAddress2>
    <personalCountry>Australia</personalCountry>
    <workEmailAddress1>jwick@testcompany.com</workEmailAddress1>
    <workMobilePhone1>61423456789</workMobilePhone1>
    <workCountry>Australia</workCountry>
    <workPostalCountry>Australia</workPostalCountry>
    <timezone>Australia/Melbourne</timezone>
    <ns2:link uri="https://api.whispir.com/users/AF48A9EC3F02E43C?apikey=[your api key]" rel="self" method="GET"/>
    <ns2:link uri="https://api.whispir.com/users?apikey=[your api key]" rel="updateUser" method="PUT" type="application/vnd.whispir.user-v1+xml,application/vnd.whispir.user-v1+json"/>
    <ns2:link uri="https://api.whispir.com/users/AF48A9EC3F02E43C?apikey=[your api key]" rel="deleteUser" method="DELETE"/>
</ns3:user>

```

```go
{
  "userName": "John.Wick",
  "password": "",
  "status": "PENDING",
  "firstName": "John",
  "lastName": "Wick",
  "personalEmailAddress2": "",
  "personalCountry": "Australia",
  "workEmailAddress1": "jwick@testcompany.com",
  "workMobilePhone1": "61423456789",
  "workCountry": "Australia",
  "workPostalCountry": "Australia",
  "timezone": "Australia/Melbourne",
  "link": [
    {
      "uri": "https://api.whispir.com/users/AF48A9EC3F02E43C?apikey=[your api key]",
      "rel": "self",
      "method": "GET"
    },
    {
      "uri": "https://api.whispir.com/users/AF48A9EC3F02E43C?apikey=[your api key]",
      "rel": "updateUser",
      "method": "PUT",
      "type": "application/vnd.whispir.user-v1+xml,application/vnd.whispir.user-v1+json"
    },
    {
      "uri": "https://api.whispir.com/users/AF48A9EC3F02E43C?apikey=[your api key]",
      "rel": "deleteUser",
      "method": "DELETE"
    }
  ]
}
```

To create a new user, you can use the `/users` endpoint. The method is POST. Ensure that the necessary permissions are provided to the API account to create or modify user accounts.

When creating an account, the following fields are mandatory:

- userName
- password
- firstName
- lastName
- timezone
- workCountry

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Request Elements</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">userName:</td>
      <td><strong>String</strong><br/>
        Specifies the username for the account
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">password:</td>
      <td><strong>String</strong><br/>
        Specifies the password for the account<br>
        <b>Note: </b> The following are the rules for the password:
        <ul>
          <li>Alpha Numeric [a-zA-Z0-9_]</li>
          <li>Must have at least one uppercase and one lowercase character</li>
          <li>Minimum Length is 8 Characters</li>
          <li>Any special characters other than `_` (underscore) cannot be used in the passwords</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">firstName:</td>
      <td><strong>String</strong><br/>
        Specifies the firstName of the user
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">middleName:</td>
      <td><strong>String</strong><br/>
        Specifies the middleName of the user
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">lastName:</td>
      <td><strong>String</strong><br/>
        Specifies the lastName of the user
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">title:</td>
      <td><strong>String</strong><br/>
        The title of the name
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">nickname:</td>
      <td><strong>String</strong><br/>
        Preferred name to be shown in the platfom interface
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">status:</td>
      <td><strong>String</strong><br/>
        Specifies the validity status of the user. The status can be one of - 
        <ul>
          <li>Active (A)</li>
          <li>InActive (I)</li>
          <li>Pending (P)</li>
          <li>Suspended (B)</li>
          <li>Deleted (D)</li>
        </ul>
        <b>Note: </b>The default status is PENDING. One cannot set the status while creation of account. Read `User State Machine` again mentioned above.
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
        Specifies the Division in the company to which this user is associated with
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">department:</td>
      <td><strong>String</strong><br/>
        Specifies the Department in the company to which this user is associated with
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
        Specifies the timezone in which the user lives in. Values in relation to GMT.<br/><br/>
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
  </tbody>
</table>


## Retrieving Users

> Retrieving a list of Users
> > Users can easily be retrieved from the Whispir API using the following endpoints:

```
HTTP 1.1 GET https://api.whispir.com/users?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.user-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <status>1 to 1 of 1</status>
    <ns2:Users>
        <ns2:user>
            <id>AF48A9EC3F02E43C</id>
            <firstName>Fred</firstName>
            <lastName>Smith</lastName>
            <companyName>Whispir Pte Ltd</companyName>
            <workEmailAddress1>fsmith@testcompany.com</workEmailAddress1>
            <workMobilePhone1>61423456789</workMobilePhone1> 
            <ns2:link method="GET" 
                      rel="self" 
                      uri="http://api.whispir.com/users/AF48A9EC3F02E43C?apikey=<your_api_key>"/>
        </ns2:user>

		...

    </ns2:Users>
</ns2:return>
````

```go
Accept: application/vnd.whispir.user-v1+json

{
  "status": "1 to 1 of 1",
  "Users": [
    {
      "id": "AF48A9EC3F02E43C",
      "firstName": "Fred",
      "lastName": "Smith",
      "companyName": "Whispir Pte Ltd",
      "workEmailAddress1": "fsmith@testcompany.com",
      "workMobilePhone1": "61423456789",
      "link": {
        "method": "GET",
        "rel": "self",
        "uri": "http://api.whispir.com/users/AF48A9EC3F02E43C?apikey=<your_api_key>"
      }
    },

	...

  ]
}
```

Users can be retrieved quite easily with a GET request to the `/users`. A simple /users will result in all users being retrieved with all of their basic identity information. The result will only be limited to users with ACTIVE status. User's with other status will not be listed in the results.

Once the request is placed, the response will be a list of url's to each of the users that the API user has access to/or has requested for via the search criteria. 

**Note:** The sample request here shows users from the company the existing API user is associated with. You cannot retrieve users list from outside of your company and users with status != ACTIVE.

### Get a specific user

> Retrieving a specific user
> > Users can retrieve a specific user by supplying the user ID in the URL.

```
HTTP 1.1 GET https://api.whispir.com/users/AF48A9EC3F02E43C?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.user-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:user xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
   <id>AF48A9EC3F02E43C</id>
   <firstName>Fred</firstName>
   <lastName>Smith</lastName>
   <status>ACTIVE</status>
   ... remaining of the user object
   <ns2:link method="GET" 
             rel="self" 
             uri="http://api.whispir.com/users/AF48A9EC3F02E43C?apikey=<your_api_key>"/>
</ns2:user>
```

```go
Accept: application/vnd.whispir.user-v1+json

{
   "id": "AF48A9EC3F02E43C",
   "firstName": "Fred",
   "lastName": "Smith",
   "status": "ACTIVE",
   ... remaining of the user object
   "link": {
     "method": "GET",
     "rel": "self",
     "uri": "http://api.whispir.com/users/AF48A9EC3F02E43C?apikey=<your_api_key>"
   }
}
```

To get details of a specific user, the URI must be passed with the ID of the user. So, the URI shall be: `https://api.whispir.com/users/AF48A9EC3F02E43C` 
Where `AF48A9EC3F02E43C` is the user id.

### Retrieving workspace users

> Retrieving list of users having access on a workspace
> > 

```
HTTP 1.1 GET https://api.whispir.com/workspaces/C727BCE3A813E2B1/users/?apiKey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.user-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.whispir.com/dap" xmlns:ns3="http://schemas.api.whispir.com">
    <status>1 to 20 of 28</status>
    <ns2:link uri="https://api.whispir.com/workspaces/C727BCE3A813E2B1/users/?apikey=<your_api_key>&offset=20&limit=20" rel="next" method="GET"/>
    <ns2:users>
        <ns2:user>
            <id>AF48A9EC3F02E43C</id>
            <firstName>Fred</firstName>
            <lastName>Smith</lastName>
            <companyName>Whispir Pte Ltd</companyName>
            <workEmailAddress1>fsmith@whispir.com</workEmailAddress1>
            <workMobilePhone1>6512348765</workMobilePhone1>
            <ns2:link uri="https://api.whispir.com/workspaces/C727BCE3A813E2B1/users/AF48A9EC3F02E43C?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:user>
        <ns2:user>
            <id>DFC878BCB2EF9258</id>
            <firstName>John</firstName>
            <lastName>Wick</lastName>
            <companyName>SHIELD</companyName>
            <workEmailAddress1>jwick@whispir.com</workEmailAddress1>
            <ns2:link uri="https://api.whispir.com/workspaces/C727BCE3A813E2B1/users/DFC878BCB2EF9258?apikey=<your_api_key>" rel="self" method="GET"/>
        </ns2:user>

        ...

    </ns2:users>
</ns2:return>
```

```go
Accept: application/vnd.whispir.user-v1+json

{
  "users": [
    {
      "id": "AF48A9EC3F02E43C",
      "firstName": "Fred",
      "lastName": "Smith",
      "companyName": "Whispir Pte Ltd",
      "workEmailAddress1": "fsmith@whispir.com",
      "workMobilePhone1": "6512348765",
      "link": [
        {
          "uri": "https://api.whispir.com/workspaces/C727BCE3A813E2B1/users/AF48A9EC3F02E43C?apikey=<your_api_key>",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "id": "DFC878BCB2EF9258",
      "firstName": "John",
      "lastName": "Wick",
      "companyName": "",
      "workEmailAddress1": "jwick@whispir.com",
      "link": [
        {
          "uri": "https://api.whispir.com/workspaces/C727BCE3A813E2B1/users/DFC878BCB2EF9258?apikey=<your_api_key>",
          "rel": "self",
          "method": "GET"
        }
      ]
    },

    ...

    "status": "1 to 20 of 28",
    "link": [
    {
      "uri": "https://api.whispir.com/workspaces/C727BCE3A813E2B1/users/?apikey=<your_api_key>&offset=10&limit=10",
      "rel": "next",
      "method": "GET"
    }
  ]
}
```

To retrieve the list of users, the request is made to via GET to `/workspaces/{:id}/users` endpoint.

By default there will be a limit of 20 users returned in a request.

The user will use the limit and offset query parameters to determine how many users they would like to receive. (default when not provided will be limit=20 & offset=0)

## Searching for users

> Searching for users
> > Users can easily use further query parameters to search for specific users within Whispir.

```
HTTP 1.1 GET https://api.whispir.com/users?apikey=<your_api_key>&firstName=Sam&sortOrder=desc&sortFields=workEmailAddressPrimary
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Accept: application/vnd.whispir.user-v1+xml
```

```go
Accept: application/vnd.whispir.user-v1+json
```

Users can be searched for in a given company by passing in valid search criteria. The search criteria usually can be any of the following user elements (field names) and will be sent in as part of the URI as query parameters.


- First Name
- Last Name
- Title
- Job Title
- Country
- Timezone
- Organization Name
- Division
- Business Unit
- Department
- Team Name
- Role
- Additional Team Name
- Additional Role
- Work Email Address 1
- Work Mobile Phone 1
- Work Phone Area Code 1
- Work Phone 1
- Status * (see *note* below)

This searching mechanism can be useful to see if any users exist in the system with a specific email address, phone number, or job role and so on.

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
				Specifies on this field name of the user object.
				<br><br>
				<b>Ex:</b><br>
				http://api.whispir.com/users?apikey=<your_api_key><b>&firstName=Sam</b>
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
				http://api.whispir.com/users?apikey=<your_api_key>&firstName=Sam<b>&sortFields=lastName,jobTitle</b>
			</td>
		</tr>
	</tbody>
</table>

**Note:** While searching for users via status, use the short code 'A' for ACTIVE, similarly, 'I' for INACTIVE, rather than the full words ACTIVE, INACTIVE, etc. so, it is `&status=A` not `&status=ACTIVE`.

## Updating users

> Updating users
> > The following endpoints allow users to update users using the Whispir API.

```
HTTP 1.1 PUT https://api.whispir.com/users/CB4558257DD86D09?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

```xml
Content-Type: application/vnd.whispir.user-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:user xmlns:ns2="http://schemas.api.whispir.com" xmlns:ns3="http://schemas.api.whispir.com/dap">
    <firstName>John</firstName>
    <lastName>Wick</lastName>
    <timeZone>+8</timezone>
    <jobTitle></jobTitle>

    ... remaining of the user object
</ns2:user>
```

```go
Content-Type: application/vnd.whispir.user-v1+json

{
    "firstName": "John",
    "lastName": "Wick",
    "timeZone": "+8",
    "jobTitle": "Whispir API Specialist",

    ... remaining of the user object
}
```

> > The response to the PUT request upon success is a `204 No Content` with no content being provided.

Updating a user can be performed using a PUT request to the `/users/{id}` endpoint. So, to perform this, one must be knowing the exact "link" associated with the user.

The application must provide all the fields during the update request, even if they are not being updated. 

**Any missing fields,except for the `password` field, will be automatically removed from the existing record.** 

The Content-Type can be -
 
 - application/vnd.whispir.user-v1+xml **or** 
 - application/vnd.whispir.user-v1+json


**Note:** You cannot selectively update the user fields needed as this is a PUT request. 

So the standard process for updating a user record is -

1. GET /users/{id of user}
2. Update the user field in the object to the required value
3. PUT /users/{id of user} the new object

The response to the PUT request upon success is usually a `204` with no content being provided.

## Deleting an user

An User can be deleted by calling the DELETE /users/{id} end point.

> Deleting a user
> > The following statement allows users to delete users using the Whispir API.

```
HTTP 1.1 DELETE https://api.whispir.com/users/124F6B2D46A5A268?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

Deleting an user can be performed using a DELETE request to the /users/{id} endpoint. So, to perform this, one must be knowing the exact "link" associated with the user.

After performing this request, the response does not contain any information other than the headers as it is not necessary.

The delete a user if successful shall respond with a `204 No Content`.

### Deleting multiple users

All users in the company can be deleted with a single API call.

> Deleting all users
> > The following statement allows a user to delete all users in their company using the Whispir API.

```
HTTP 1.1 DELETE https://api.whispir.com/users/?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```

Deleting an user can be performed using a DELETE request to the /users/{id} endpoint. So, to perform this, one must be knowing the exact "link" associated with the user.

After performing this request, the response does not contain any information other than the headers as it is not necessary.

The delete a user if successful shall respond with a `204 No Content`.

### Activating an User after the creation

> Activating an newly created user using the "user state machine" rules
> > The following steps have to followed in exact order.

> > Step 1

```
HTTP 1.1 POST https://api.whispir.com/users?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk

{user object}
```

> > capture the Location header value


> > Step 2

```
HTTP 1.1 GET https://api.whispir.com/users/{:id}?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
```
> > This step retreives the newly created user object

> > Step 3

```
HTTP 1.1 PUT https://api.whispir.com/users/{:id}?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk

{userobject}
status : 'INACTIVE'
```

> > Step 4

```
HTTP 1.1 PUT https://api.whispir.com/users/{:id}?apikey=<your_api_key>
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk

{userobject}
status : 'ACTIVE'
```

An user when created is assigned the PENDING status. SO, to set the user to ACTIVE, one has to follow the "user state machine" rules. Here's how we do it - 

1. POST /users for user account creation. Capture the `Location` header value which is the unique link to the User record. This is used in Step 2
2. GET /users/{id} for the user object
3. PUT /users/{id} with STATUS set to 'INACTIVE' - using the user object retreived in step 2
4. PUT /users/{id} with STATUS set to 'ACTIVE' - using the user object retreived in step 2

**Note:** The status text is case sensitive. Lowercase or mixed case text is invalid. Always use uppercase.

**Ex:** active != ACTIVE; inActive != INACTIVE

## Assigning an user to workspace

This is currently not supported via the API right now. One can only do this via the Whispir Platform interface.
