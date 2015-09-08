# Imports

> API Endpoint

> > - generic

```xml
https://api.whispir.com/imports/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.import-v1+xml
```

```go
https://api.whispir.com/imports/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.import-v1+json
```

> > - limited to a workspace

```xml
https://api.whispir.com/workspaces/{:id}/imports/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.import-v1+xml
```

```go
https://api.whispir.com/workspaces/{:id}/imports/?apikey=<your_api_key>
Content-Type: application/vnd.whispir.import-v1+json
```

```
> Methods supported

- GET
- POST
```

The imports endpoint allows users to import a CSV/JSON/XML file of contacts (via /resources) to be added to the contacts database. This is slightly different from the contact API as it doesn't support the deleting of contacts. It will only add and update.
 