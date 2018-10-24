## API Rate Limits

> API Rate Limits

> > In the event that Whispir's rate limits are breached, the following error messages will be returned from the Whispir API:

```shell
# Over Queries Per Second Limit 

GET /messages?apikey=abc38bc83bcd3ucbud83
x-api-key: abc38bc83bcd3ucbud83

HTTP 403 Forbidden
X-Error-Code: ERR_403_DEVELOPER_OVER_QPS
X-Error-Detail: Account Over Queries Per Second Limit

# Over Queries Per Day Limit

GET /messages?apikey=abc38bc83bcd3ucbud83
x-api-key: abc38bc83bcd3ucbud83

HTTP 403 Forbidden
X-Error-Code: ERR_403_DEVELOPER_OVER_QPD
X-Error-Detail: Account Over Queries Per Day Limit
```

Whispir's API usage is limited on a per apikey basis using **per second** limit and **per day** limits.

Depending on your Whispir License, you will obtain higher per second and per day rates:

### Whispir.io Editions

Whispir.io Edition | Requests Per Second | Requests Per Day
-------------- | -------------- | --------------
Startup API Edition | 5 requests per second | 10000 requests per day
Business API Edition | 10 requests per second | 20000 requests per day
Enterprise API Edition | 30 requests per second | 50000 requests per day

If further calls per second or per day are required for your application, please contact your Whispir Sales Representative, or [Contact Us](https://whispir.io/contact/).

## Auto Extention of daily limits

Whispir enforces a strict daily limit for the API Calls made to its API irrespective of the endpoint and the HTTP Method. At times, there could be a need to temporarily extend the limits of the API Key because you may be experiencing higher than normal activity on your service due to planned or unplanned events. Whispir understands that, and does an automated extention of your api limits to twice the original value for the next 24 hours. This helps in prevention of hitting a wall, and ensures that your messaging traffic flows smoothly. The extention is automatic, and does not need your input or confirmation/action. After 24 hours, the limits are returned to original values. Any auto-extention is free twice a month, and notification will be sent to your account manager whenever the extention happens. Whispir may reach out to discuss commercials if a higher CPD limit is observed continously.

Ex: If you are in Startup Edition, then your per day limits will be doubled to 20k. For Business, it will become 40k, and Enterprise will become 100k. The per second limits remain unchanged at all times.
