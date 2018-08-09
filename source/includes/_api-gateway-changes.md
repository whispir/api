# API Gateway Changes

Whispir has recently updated the API Gateway Service for all its instances. This update brings in the ability to better route the API requests to its regional instances, and also lays the foundation for more API Gateway related benefits it will bringing to its customers in the future.

The changes we are rolling in now are primarily in two areas.

1. The API URL will be more specific to your region
2. The API Key information is also to be passed in the headers, apart from the current query param

<aside class="notice">
Whispir has set a good timeline of 6 months for its customers to update their API libraries, and systems to adapt to these changes. This means, you can continue to make your API calls in the current way till 31-Jan-2019 (23:59:59 GMT). 
</aside>

However, Whispir requests you to make efforts to change as stated below at the earliest possible time. The 31-Jan-2019 is a fixed date, and no extention will be provided. If no changes are made by the said date, your API calls will be rejected by Whispir.


## New API URL


> Current API Base URL

```
https://api.whispir.com
```

> New API URL based on regions -

```
AU - https://api.au.whispir.com
AP - https://api.ap.whispir.com
AP1 - https://api.ap1.whispir.com
NZ - https://api.nz.whispir.com
US - https://api.us.whispir.com
IT - https://api.it.whispir.com
EDU - https://api.education.whispir.com
```


When you are making a call to Whispir API today, the URL is simply ```https://api.whispir.com```. This is a single URL for all the regions. Going forward, the URL will be more inline with your account's region making it ```https://api.<region>.whispir.com```.

The region and its corresponding URL is as following -

<table>
	<thead>
	<tr><th>Region</th><th>API Base URL</th></tr>
	</thead>
	<tbody>
		<tr><td>AU</td><td>https://api.au.whispir.com</td><tr>
		<tr><td>AP</td><td>https://api.ap.whispir.com</td><tr>
		<tr><td>AP1</td><td>https://api.ap1.whispir.com</td><tr>
		<tr><td>NZ</td><td>https://api.nz.whispir.com</td><tr>
		<tr><td>US</td><td>https://api.us.whispir.com</td><tr>
		<tr><td>IT</td><td>https://api.it.whispir.com</td><tr>
		<tr><td>EDU</td><td>https://api.education.whispir.com</td><tr>
	</tbody>
</table>

**What is my region?**

1. Login to your Whispir.io Account, and click on any existing key. The information is available there as `Enviroment` value. Eg: for `ap.whispir.com`, your region is `ap`. 
2. By asking your company administrator. The region is usually revealed from your Platform URL, which would be in the format of ```https://<region>.whispir.com```
3. If you are still unsure, Please reach out to <a href="mailto:support@whispir.com?subject=What%20is%20my%20region?">Whispir Support</a> by passing your API Key. Support would advise on your region specifc API URL.


## Sending API Key

> > Taking an example, If your region is AP, then your -

> Current API Key sending mechanism

```
https://api.whispir.com?apikey=YOUR-API-KEY
Authorization: Basic YOUR-AUTH-HEADER
```

> New API URL based on region, and api key is sent via headers -

```
https://api.ap.whispir.com?apikey=YOUR-API-KEY
Authorization: Basic YOUR-AUTH-HEADER
x-api-key: YOUR-API-KEY
```
> > The only change here is the addition of a new header value to carry the api key, and change of the url to be region specific.

Whispir needs your API Key to validate that the request is made genuinely by you, and ties it against your account for rate limiting, and throughput capacity purposes. Currently, the api key information is sent via the url query params.

In line with the new API Gateway changes, the key information has to be passed in via the "headers" as well, using the `x-api-key` header value.

**Important Points:**

1. The apikey is to be passed both as a query param and also as a header value.
2. The header key to be used is `x-api-key`. Eg: `x-api-key: YOUR-API-KEY`. The value is same as the apikey value sent in the headers.
3. The order in the headers does not matter. `x-api-key` can be passed as the last header value, or the first, or somewhere in the middle. Sending it is important. The order is not so much so.
4. If the API Key value is incorrect, or not passed propery, then a `403 Forbidden` error will be returned by Whispir.
5. All other header parameters that you are sending today, should be passed as-is. DO NOT remove them. DO NOT remove them. DO NOT remove them. You have been warned thrice.


## SNI Compliance

(Server Name Indication (SNI) is a TLS extension that allows a single endpoint to provide multiple, valid certificates based on the resource being requested. SNI was first introduced in 2004 and has had support across major browsers since 2006, and most web servers since 2009. 

Almost all modern programming languages have SNI support through their native cryptographic libraries, though this is not true for all versions of those programming languages. For example, Java introduced native SNI support in 2011 with the release of Java 1.7. Integrations that use native Java 1.6 libraries, which is currently in Extended Support and due for End of Life in December, will not have support for SNI.)

Apart from the programming changes, this change is more done at the infrastructure level. So, please speak to your Architect, or Ops Admins in relation to this change. The change will involve all clients needing to be compliant to Server Name Indication (SNI). Whispir is undertaking measures to minimise the impact of client-side integrations lacking this compliance - however we encourage all clients to be compliant to SNI as soon as possible.

If your application is not SNI enabled, then the API calls made to Whispir using https will fail. Whispir is hosting its new API Service using Amazon's Web Services. The API Gateway is fronted by a Amazon CDN CloudFront. This means, if the calling party (your application server/integration server) does not understand SNI, the certificate handshake will fail, as it may not request specifically to connect with api.whispir.com, and CloudFront will then choose to provide its default SSL cert, which will result in your service treating this as a SSL hand-shake error. With SNI Enabled, your application server can specifically ask for api.whispir.com certificate, and things will work as expected.

If you have any queries, related to this, please do reach out to <a href="mailto:support@whispir.com?subject=I%20need%20help%20with%20api%20key%20header%20value">Whispir Support</a>. Provide as much detail as possible in relation to the help you need, or the error you have faced with this change.