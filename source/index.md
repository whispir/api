---
title: Whispir API Reference

language_tabs:
  - json
  - xml

toc_footers:
  - <a href='http://developer.whispir.com'>Sign Up for a Developer Key</a>
  - <a href='http://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true
---

# Whispir API

> Whispir's API requires only 3 parameters within JSON or XML to send an SMS message


```json
{
   "to" : "61400000000",
   "subject" : "Test SMS Message",
   "body" : "This is the body of my test SMS message"
}
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to>61400000000</to>
    <subject>Test SMS Message</subject>    
    <body>This is the body of my test SMS message</body>
</ns2:message> 
```

> Using curl, this can be sent using the following command

```shell
# Authorization and apikey are provided in the registration processes

curl -H "Authorization: Basic <YOUR AUTHORIZATION HEADER>" 
     -H "Content-Type: application/vnd.whispir.message-v1+json" 
     -H "Accept: application/vnd.whispir.message-v1+json" 
     -d "$data" 
     https://api.whispir.com/messages?apikey=<YOUR API KEY>

```

The Whispir API has been designed to provide application developers the ability to embed the powerful multichannel messaging capabilities the Whispir Platform provides, directly into any application with access to the web.

**Multichannel Messaging API**

Whispir's API gives developers the ability to:

* Create, send and retrieve multi-channel messages over 8 different channels
* Invoke scenario based communications for quick, effective and targeted communications
* Publish messages to internal or external web pages, RSS feeds and social networks
* Asynchronously receive all responses to a given message and perform analysis on the data

**Contact & Recipient Management API**

The Whispir API provides developers with the ability to manage the recipients of their messages:

* Store contact information in a cloud based highly available and accessible environment
* Use standards based methods to create, update, and delete contact information
* Build forms to allow contacts to self-register and manage their account, with auto-generated email notifications
* Create, update and delete distribution lists that can be accessed for messaging at a later date

# Accessing the API

To get started using the Whispir API, you'll need a few things:

1. Register with Whispir to receive a Whispir Username and Password - ([Free Trial](https://app.whispir.it/pub/whispirSelfRegistration.pub))
2. Get an API Key - ([Developer Account Here](https://developer.whispir.com/member/register))
3. Check your connectivity to the API
4. Try it out! Send an SMS Message

## Step 1 - Register with Whispir

Whispir's API is available for all existing Whispir customers to use.  If you're already a Whispir customer, great! Your existing username and password will work straight away.  You don't even need to contact us.

If you're a new customer and are interested in finding out more about using the API, please send an email with your details to [sales@whispir.com](mailto:sales@whispir.com), and one of our sales reps will get back to with all the information you need.

Once you've got your Whispir Username and Password handy, you're ready to move to Step 2.

## Step 2 - Get an API Key

If you haven't done so already, click [Register](http://developer.whispir.com/member/register), fill in the form you'll receive an email with your API key. 

Please note that your API key will need to be activated by one of our support team members, it should be done within a few hours so please be patient.  If you've already registered but haven't heard back after 24 hours, please contact us at [apisupport@whispir.com](mailto:apisupport@whispir.com).

Once you've got your API key, you're ready to move to Step 3.

## Step 3 - Check your connectivity to the API

> Using the information on the left, you can execute the following curl statment: 

```shell
curl -H "Authorization: <Your Authorization Header>" https://api.whispir.com?apikey=<Your API Key>

# e.g. with sample values

curl -H "Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk" https://api.whispir.com?apikey=89asdfohasd89023rsd 
```

> If all is correct, the following response should be expected (Whispir's API defaults to an XML response)

```shell
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:company xmlns="http://schemas.api.whispir.com/dap" 
             xmlns:ns2="http://schemas.api.whispir.com">
    <link method="GET" 
          rel="retrieveWorkspaces" 
          uri="https://api.whispir.com/workspaces?apikey=89asdfohasd89023rsd"/>
    ...
</ns2:company>
```

> This may look a bit scary at first, but it will all make sense shortly. All you need to know now is you've got access to the API!

The first thing you'll need to do is generate the **Authorization Header** for your API requests. You'll need to use this on every request that you submit to the Whispir API.

Whispir is currently using BASIC HTTP Authentication for all requests.

You can generate this header in most programming lanugages very easily, however for ease of use you can generate it here by filling in the form below. 

**Note:** Your Whispir authentication information is not submitted or stored anywhere, it is only used as part of the algorithm to automatically generate the header. 

**Whispir Username:**&nbsp;<input id="username" name="username" style="width: 60%; margin-bottom: 3px;" type="text"> <br/>
**Whispir Password:**&nbsp;<input id="password" name="password" style="width: 60%" type="password">

<button onclick="doEncode()" name="encode">Generate your Authorization Header</button>

**Authorization Header:**&nbsp;<input id="result" name="result" style="width: 60%" type="text"> <br/>

Once you have generated this header, you can use it in a request to the API.  This will ensure everything is working correctly.  To do this you can use a curl script, or another generic REST client.

### Using a generic REST Client

If you're unsure about using curl, you can install a REST Client plugin in your browser and test the calls through there.  Whispir recommends using the [RESTClient plugin for Firefox](https://addons.mozilla.org/en-US/firefox/addon/restclient/).

To test your connectivity, you need to enter your Whispir username and password and provide the API URL that you would like to call.

The HTTP call will look more like the following:

`GET https://api.whispir.com?apikey=89asdfohasd89023rsdfhio8923`

With the following header (as a minimum).

`Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk`


### Resolving connectivity issues

If you get a different response than **HTTP 200 OK**, perform the following:

**HTTP 403 Forbidden, or HTTP 401 Unauthorized**

* Your Authorization header may not be quite right, verify your username and password browsing to [Whispir](http://www.whispir.com) and clicking 'Sign In',
* Try and re-generate the Base64 encoded username and password using the form above

**Other HTTP errors or no connectivity at all**

* If you're still having issues, contact us at [apisupport@whispir.com](mailto:apisupport@whispir.com)

## Step 4: Send an SMS Message

> Send your first message using curl

```shell
curl -H "Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk" 
     -H "Content-Type: application/vnd.whispir.message-v1+json" 
     -H "Accept: application/vnd.whispir.message-v1+json" 
     -d '{ "to": "<DESTINATION PHONE NUMBER>",
     "subject": "This is the first line of my SMS",
     "body": "This is the content of my SMS"
   }' 
   https://api.whispir.com/messages?apikey=89asdfohasd89023rsdfhio8923
```

> Once you submit this, Whispir will send you back an HTTP 202 Accepted stating that your request has been accepted for processing.  Within a few seconds your phone should be buzzing away.


### Messages Endpoint

By now you should be able to connect to the API and can issue requests and receive responses. Based on this, you can now send your first SMS message using the API.

This is very similar to the previous request, but instead of using a **HTTP GET** to retrieve information, this time you're going to use a **HTTP POST** to push information to Whispir. 

As you're sending a message, you need to tell Whispir who to send it to, and what the type of content it is.

You're going to use the URL `https://api.whispir.com/messages` as the API endpoint. 

### Content Type

The next thing you need to do is tell Whispir what information you're sending.  You can just blindly send some XML or JSON content, but life is much easier if Whispir knows exatly what it is you are sending.

You're going to tell Whispir what you are sending by using the **Content-Type** HTTP header.  Your Content-Type header is going to be (either JSON or XML):

* application/vnd.whispir.message-v1+json
* application/vnd.whispir.message-v1+xml

This tells Whispir that you are sending content that conforms to Version 1 of the message schema.  As Whispir adds more features to each schema, our version numbers will increase, this is described in much more detail later on in the documentation.

### Sending messages using JSON and XML

> Send your first message in JSON

```
POST https://api.whispir.com/messages?apikey=89asdfohasd89023rsdfhio8923
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+json
Accept: application/vnd.whispir.message-v1+json
```
```
{
    "to": "<DESTINATION PHONE NUMBER>", 
    "subject": "This is the first line of my SMS",
    "body": "This is the content of my SMS"
}

```
> Send your first message in XML

```
POST https://api.whispir.com/messages?apikey=89asdfohasd89023rsdfhio8923
Authorization: Basic am9obi5zbWl0aDpteXBhc3N3b3Jk
Content-Type: application/vnd.whispir.message-v1+xml
Accept: application/vnd.whispir.message-v1+xml
```
```shell
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:message xmlns:ns2="http://schemas.api.whispir.com">
    <to><DESTINATION PHONE NUMBER></to>
    <subject>This is the first line of my SMS</subject>    
    <body>This is the content of my SMS</body>
</ns2:message> 

```

Once you have successfully sent your SMS message using curl, you can move on to using your application to generate XML or JSON formats for processing.

Be sure to include the correct headers for the desired content type:

* XML - `application/vnd.whispir.message-v1+xml`
* JSON - `application/vnd.whispir.message-v1+json`

For more information on Messages and all the other Whispir resources please continue through the documentation, or browse straight to Messages resource documentation for more information.


# Rate Limiting

Whispir's API usage is limited on a per-apikey basis using a **per second** limit and a **per day** limit.

Depending on your Whispir License, you will obtain higher per second and per day rates:

Whispir Edition | Calls Per Second (CPS) | Calls Per Day (CPD)
-------------- | -------------- | --------------
API Only Edition | 7 calls per second | 5000 calls per day
Business Edition | 1 call per second | 1000 calls per day
Essential Edition | 1 call per second | 1000 calls per day
Professional Edition | 3 call per second | 3000 calls per day
Enterprise Edition | 7 call per second | 5000 calls per day

# Messages

## Get Messages (Default Workspace)

