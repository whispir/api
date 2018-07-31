# Custom Lists

> API Endpoint

> > - generic

```xml
https://api.<region>.whispir.com/customlists/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.customlist-v1+xml
```

```go
https://api.<region>.whispir.com/customlists/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.customlist-v1+json
```

> > - limited to a workspace

```xml
https://api.<region>.whispir.com/workspaces/{:id}/customlists/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.customlist-v1+xml
```

```go
https://api.<region>.whispir.com/workspaces/{:id}/customlists/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.customlist-v1+json
```

```
> Resource type

- application/vnd.whispir.customlist-v1+xml
- application/vnd.whispir.customlist-v1+json


> Methods supported

- GET
```

Custom Lists are user specific translations or preferred options in the various list controls used in the platform tool. These provide the freedom for the user to customize the list options in various modules like Messages, Events. These custom list either can complement or completely overwrite the existing list items.

A quick example -

In the Events, You have a "Priority" field that the user has to fill to specify the priority of the attention. The default ones are -

- Priority 5 (No Set Resolution period)
- Priority 4 (<1 week resolution)
- Priority 3 (<3 day resolution)
- Priority 2 (<1 day resolution)
- Priority 1 (<2hr resolution)

If this is not the standard for the company, the values can be changed to suit your needs. This is where custom lists come in to help. Just Create a custom list and via company settings set the custom list to override the existing list. When this is done, the user using the interface shall only see the new custom list values in place of the standard list.These custom lists can be associated to message attributes, event fields, contact fields.

**Translations within Voice Module -**

The custom lists can also be used to do translations during the Voice Module usage. During the call, options can be read out in various languages depending on the user preference of language. In this case, the standard list is replaced with a custom list that is merely a translation in the target language word to word. Instead of the English, the specific language words are read out, making it easier to communicate with end customers from multiple language groups.

Permission Rules applicable on the Custom Lists -

- Any API user will be able to perform a GET on /customlists
- If the user is a Company Admin or Company Leader, they will receive a 200 OK with the valid response
- If the user is a Company Member or Company Guest, they will receive a 403 Forbidden advising they don't have permission to access this resource

CONTENT (type) -

The customlists will contain all lists in the company across the following places
- RSS Custom Lists
- Incident Custom Lists (Events/Assets)
- Message Attribute Custom Lists
- Contact Custom Lists
- Message Custom Lists

## Retrieving custom lists

```
HTTP 1.1 GET https://api.<region>.whispir.com/customlists?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```xml
Accept: application/vnd.whispir.customlist-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:return xmlns:ns2="http://schemas.api.<region>.whispir.com/dap" xmlns:ns3="http://schemas.api.<region>.whispir.com">
    <status>1 to 5 of 5</status>
    <ns2:customlabels>
        <ns2:customlabel>
            <id>4E2101D0E5D16229</id>
            <name>Category</name>
            <type>INCIDENT</type>
            <createdDate>02/08/11 14:20</createdDate>
            <sortType>As Displayed</sortType>
            <linked>disabled</linked>
            <ns2:link uri="https://api.<region>.whispir.com/customlists/40E5D16229E2101D?apikey=7qyxe7z37tsdy9spv6sw6uec" rel="self" method="GET"/>
        </ns2:customlabel>
        <ns2:customlabel>
            <id>0CA7B9E2B21A3B1A</id>
            <name>Day of Month</name>
            <type>MESSAGE</type>
            <createdDate>13/10/14 16:30</createdDate>
            <sortType>As Displayed</sortType>
            <linked>disabled</linked>
            <ns2:link uri="https://api.<region>.whispir.com/customlists/0CA7B9E2B21A3B1A?apikey=7qyxe7z37tsdy9spv6sw6uec" rel="self" method="GET"/>
        </ns2:customlabel>
        <ns2:customlabel>
            <id>87F23964C25ECF22</id>
            <name>Day of Week</name>
            <type>MESSAGE</type>
            <createdDate>07/01/14 09:51</createdDate>
            <sortType>As Displayed</sortType>
            <linked>disabled</linked>
            <ns2:link uri="https://api.<region>.whispir.com/customlists/87F23964C25ECF22?apikey=7qyxe7z37tsdy9spv6sw6uec" rel="self" method="GET"/>
        </ns2:customlabel>
        <ns2:customlabel>
            <id>F0771B97F1EF770B</id>
            <name>External Vendor</name>
            <type>INCIDENT</type>
            <createdDate>02/08/11 14:20</createdDate>
            <sortType>As Displayed</sortType>
            <linked>disabled</linked>
            <ns2:link uri="https://api.<region>.whispir.com/customlists/F0771B97F1EF770B?apikey=7qyxe7z37tsdy9spv6sw6uec" rel="self" method="GET"/>
        </ns2:customlabel>
        <ns2:customlabel>
            <id>768E4ACA5DA7500C</id>
            <name>Finish Time</name>
            <type>MESSAGE</type>
            <createdDate>01/08/11 12:38</createdDate>
            <sortType>As Displayed</sortType>
            <linked>disabled</linked>
            <ns2:link uri="https://api.<region>.whispir.com/customlists/768E4ACA5DA7500C?apikey=7qyxe7z37tsdy9spv6sw6uec" rel="self" method="GET"/>
        </ns2:customlabel>
    </ns2:customlabels>
</ns2:return>
```

```go
Accept: application/vnd.whispir.customlist-v1+json

{
  "status": "1 to 5 of 5",
  "customlabels": [
    {
      "id": "4E2101D0E5D16229",
      "name": "Category",
      "type": "INCIDENT",
      "createdDate": "02/08/11 14:20",
      "sortType": "As Displayed",
      "linked": "disabled",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/customlists/40E5D16229E2101D?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "id": "0CA7B9E2B21A3B1A",
      "name": "Day of Month",
      "type": "MESSAGE",
      "createdDate": "13/10/14 16:30",
      "sortType": "As Displayed",
      "linked": "disabled",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/customlists/0CA7B9E2B21A3B1A?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "id": "87F23964C25ECF22",
      "name": "Day of Week",
      "type": "MESSAGE",
      "createdDate": "07/01/14 09:51",
      "sortType": "As Displayed",
      "linked": "disabled",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/customlists/87F23964C25ECF22?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "id": "F0771B97F1EF770B",
      "name": "External Vendor",
      "type": "INCIDENT",
      "createdDate": "02/08/11 14:20",
      "sortType": "As Displayed",
      "linked": "disabled",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/customlists/F0771B97F1EF770B?apikey=[your_api_key]",
          "rel": "self",
          "method": "GET"
        }
      ]
    },
    {
      "id": "768E4ACA5DA7500C",
      "name": "Finish Time",
      "type": "MESSAGE",
      "createdDate": "01/08/11 12:38",
      "sortType": "As Displayed",
      "linked": "disabled",
      "link": [
        {
          "uri": "https://api.<region>.whispir.com/customlists/768E4ACA5DA7500C?apikey=[your_api_key]",
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

 * Accept: application/vnd.whispir.customlist-v1+xml
 * Accept: application/vnd.whispir.customlist-v1+json

An array of Custom Lists will be returned to you in the HTTP response body.


<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Response Elements</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">id:</td>
      <td><strong>Number</strong><br/>
        Specifies the unique id of the List.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">name:</td>
      <td><strong>String</strong><br/>
        Specifies the name of the List.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">type:</td>
      <td><strong>String</strong><br/>
        Specifies the type. The type can be one of -
        <ul>
          <li>INCIDENT</li>
          <li>MESSAGE</li>
          <li>CONTACT</li>
          <li>RSS</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">sorttype:</td>
      <td><strong>String</strong><br/>
        Specifies the sorting order. The order can be one of -
        <ul>
          <li>As Displayed</li>
          <li>Ascending</li>
          <li>Descending</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">linked:</td>
      <td><strong>String</strong><br/>
        Specifies the linked status. Linked list item values are dependent on other lists. The linked can be one of -
        <ul>
          <li>disabled</li>
          <li><i>list id to which this is linked with</i></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">link:</td>
      <td><strong>Array</strong><br/>
        Provides a list of URLs that can be used to manipulate or access the list.
        <br>
        <ul>
          <li>uri - the link to access the list</li>
          <li>rel - the descriptor for what the link will do</li>
          <li>method - the HTTP method to use with this particular link</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


## Details of a Specific Custom List

```
HTTP 1.1 GET https://api.<region>.whispir.com/customlists/4E2101D0E5D16229?apikey=[your_api_key]
Authorization: Basic asdf98nf89asdvasd2r398h8sdf
x-api-key: your_api_key
```

```xml
Accept: application/vnd.whispir.customlist-v1+xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:customlabel xmlns:ns2="http://schemas.api.<region>.whispir.com" xmlns:ns3="http://schemas.api.<region>.whispir.com/dap">
    <id>4E2101D0E5D16229</id>
    <name>Category</name>
    <type>INCIDENT</type>
    <createdDate>02/08/11 14:20</createdDate>
    <sortType>As Displayed</sortType>
    <linked>disabled</linked>
    <customlabellists>
        <customlabellist>
            <name>Internal Systems</name>
            <value>Internal Systems</value>
        </customlabellist>
        <customlabellist>
            <name>External Systems</name>
            <value>External Systems</value>
        </customlabellist>
        <customlabellist>
            <name>Infrastructure</name>
            <value>Infrastructure</value>
        </customlabellist>
    </customlabellists>
    <ns3:link uri="https://api.<region>.whispir.com/customlists/40E5D16229E2101D?apikey=7qyxe7z37tsdy9spv6sw6uec" rel="self" method="GET"/>
</ns2:customlabel>
```

```go
Accept: application/vnd.whispir.customlist-v1+json

{
  "id": "4E2101D0E5D16229",
  "name": "Category",
  "type": "INCIDENT",
  "createdDate": "02/08/11 14:20",
  "sortType": "As Displayed",
  "linked": "disabled",
  "customlabellists": [
    {
      "name": "Internal Systems",
      "value": "Internal Systems"
    },
    {
      "name": "External Systems",
      "value": "External Systems"
    },
    {
      "name": "Infrastructure",
      "value": "Infrastructure"
    }
  ],
  "link": [
    {
      "uri": "https://api.<region>.whispir.com/customlists/40E5D16229E2101D?apikey=7qyxe7z37tsdy9spv6sw6uec",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

To retrieve the details of a specific list, the end point must be passed with the custom list ID. The link can be usually found in the `link` attribute of each customlist item.

<table>
    <thead>
        <tr>
            <th style="width: 50%" colspan="2">High-Level Response Elements</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td style="text-align: right; font-weight: bold;">id:</td>
      <td><strong>Number</strong><br/>
        Specifies the unique id of the List.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">name:</td>
      <td><strong>String</strong><br/>
        Specifies the name of the List.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">type:</td>
      <td><strong>String</strong><br/>
        Specifies the type. The type can be one of -
        <ul>
          <li>INCIDENT</li>
          <li>MESSAGE</li>
          <li>CONTACT</li>
          <li>RSS</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">createdDate:</td>
      <td><strong>String</strong><br/>
        Specifies the date of the List creation.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">sorttype:</td>
      <td><strong>String</strong><br/>
        Specifies the sorting order. The order can be one of -
        <ul>
          <li>As Displayed</li>
          <li>Ascending</li>
          <li>Descending</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">linked:</td>
      <td><strong>String</strong><br/>
        Specifies the linked status. Linked list item values are dependent on other lists. The linked can be one of -
        <ul>
          <li>disabled</li>
          <li><i>list id to which this is linked with</i></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">customlabellists:</td>
      <td><strong>Object</strong><br/>
        Contains the individual list items that make up this list. <br><br>The `name` is the text that is shown to the user, where as the `value` is the internally passed in value.
      </td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">link:</td>
      <td><strong>Array</strong><br/>
        Provides a list of URLs that can be used to manipulate or access the list.
        <br>
        <ul>
          <li>uri - the link to access the list</li>
          <li>rel - the descriptor for what the link will do</li>
          <li>method - the HTTP method to use with this particular link</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Search or Filter on Custom Lists

API allows you to be able to query the `GET /customlists` endpoint using the following filters.

```
HTTP 1.1 GET https://api.<region>.whispir.com/customlists?apikey=[your_api_key]&field=value
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
      <td style="text-align: right; font-weight: bold;">name:</td>
      <td>/customlists?name=Category</td>
    </tr>
    <tr>
      <td style="text-align: right; font-weight: bold;">type:</td>
      <td>/customlists?type=Message</td>
    </tr>
  </tbody>
</table>

**Note:** The API currently results in a `404 Not Found` when there are no activities present in the log for a given search criteria. This should not be not confused with a failed response. But rather as `No Data Found`.

## Creating, Updating, and Deleting a custom list

API currently only supports retrieving the custom lists. It does not support the creation, update, and delete of the custom list.
