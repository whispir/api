#Conventions

##API Security

>Basic HTTP Authentication over HTTPS

```
HTTPS GET /workspaces/123/contacts?firstname=John&lastname=Smith?apikey=789264
Authorization: Basic frJIUN8DYpKDtOLCwo//yllqDzg=
```

The Whispir.io API supports multiple methods of authentication to cater for varying client needs.  Authentication is necessary for users of the API to ensure that only valid and legal requests are processed by the Whispir messaging engine.

### Basic Authentication over HTTPS (default)

The basic authentication process is offered for use with clients that already have an ‘up and running’ application, and would like to integrate Whispir as a messaging provider in a quick and simple fashion.

Basic access authentication over HTTPS involves the application client sending an encoded Username and Password with when requesting resources from the server.

Clients will also be required to provide the API Key that is provided when the application is registered within Mashery.  This API Key is used to determine the application that is making the request, and whether it is allowed to make requests, it is still within the request thresholds, and is a valid API Key. 

Once this has been confirmed, the request is forwarded on to Whispir for Basic authentication processing.

* If this Username and password is correct, the server will process the request and send back an appropriate response.
* If the Username and password is not correct, the server will send back an HTTP 401 (Authorization required).

![Basic Authentication](http://developer.whispir.com/files/Computer-diagram.png)

Once Whispir has validated the username and password, the requested resource is returned through Mashery to the application client.

### Basic Authentication – Example

A valid request that will be accepted and authenticated by the Whispir messaging engine using Basic authentication is as follows:

The ‘Authorization’ header is comprised of the word **Basic** followed by the base64 representation of the username and password of the user.

More information about HTTP Basic Authentication can be found on [Wikipedia](http://en.wikipedia.org/wiki/Basic_access_authentication "Basic access authentication").

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

**Note:** More information about REST can be found on [Wikipedia](http://en.wikipedia.org/wiki/Representational_state_transfer).

##Retrieving objects

> Retrieve all workspaces within your Company

```xml
HTTP GET https://api.whispir.com/workspaces?apikey=bneov3023nfo023rssdf3
```
```go
HTTP GET https://api.whispir.com/workspaces?apikey=bneov3023nfo023rssdf3
```

> Retrieve all Messages from within the Company

```xml
HTTP GET http://api.whispir.com/messages?apikey=bneov3023nfo023rssdf3
```
```go
HTTP GET http://api.whispir.com/messages?apikey=bneov3023nfo023rssdf3
```

Application clients can retrieve lists of resources of a single type through a simple URL. 

For example, to retrieve a list of **Workspaces** from within the **Company**, the URL is as follows:

`GET https://api.whispir.com/workspaces?apikey=bneov3023nfo023rssdf3`


### Retrieving a single object

> Retrieve the Workspace with the ID of 12345

```xml
GET https://api.whispir.com/workspaces/12345?apikey=bneov3023nfo023rssdf3
```
```go
GET https://api.whispir.com/workspaces/12345?apikey=bneov3023nfo023rssdf3
```

Application clients also have access to a single resource by specifying the relevant ID of the resource.  This information would have been returned when retrieving the list of resources as specified above.

To retrieve a single **Workspace** when you know the ID, the URL is as follows:

`GET https://api.whispir.com/workspaces/12345?apikey=bneov3023nfo023rssdf3`

Or to retrieve a single **Contact** when you know the ID, the URL is as follows:

`GET http://api.whispir.com/contacts/78910?apikey=bneov3023nfo023rssdf3`

> Retrieve the Contact with the ID of 78910

```xml
GET https://api.whispir.com/contacts/78910?apikey=bneov3023nfo023rssdf3
```
```go
GET https://api.whispir.com/contacts/78910?apikey=bneov3023nfo023rssdf3
```

### Nested objects

>Retrieve the Contact with the ID 67890 from within the Workspace with ID 12345

```xml
GET https://api.whispir.com/workspaces/12345/contacts/67890?apikey=bneov3023nfo023rssdf3
```
```go
GET https://api.whispir.com/workspaces/12345/contacts/67890?apikey=bneov3023nfo023rssdf3
```

Within Whispir's resource model, some resources are nested within one another.  For example; 

- The **Company** resource contains many **Workspaces**.  
- The **Workspace** resource contains many **Messages**.   
- Each **Message** resource contains a **MessageStatus**.

Requests can be *nested* in order to provide application clients the ability to access specific resources when they are nested.

For example, if you wanted to retrieve a **Contact** from within a **Workspace**, the URL would look as follows:

`GET https://api.whispir.com/workspaces/12345/contacts/67890?apikey=bneov3023nfo023rssdf3`

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
                The requested resource has been successfully created and can be found via the URL in the ‘Location’ header
            </td>
        </tr>
        <tr>
            <td style="text-align: right; font-weight: bold;">202 Accepted:</td>
            <td><strong>Successfully accepted the request for processing</strong><br/>
                The request has been accepted for processing by the asynchronous processor.
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
                Inspect the authorisation header and ensure that a valid authentication has been provided.
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

##Pagination

>Request for the first page of messages:

```xml
GET https://api.whispir.com/?apikey=sbdsfd0sa09fds&limit=20&offset=0
```
```go
GET https://api.whispir.com/?apikey=sbdsfd0sa09fds&limit=20&offset=0
```

>Request for the second page of messages (note the offset is now 20):

```xml
GET https://api.whispir.com/?apikey=sbdsfd0sa09fds&limit=20&offset=20
```
```go
GET https://api.whispir.com/?apikey=sbdsfd0sa09fds&limit=20&offset=20
```

Requests that contain multiple items will be paginated by default.

Each page will provide a maximum of **20** items per page.

Two parameters can be used to control the number of items retrieved:

- `limit`: the number of rows to be returned (max: 20, default: 20)
- `offset`: the record number to start returning from (default: 0)

Most resources will provide these links at the end of the response object in a `link` array that supplies links with `rel=next` and `rel=prev` attributes.

This makes programatic pagination easy as you can simply detect for the presence of these attributes.

**Note:** The following resources aren't paginated for ease of use:

- Workspaces