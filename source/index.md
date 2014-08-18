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

# Summary

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

# Access

To start, you need access to the following:

* A Whispir Account ([Free Trial Here](https://app.whispir.it/pub/whispirSelfRegistration.pub))
* An API key ([Developer Account Here](https://developer.whispir.com/member/register))

With this information you can begin to make requests to the API.

<aside class="notice">
You must replace `meowmeowmeow` with your personal API key.
</aside>

> To authorize, use this code:

```json
HTTP 1.1 GET https://api.whispir.com?apikey=json


```

```xml
HTTP 1.1 GET https://api.whispir.com?apikey=xml


```

```
//Company Workspace Endpoints

/workspaces
/messages
/templates
/distributionlists
/scenarios
/contacts
/users

//Other Workspace Endpoints

/workspaces
/messages
/templates
/distributionlists
/scenarios
/contacts
/users

```


# Kittens

## Get All Kittens

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get
```

```python
import 'kittn'

api = Kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```shell
curl "http://example.com/api/kittens"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Isis",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTP Request

`GET http://example.com/kittens`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import 'kittn'

api = Kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/3"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Isis",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">If you're not using an administrator API key, note that some kittens will return 403 Forbidden if they are hidden for admins only.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the cat to retrieve

