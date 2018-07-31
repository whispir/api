# Whispir Platform API

> API Endpoint

```
https://api.<region>.whispir.com
```

>> Whispir regions are -

```
AU - https://api.au.whispir.com
AP - https://api.ap.whispir.com
AP1 - https://api.ap1.whispir.com
NZ - https://api.nz.whispir.com
US - https://api.us.whispir.com
IT - https://api.it.whispir.com
EDU - https://api.education.whispir.com
```

> API Authorization

> > Users must use an **API Key** and **Authorization Header** to access the Whispir API. These are available by signing up for a account at [whispir.io](https://whispir.io).


> Summary of Resources

> > The following resource endpoints are accessible when using the Whispir API.

```
/messages
/messages/:id/messagestatus
/messages/:id/messageresponses
/templates
/responserules
/contacts
/contacts/:id/devices
/distributionlists
/scenarios
/events
/imports
/resources
/activities
/users
/customlists
/callbacks
/callbacks/:id/calls
/workspaces
/apps
```
> > **Note:** The **events** endpoint is only available for users with the Events Module.

> Example Request

```shell
# Authorization and apikey are provided in the registration processes
curl -H "Authorization: Basic <YOUR AUTHORIZATION HEADER>" -H "x-api-key: <YOUR API KEY>"
     https://api.<region>.whispir.com/messages?apikey=<YOUR API KEY>
```

> Example Response


```text
HTTP/1.1 200 OK
```

```shell
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.<region>.whispir.com/dap" xmlns:ns3="http://schemas.api.<region>.whispir.com">
    <status>No records found</status>
</ns2:return>
```

Built by developers, for developers, Whispir is the place where you can easily build communications into your app – SMS, email, push, voice, chat, web, social, & rich messages.

The Whispir API gives developers the ability to:

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
