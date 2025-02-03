# Next.js API Route Handlers Documentation

## Overview

Next.js API route handlers are designed to manage specific API requests and can return files as server responses. They play a crucial role in proxying requests, thereby enhancing security and functionality.

## Key Use Cases

1. **File Downloads:**

   - API route handlers are used for endpoints such as `/api/download/chart`, where a file must be returned in response to a request. Currently, server actions do not support returning files.

2. **Proxying Requests:**

   - By using API route handlers, we can act as a proxy, keeping our private API endpoints hidden from public access. This is particularly useful for validating responses after form submissions.

3. **Weather Health Alerts:**
   - We use Next.js API route handlers for the Weather Health Alerts (WHA) endpoints. The specific endpoints are:
     - `/api/proxy/alerts/v1/[category]/route.ts`
     - `/api/proxy/alerts/v1/[category]/[region]/route.ts`
   - Here, **category** can be either heat or cold, and **region** corresponds to one of the nine supported regions (e.g., East of England or London).
   - For client-side requests, it is essential to proxy them through API route handlers to securely attach the API_KEY, preventing exposure in the browser.

## Example Endpoints

- **File Download Endpoint:**

  - **Endpoint:** `/api/download/chart`
  - **Purpose:** Returns a file in response to the request.

- **Weather Health Alerts Endpoints:**
  - **Endpoint:** `/api/proxy/alerts/v1/[category]/route.ts`
  - **Endpoint:** `/api/proxy/alerts/v1/[category]/[region]/route.ts`
  - **Purpose:** Manages both server-side and client-side requests while securing the API_KEY.

## Conclusion

In our Next.js application, API route handlers serve a crucial purpose in managing data responses and enhancing security.
