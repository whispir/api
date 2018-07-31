# Getting Started

Getting started with the Whispir.io API is easy:

1. Register with Whispir.io to create your account - ([Free 30 Day Trial](https://whispir.io/register))
2. Create an App inside the Whispir.io App Dashboard - ([App Dashboard](https://whispir.io/dashboard))
3. Check your connectivity to the API
4. Try it out! Send your first message

## Register with Whispir

The Whispir.io API is available for all existing Whispir customers to use.  If you're already a Whispir customer, great! Your existing username and password will work straight away.  You don't even need to contact us.

Simply log in to ([whispir.io](https://whispir.io/login)) and create an app inside the app dashboard.

If you're a new customer and are interested in using the API, sign up for our ([Free 30 Day Trial](https://whispir.io/register)). No Credit Card Required.  

## Create an app

Follow these simple steps to create your first Whispir.io Application.

1. Log in to the ([whispir.io dashboard](https://whispir.io/login)).

2. If you haven't validated your e-mail address, you'll need to do this first by clicking the *validate* link.  This will send you an e-mail.  Simply click the link in the e-mail you receive and your e-mail will be validated.

3. You should now see the *Create App* button at the top of the screen.  Click this button to create your first app.

4. You'll need to give your app a **Name** and a **Description**. These help you identify your app within the App Dashboard.  These won't be exposed to the users of your app.

5. Click *Create*. That's it, you've now created your first Whispir.io App.  
An API key will be generated for this application automatically.  You'll need this API key to start making API calls for this application.

Now that you've got your App API key, you can check your connectivity to the API using the steps below.

## Connect to the API

> Connect to the API

> > Using the information on the left, you can execute the following curl statement:

```shell
curl -H "Authorization: <Your Authorization Header>" -H "x-api-key: <YOUR API KEY>"
     https://api.<region>.whispir.com?apikey=<Your API Key>

# with sample values

curl -H "Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk" -H "x-api-key: 89asdfohasd89023rsd" 
     https://api.<region>.whispir.com?apikey=89asdfohasd89023rsd

# If all is correct, the following response should be expected (The API defaults to an XML response)

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:company xmlns="http://schemas.api.<region>.whispir.com/dap"
             xmlns:ns2="http://schemas.api.<region>.whispir.com">
    <link method="GET"
          rel="retrieveWorkspaces"
          uri="https://api.<region>.whispir.com/workspaces?apikey=89asdfohasd89023rsd"/>
    ...
</ns2:company>
```

The first thing you'll need to do is generate your **Authorization Header** for your API requests. You'll need to use the Authorization Header on every request that you submit to the Whispir.io API.

**Whispir uses Basic HTTP Authentication for all API requests.**

You can generate the Authorization header in most programming languages very easily, however for simplicity you can generate it here by filling in the form below.

**Note:** Your Whispir authentication information is not submitted or stored, it is only used as part of an algorithm to automatically generate your header.

Whispir Username:<br/><input id="username" name="username" style="width: 60%; margin-bottom: 3px;" type="text"> <br/>
Whispir Password:<br/><input id="password" name="password" style="width: 60%" type="password">

<button onclick="doEncode()" name="encode" id="encode">Generate your Authorization Header</button>

Authorization Header:<br/><input id="result" name="result" style="width: 60%" type="text"> <br/>

Once you have generated this header, you can use it in a request to the API. This will ensure everything is working correctly. To do this you can use a programming lanugage, a curl script, or a generic REST client.

> NOTE: When you change your password, you'll need a new authorization header.

### Connect using a programming language

Whispir.io provides some basic code samples in a range of languages to assist users in geting started with the API.  Once you have created your App in the Whispir.io Dashboard, simply click on the *Code* tab on the left side of the screen.

Select the App, and the action that you would like to perform (e.g. Send an SMS message).

This will automatically generate the code for you.  You can copy this code into your IDE, import any required dependencies, and run it.

You will need to replace the following elements of the request:

1. App API Key
2. Authorization Header
3. Recipient information
4. Message Subject
5. Message Content

Once you have verified you have replaced all of these, run the request in your IDE and you will receive your first message using the Whispir.io API.

### Using cURL

cURL is a computer software project providing a library and command-line tool for transferring data using various protocols. One key use of cURL is to make HTTP requests.

In order to test your ability to use the Whispir.io API, cURL is a very quick mechanism to enter on to a command line interface and make sure everything is set up correctly.

Generate your Authorization Header using the form above, and using the code snippets in the code panel, you can execute your first request to the Whispir.io API.

### Using a generic REST Client

If you're unsure about using curl, you can install a REST Client in your browser and test the calls through there.  Whispir recommends the following clients:

1. [Postman - Chrome/IE](https://www.getpostman.com/)
2. [RESTClient - Firefox](https://restclient.net)

To test your connectivity, you will need to enter the following parameters:

1. The URL that you would like to request
2. Your App API Key
3. Your Authorization Header
4. (Optional) The Content-Type/Accept Headers

The HTTP call will look like the following:

`GET https://api.<region>.whispir.com?apikey=89asdfohasd89023rsd`

With the following headers (as a minimum).

`Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk` and `x-api-key: 89asdfohasd89023rsd`

Once you have executed this request, you should receive a **200 OK** response from the REST Client. This means that you have connectivity to the Whispir.io API and can start building your App.

If you received another response, please continue to the next section to understand how to resolve your issues.

### Resolving connectivity issues

If you get a different response than **HTTP 200 OK**, perform the following:

**HTTP 403 Forbidden, or HTTP 401 Unauthorized**

* Your Authorization header may not be quite right, verify your username and password browsing to [Whispir.io](https://whispir.io) and clicking 'Log In'
* If you can successfully log in, then try and re-generate the Base64 encoded username and password using the form above.
* If you cannot log in, then it's possible your account isn't active. Contact your Whispir Administrator, or send a message to our support team at [support@whispir.io](mailto:support@whispir.io).

**Other HTTP errors or no connectivity at all**

* If you're still having issues, please contact us at [support@whispir.io](mailto:support@whispir.io).

## Sending Messages

> Sending Messages

> > Send your first message using curl.

```shell
curl -H "Authorization: Basic <YOUR AUTH HEADER>"
     -H "x-api-key: <YOUR API KEY>"
     -H "Content-Type: application/vnd.whispir.message-v1+json"
     -H "Accept: application/vnd.whispir.message-v1+json"
     -d '{
            "to": "<DESTINATION PHONE NUMBER(S)>",
            "subject": "This is the first line of my SMS",
            "body": "This is the content of my SMS"
         }'
     https://api.<region>.whispir.com/messages?apikey=<YOUR API KEY>
```

> > Once you submit this, Whispir will send you back an **HTTP 202 Accepted** stating that your request has been accepted for processing.  

> > Within a few seconds your phone should be buzzing away.


### Sending Messages

By now you should be able to connect to the API and can issue requests and receive responses. Based on this, you can now send your first SMS message using the API.

This is very similar to the previous request you executed to test your connectivity, but instead of using an **HTTP GET** to retrieve information, this time you're going to use an **HTTP POST** to ask Whispir to do something.

As you're sending a message, you need to tell Whispir *who* to send it to, and *what* the type of content it is.

You're going to use the URL `https://api.<region>.whispir.com/messages` as the API endpoint.

### Content Type

> Samples in XML / JSON

> > The following example shows how to use a POST request to send the message in XML or JSON.  Use the selector at the top to choose your syntax.

```
POST https://api.<region>.whispir.com/messages?apikey=89asdfohasd89023rsd
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
x-api-key: 89asdfohasd89023rsd
```

```go
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json

{
    "to": "<DESTINATION PHONE NUMBER>",
    "subject": "This is the first line of my SMS",
    "body": "This is the content of my SMS"
}
```

```xml
Content-Type: application/vnd.whispir.message-v1+xml
Accept: application/vnd.whispir.message-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.<region>.whispir.com">
    <to>[DESTINATION PHONE NUMBER]</to>
    <subject>This is the first line of my SMS</subject>    
    <body>This is the content of my SMS</body>
</ns2:message>

```

The next thing you need to do is tell Whispir what information you're sending.  You can just blindly send some XML or JSON content, but life is much easier if Whispir knows exatly what it is you are sending.

You're going to tell Whispir what you are sending by using the **Content-Type** HTTP header.  Your Content-Type header is going to be (either JSON or XML):

* application/vnd.whispir.message-v1+json
* application/vnd.whispir.message-v1+xml

This tells Whispir that you are sending content that conforms to Version 1 of the message schema. As Whispir adds more features to each schema, our version numbers will increase, this is described in much more detail later on in the documentation.


### Sending messages using JSON and XML

Once you have successfully sent your SMS message using curl, you can move on to using your application to generate XML or JSON formats for processing.

Be sure to include the correct headers for the desired content type:

* XML - `application/vnd.whispir.message-v1+xml`
* JSON - `application/vnd.whispir.message-v1+json`

For more information on Messages and all the other Whispir resources please continue through the documentation, or browse straight to Messages resource documentation for more information.
