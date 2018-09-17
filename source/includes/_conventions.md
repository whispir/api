# Conventions

## API Security

> API Security

> > Whispir utilises Basic HTTP Authentication over HTTPS to secure the API Requests.

```shell
HTTP/1.1 GET https://api.<region>.whispir.com/?apikey=ab37bdvs32898dssddsddsfklio
Authorization: Basic frJIUN8DYpKDtOLCwo//yllqDzg=
x-api-key: your_api_key

# Successful Response
HTTP/1.1 200 OK

# Unsuccessful Response (incorrect apikey)
HTTP/1.1 403 Forbidden
<h1>Developer Inactive</h1>

# Unsuccessful Response (incorrect username / password)
HTTP/1.1 401 Unauthorized

# Unsuccessful Response (no permission to access that resource endpoint)
HTTP/1.1 403 Forbidden
```

The Whispir.io API supports multiple methods of authentication to cater for varying client needs. Authentication is necessary for users of the API to ensure that only valid and legal requests are processed by the Whispir messaging engine.

### Basic Authentication over HTTPS

The basic authentication process is offered for use with clients that already have an ‘up and running’ application, and would like to integrate Whispir as a messaging provider in a quick and simple fashion.

Basic access authentication over HTTPS involves the application client sending an encoded Username and Password when requesting resources from the server.

Clients will also be required to provide the API Key that is provided when the application is registered within Mashery. This API Key is used to determine the application that is making the request, and whether it is allowed to make requests, it is still within the request thresholds, and is a valid API Key. 

Once this has been confirmed, the request is forwarded on to Whispir for Basic authentication processing.

* If this Username and password is correct, the server will process the request and send back an appropriate response.
* If the Username and password is not correct, the server will send back an HTTP 401 (Authorization required).

![Basic Authentication](https://developer.whispir.com/files/Computer-diagram.png)

Once Whispir has validated the username and password, the requested resource is returned through Mashery to the application client.

### Basic Authentication – Example

A valid request that will be accepted and authenticated by the Whispir messaging engine using Basic authentication is as follows:

The ‘Authorization’ header is comprised of the word **Basic** followed by the base64 representation of the username and password of the user.

More information about HTTP Basic Authentication can be found on [Wikipedia](https://en.wikipedia.org/wiki/Basic_access_authentication "Basic access authentication").

##RESTful Architecture

The Whispir.io API provides interfaces for application clients to utilise Whispir functionality that are platform agnostic, without any dependency on the environment or programming language being used.

Whispir's API supports multiple methods of inbound request over HTTPS, primarily:

*   XML
*   JSON

Clients can issue requests using either of the methods, and receive a response in the same format. This allows easy integration with existing and new applications using technologies that are widely supported in a range of languages.

### RESTful Architecture

The Whispir.io API employs a ‘REST’ (**Re**presentational **S**tate **T**ransfer) architecture.  This architecture is the foundation of the World Wide Web and is widely used in application, service and API development.

An application is considered ‘RESTful’ if it conforms to a ‘REST’ architecture.  A ‘REST’ architecture consists of **clients** and **servers**.  The clients initiate requests to the servers, and the servers process the requests and return the appropriate responses.  Requests and responses are structured using defined and addressable **resources**. 

Each **resource** within the Whispir API is available through a secure and authenticated URL. 

**Note:** More information about REST can be found on [Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer).

##Retrieving objects

> Retrieving objects

> > Retrieve all workspaces within your Company

```xml
HTTP/1.1 GET https://api.<region>.whispir.com/workspaces?apikey=bneov3023nfo023rssdf3
```
```go
HTTP/1.1 GET https://api.<region>.whispir.com/workspaces?apikey=bneov3023nfo023rssdf3
```

> > Retrieve all Messages from within the Company

```xml
HTTP/1.1 GET https://api.<region>.whispir.com/messages?apikey=bneov3023nfo023rssdf3
```
```go
HTTP/1.1 GET https://api.<region>.whispir.com/messages?apikey=bneov3023nfo023rssdf3
```

Application clients can retrieve lists of resources of a single type through a simple URL. 

For example, to retrieve a list of **Workspaces** from within the **Company**, the URL is as follows:

`GET https://api.<region>.whispir.com/workspaces?apikey=bneov3023nfo023rssdf3`


### Retrieving a single object

> Retrieving a single object

> > Retrieve the Workspace with the ID of 12345

```xml
HTTP/1.1 GET https://api.<region>.whispir.com/workspaces/12345?apikey=bneov3023nfo023rssdf3
```
```go
HTTP/1.1 GET https://api.<region>.whispir.com/workspaces/12345?apikey=bneov3023nfo023rssdf3
```

Application clients also have access to a single resource by specifying the relevant ID of the resource.  This information would have been returned when retrieving the list of resources as specified above.

To retrieve a single **Workspace** when you know the ID, the URL is as follows:

`GET https://api.<region>.whispir.com/workspaces/12345?apikey=bneov3023nfo023rssdf3`

Or to retrieve a single **Contact** when you know the ID, the URL is as follows:

`GET https://api.<region>.whispir.com/contacts/78910?apikey=bneov3023nfo023rssdf3`

> > Retrieve the Contact with the ID of 78910

```xml
HTTP/1.1 GET https://api.<region>.whispir.com/contacts/78910?apikey=bneov3023nfo023rssdf3
```
```go
HTTP/1.1 GET https://api.<region>.whispir.com/contacts/78910?apikey=bneov3023nfo023rssdf3
```

### Nested objects

> Nested objects

> > Retrieve the Contact with the ID 67890 from within the Workspace with ID 12345

```xml
HTTP/1.1 GET https://api.<region>.whispir.com/workspaces/12345/contacts/67890?apikey=bneov3023nfo023rssdf3
```
```go
HTTP/1.1 GET https://api.<region>.whispir.com/workspaces/12345/contacts/67890?apikey=bneov3023nfo023rssdf3
```

Within Whispir's resource model, some resources are nested within one another.  For example; 

- The **Company** resource contains many **Workspaces**.  
- The **Workspace** resource contains many **Messages**.
- Each **Message** resource contains a **MessageStatus**.

Requests can be *nested* in order to provide application clients the ability to access specific resources when they are nested.

For example, if you wanted to retrieve a **Contact** from within a **Workspace**, the URL would look as follows:

`GET https://api.<region>.whispir.com/workspaces/12345/contacts/67890?apikey=bneov3023nfo023rssdf3`

## HTTP Response Codes

Application clients that are using Whispir's API will receive HTTP response codes in response to every request that is issued. 

The table below describes the response codes that will be issued and gives potential reasons as to why they may have been sent back.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Successful Response Codes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">200 OK:</td>
            <td><strong>Successful request</strong><br/>
                No further action required.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">201 Created:</td>
            <td><strong>Successfully created the resource.</strong><br/>
                The requested resource has been successfully created and can be found via the URL in the 'Location' header
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">202 Accepted:</td>
            <td><strong>Successfully accepted the request for processing</strong><br/>
                The request has been accepted for processing by the asynchronous processor. The request's unique identifier can be found via the URL in the 'Location' header
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">204 No Content:</td>
            <td><strong>Successfully processed the request, but no content was sent back</strong><br/>
                The update (PUT) or delete (DELETE) request has been successfully processed, and no content was returned from the server.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">301 Moved Permanently:</td>
            <td><strong>Successful request, but the resource is no longer available at this location.</strong><br/>
                This resource URL should no longer be used. Check the location header of the response and redirect the request there.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">302 Found:</td>
            <td><strong>Successful request, but the resource is temporarily not available at this location.</strong><br/>
                This resource URL should still be used in future, but for this specific request, check the location header of the response and redirect the request there.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">304 Not modified:</td>
            <td><strong>Content hasn’t changed since last request</strong><br/>
                No action required
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">Unsuccessful Response Codes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">400 Bad Request:</td>
            <td><strong>Invalid or missing request parameters</strong><br/>
                Inspect the request parameters and ensure that all required parameters are supplied.<br/><br/>

                Note the error text in the response and update the request accordingly
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">401 Unauthorized:</td>
            <td><strong>Invalid or no credentials passed in the request</strong><br/>
                Inspect the authorisation header and ensure that a valid authentication has been provided.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">403 Forbidden:</td>
            <td><strong>Authorization credentials passed and accepted but account does not have permission</strong><br/>
                <ul>
                <li>Inspect the authorisation header and ensure that a valid authentication has been provided.</li>
                <li>returned when HTTP is used instead of HTTPS</li>
		<li>returned when invalid API Key is used</li>
                <li>returned when you have tried to make API calls more than your allowed Quota (QPS). refer to <a href="https://whispir.github.io/api/#api-rate-limits" title="api rate limiting">API Rate Limits</a></li>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">404 Not Found:</td>
            <td><strong>The requested URL does not exist</strong><br/>
                The requested resource was not found, inspect the ID in the URL that was used and ensure that it is valid.<br/><br/>Also, inspect the Accept and Content-Type headers that are being used to make sure they are correct for the URL that is being requested.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">405 Method not allowed:</td>
            <td><strong>The requested resource does not support the supplied verb</strong><br/>
                Inspect the HTTP method that was used in the request and ensure that it is valid for the resource being requested
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">415 Unsupported Media Type:</td>
            <td><strong>The request was unsuccessful because the requested content type is not supported by the API.</strong><br/>
                The application client can use this response to determine if it is asking for a supported version of a resource.  Upon receiving this response, the client can query the developer documentation to determine the appropriate version for the requested resource.<br/><br/>

                In most cases, this is due to the user not supplying the correct Accept or Content-Type header for the requested URL.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">429 Too many requests:</td>
            <td><strong>Above API Quota Limits</strong><br/>
                <ul>
                <li>returned when you have tried to make API calls more than your allowed Quota (QPS). refer to <a href="https://whispir.github.io/api/#api-rate-limits" title="api rate limiting">API Rate Limits</a></li>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">422 Unprocessable Entity:</td>
            <td><strong>The request is formed correctly, but due to some condition the request cannot be processed e.g. email is required and it is not provided in the request</strong><br/>
                The request did not contain all of the information required to perform this method.  Please check your request for the required fields to be passed in and try again.  The offending fields will be specified in the error text of the response.
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">500 Internal Server Error:</td>
            <td><strong>An internal error occurred when processing the request.</strong><br/>
                Attempt the request again and if the HTTP 500 error re-occurs contact <a href="mailto:support@whispir.com">support@whispir.com</a>
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">501 Method Not Implemented:</td>
            <td><strong>The HTTP method being used has not yet been implemented for the requested resource.</strong><br/>
                The method being used is not implemented for this resource. Please check the documentation for the specific resource type. 
            </td>
        </tr>
    </tbody>
</table>

##Content Types and Versioning

The Whispir.io API has been designed and built to support the wide feature set provided in the current version of the Whispir Platform. 

In order to manage and incorporate change in future versions of the API, Whispir's API has implemented a versioning structure that allows application clients to choose which version of the API they would like to retrieve their responses from.

This allows new versions to be built and old versions to be supported concurrently, with no impact to clients when changes are made.

Whispir's API achieves this versioning capability by using **Vendor Specific MIME Types (VSMT)**.

### Without VSMT

>Without VSMT
> >A Sample API request that is not using VSMT

```
HTTP/1.1 GET /workspaces/123/contacts?firstName=Neil&apikey=789264 
Accept: application/xml

HTTP/1.1 200 OK
Content-Type: application/xml
<contact>
   <name>Neil Armstrong</name>
</contact>
```

This implementation of an API in this manner works correctly, but conceptually it is incorrect.  The issue with this design is the request is only asking for an XML representation of some resource called a Contact, it is not specifically asking for the XML version of a **Contact Resource** as defined by Whispir's API.

Any XML representation of a resource could be passed back e.g. a **Cat** or a **House**, and the client would need to inspect the response to determine whether it is a **Contact** or not through its own means.

### With VSMT

>With VSMT
> > A Sample API request that is uses VSMT

```
HTTP/1.1 GET /workspaces/123/contacts?firstName=Neil&apikey=789264 
Accept: application/vnd.whispir.contact+xml

HTTP/1.1 200 OK
Content-Type: application/xml
<contact>
   <name>Neil Armstrong</name>
</contact>
```

By using VSMT, Whispir can define and make available the various content types for resources prior to the requests being made. This allows the application clients to specify the resource that they would like to receive from the API, and Whispir will only return content of that specific type.

For example:

By using this method, the client is specifically asking for a resource representation of a **Contact** that is defined by Whispir's API.  There is no confusion about the representation that will be returned, and the client need not worry about validation as Whispir will only ever return a valid **Contact** as a response to this request.

VSMT also allows the client the ability to choose the language in which their resource representation should be returned.  Using the previous example, the application client was asking for the **Contact** to be returned in **XML**.

`Accept: application/vnd.whispir.contact+xml`

This **Contact** resource could just as easily be returned as a **JSON** object by changing the content type as follows:

`Accept: application/vnd.whispir.contact+json`

### With VSMT (including versioning)

> With VSMT (including versioning)
> > Sample request with VSMT and Versioning (V1)

```
HTTP/1.1 GET /workspaces/123/contacts?firstName=Neil&apikey=789264 
Accept: application/vnd.whispir.contact-v1+xml

HTTP/1.1 200 OK
Content-Type: application/vnd.whispir.contact-v1+xml
<contact>
   <name>Neil Armstrong</name>
</contact>
```

> > Sample request with VSMT and Versioning (V2)


```
HTTP/1.1 GET /workspaces/123/contacts?firstName=Neil&apikey=789264 
Accept: application/vnd.whispir.contact-v2+xml

HTTP/1.1 200 OK
Content-Type: application/vnd.whispir.contact-v2+xml
<contact>
   <name>Neil Armstrong</name>
   <mobile>$mobile</mobile>
   <email>neil.armstrong@space.com</email>
</contact>
```

This method of using VSMT also allows the resource representations to be updated, re-written and maintained without any notification required to application clients.

This can be achieved by adding a **version** element to the defined content types.

By versioning the application MIME types, application clients can request the resource representation that their application is built on, e.g. ‘contact-v1’, or ‘workspace-v2’.

Whispir can create new representations of these documents, and the application clients will not be affected by these changes.

The **v2** version of this resource representation can co-exist with the **v1** version, and application clients do not need to worry about their existence.

### Deprecation of Versions

As the version numbers grow and new features are introduced into the resource representations, it is inevitable that the older versions will become deprecated and no longer supported over an extended period of time.

This process of deprecation will be facilitated using HTTP Status Codes 301 and 415.

### List of Whispir's VSMT's

The following table depicts the available mime types that will be accepted through Whispir's API:

**Note:** The Mime Type is always *Singular*. `message-v1`, not `messages-v1`.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">List of Whispir.io VSMT's</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: right; font-weight: bold;">Workspace:</td>
            <td>XML - application/vnd.whispir.workspace-v1+xml<br/>
            	JSON - application/vnd.whispir.workspace-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Message:</td>
            <td>XML - application/vnd.whispir.message-v1+xml<br/>
            	JSON - application/vnd.whispir.message-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Message Status:</td>
            <td>XML - application/vnd.whispir.messagestatus-v1+xml<br/>
            	JSON - application/vnd.whispir.messagestatus-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Message Responses:</td>
            <td>XML - application/vnd.whispir.messageresponse-v1+xml<br/>
            	JSON - application/vnd.whispir.messageresponse-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Message Response Rule:</td>
            <td>XML - application/vnd.whispir.responserule-v1+xml<br/>
            	JSON - application/vnd.whispir.responserule-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Message Template:</td>
            <td>XML - application/vnd.whispir.template-v1+xml<br/>
            	JSON - application/vnd.whispir.template-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Contact:</td>
            <td>XML - application/vnd.whispir.contact-v1+xml<br/>
            	JSON - application/vnd.whispir.contact-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Distribution List:</td>
            <td>XML - application/vnd.whispir.distributionlist-v1+xml<br/>
            	JSON - application/vnd.whispir.distributionlist-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Message Scenario:</td>
            <td>XML - application/vnd.whispir.scenario-v1+xml<br/>
            	JSON - application/vnd.whispir.scenario-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Event:</td>
            <td>XML - application/vnd.whispir.event-v1+xml<br/>
            	JSON - application/vnd.whispir.event-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Asset:</td>
            <td>XML - application/vnd.whispir.asset-v1+xml<br/>
            	JSON - application/vnd.whispir.asset-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Custom List:</td>
            <td>XML - application/vnd.whispir.customlist-v1+xml<br/>
            	JSON - application/vnd.whispir.customlist-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">Activity Log:</td>
            <td>XML - application/vnd.whispir.activity-v1+xml<br/>
            	JSON - application/vnd.whispir.activity-v1+json
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">User:</td>
            <td>XML - application/vnd.whispir.user-v1+xml<br/>
            	JSON - application/vnd.whispir.user-v1+json
            </td>
        </tr>
    </tbody>
</table>

##Pagination

> Pagination

> > Request for the first page of messages:

```
HTTP/1.1 GET https://api.<region>.whispir.com/?apikey=[your-api-key]&limit=20&offset=0
```

> > Request for the second page of messages (note the offset is now 20):

```
HTTP/1.1 GET https://api.<region>.whispir.com/?apikey=[your-api-key]&limit=20&offset=20
```


> > Request for the page of messages which does not exist.

```
HTTP/1.1 GET https://api.<region>.whispir.com/workspaces/7311ABEB701E7C60/messages?apikey=[your-api-key]&limit=20&offset=20
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="true"?>
<ns2:return xmlns:ns3="http://schemas.api.whispir.com" xmlns:ns2="http://schemas.api.whispir.com/dap">
    <status>No records found</status>
</ns2:return>
```

```go
{
    "status" : "No records found"
}
```

Requests that contain multiple items will be paginated by default.

Each page will provide a maximum of **20** items per page.

Two parameters can be used to control the number of items retrieved:

- `limit`: the number of rows to be returned (max: 20, default: 20)
- `offset`: the record number to start returning from (default: 0)

Most resources will provide these links at the end of the response object in a `link` array that supplies links with `rel=next` and `rel=prev` attributes.

This makes programatic pagination easy as you can simply detect for the presence of these attributes. You can loop through the pages until you receive a response of 'No messages found'.

**Note:** The following resources aren't paginated for ease of use:

- Workspaces
- Scenarios
- Messages


### Extra parameters

It's also possible that the messages are older than the default filter that is applied.  At present Whispir provides a default of the last 7 days of messages.  You can ask for older messages by using the following 4 parameters:

> > Requesting for records from 01/01/2015 00:00 – 01/07/2015 23:59

```
https://api.<region>.whispir.com/messages?apikey=[your-api-key]&criteriaFromDate=01/01/2015&criteriaFromTime=00:00&criteriaToDate=01/07/2015&criteriaToTime=23:59
```

 * criteriaFromDate (format: dd/mm/yyyy)
 * criteriaFromTime (format: hh:mm)
 * criteriaToDate (format: dd/mm/yyyy)
 * criteriaToTime  (format: hh:mm)

All four of these parameters are required for a date search to work e.g.



You can also use the parameter `viewType=shared` if the messages you are looking for were sent from other users (not the API user).


### Case Sensitivity of Headers

As per <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html">RFC-2616</a>, the headers in both the request and response are case in-sensitive. Please ensure your integration takes this into note when interacting with Whispir API.