## API Limits

> In the event that Whispir's rate limits are breached, the following error messages will be returned from the Whispir API:

```shell
# Over Queries Per Second Limit 

GET /messages?apikey=abc38bc83bcd3ucbud83

HTTP 403 Forbidden
X-Mashery-Error-Code: ERR_403_DEVELOPER_OVER_QPS
X-Mashery-Error-Detail: Account Over Queries Per Second Limit

# Over Queries Per Day Limit

GET /messages?apikey=abc38bc83bcd3ucbud83

HTTP 403 Forbidden
X-Mashery-Error-Code: ERR_403_DEVELOPER_OVER_QPD
X-Mashery-Error-Detail: Account Over Queries Per Day Limit
```

Whispir's API usage is limited on a per apikey basis using **per second** limit and **per day** limits.

Depending on your Whispir License, you will obtain higher per second and per day rates:

### Whispir.io Editions

Whispir.io Edition | Requests Per Second | Requests Per Day
-------------- | -------------- | --------------
Startup API Edition | 5 requests per second | 10000 requests per day
Business API Edition | 10 requests per second | 20000 requests per day
Enterprise API Edition | 30 requests per second | 50000 requests per day

If further calls per second or per day are required for your application, please contact your Whispir Sales Representative, or [Contact Us](https://stage.whispir.io/contact/).
