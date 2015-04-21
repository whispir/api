# Whispir.io API

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
<ns2:message xmlns:ns2="https://schemas.api.whispir.com">
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

Built by developers, for developers, Whispir.io is the place where you can easily build accountable messaging into your app – SMS, email, push, voice, chat, web, social, & rich messages.

Easy to use, Whispir.io presents all the tools you need to develop a communications capability for your app and enable rapid deployment to market. Integrate, test, demonstrate, and commercialise your app, without significant capital investment, with leading messaging API technology.

No other platform enables you to create & send rich messages, personalise cross-channel communications, and enrich your contact data with relevance.

**We can't wait to see what you build**

### Whispir Communications API

The Whispir.io Communications API gives developers the ability to:

* Create, send and retrieve multi-channel messages over 8 different channels
* Invoke scenario based communications for quick, effective and targeted communications
* Publish messages to internal or external web pages, RSS feeds and social networks
* Asynchronously receive all responses to a given message and perform analysis on the data

### Communications Template API

The Whispir.io Template API gives developers the ability to:

* Create rich, cross-channel message templates that can be managed by designers within the Whispir Rich Message Studio.
* Ensure a DRY (don't repeat yourself) pattern within developer code by separating the communication content from code 
* Reduce code change by managing content elsewhere

### Event Management API

The Whispir.io API Event Management API provides developers with the tools needed to manage the communication around events that happen:

* When events occur in your organisation, manage them using Whispir.io
* Save different event details; Severity, Priority, Description and Tasks to ensure a path to a seamless resolution
* Automatically inform teams through Whispir's integrated cross-channel messaging, ensuring that you know who has received the message, and more importantly; who hasn't

### Contact Management API

The Whispir.io API provides developers with the ability to manage the recipients of their messages:

* Store contact information in a cloud based highly available and accessible environment
* Use standards based methods to create, update, and delete contact information
* Build forms to allow contacts to self-register and manage their account, with auto-generated email notifications
* Create, update and delete distribution lists that can be accessed for messaging at a later date

