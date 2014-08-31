# Rate Limiting

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

Whispir Edition | Calls Per Second (CPS) | Calls Per Day (CPD)
-------------- | -------------- | --------------
API Only Edition | 7 calls per second | 5000 calls per day
Business Edition | 1 call per second | 1000 calls per day
Essential Edition | 1 call per second | 1000 calls per day
Professional Edition | 3 call per second | 3000 calls per day
Enterprise Edition | 7 call per second | 5000 calls per day

If further calls per second or per day are required for your application, please contact your Whispir Sales Representative, or [sales@whispir.com](mailto:sales@whispir.com).
