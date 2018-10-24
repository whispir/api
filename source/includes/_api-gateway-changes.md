# API Gateway Changes
We have moved away from our legacy API Gateway service to AWS API Gateway Service to better serve your growing API needs.

This migration is being performed in 2 phases. 

Phase 1: Provide the new regional gateway service (Completed)
Phase 2: Sunset the api.whispir.com url, and only keep the regional based links. (Ongoing, and last date for clients to update is Jan 31, 2019)

Please follow the steps below to check the 3 main element of compliance to the new API Gateway standards.


## Change of SSL Certs
Whispir is aware of some client integrations that depend upon trusting the client SSL Certificate explicitly. 

If your application has this dependency, we would recommend that you review your implementation as the certificate serving api.whispir.com will be changing. You can download the new wildcard certificate by simply visiting au.whispir.com , or the respective region (ap, us, nz, it, ap1) based URL.


## IP Whitelisting
The new and legacy Whispir API Gateway services are hosted in AWS.

If your implementation depends upon IP Whitelisting in order to make calls to our service, we suggest that you review the following set of <a href="https://ip-ranges.amazonaws.com/ip-ranges.json">Amazon IP's</a>. You will need to whitelist all IP ranges for the service "CLOUDFRONT" in the region "GLOBAL".

## Enforcing HTTP Specifications
Whispir is aware of some client intergration that do not adhere to header parsing rules specified in the <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html">Hypertext Transfer Protocol specification</a>.

While Whispir is looking to implement mitigations for those impacted, we highly recommend that you review your implementations and ensure that they treat all headers as case insensitive to increase resilience.

The rollout of changes on the 21st of August highlighted these issues with some client integrations. The most common problem identified was a dependency on the casing of the 'location' response header provided by Whispir after successful API calls.

# Changes to API URL and Key

Whispir has recently updated the API Gateway Service for all its instances. This update brings in the ability to better route the API requests to its regional instances, and also lays the foundation for more API Gateway related benefits it will bringing to its customers in the future.

The changes we are rolling in now are primarily in two areas.

1. The API URL will be more specific to your region
2. The API Key information is also to be passed in the headers, apart from the current query param

<aside class="notice">
Whispir has set a timeline of 6 months for its customers to update their API libraries, and systems to adapt to these changes. This means, you can continue to make your API calls in the current way till 31-Jan-2019 (23:59:59 GMT). 
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


If you have any queries, related to this, please do reach out to <a href="mailto:support@whispir.com?subject=API%20Gateway%20Changes">Whispir Support</a>. Provide as much detail as possible in relation to the help you need, or the error you have faced with this change.
