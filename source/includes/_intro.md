# Whispir API

> Whispir's API requires only 3 parameters within JSON or XML to send an SMS message


```go
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

