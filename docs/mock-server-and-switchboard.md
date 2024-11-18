# Mock Server and Switchboard Documentation

## Overview

This documentation provides an overview of the **Mock Server** and **Switchboard**, two essential tools for local development in our front-end application. These tools facilitate independent development and testing without relying on the actual backend API.

## Mock Server

### What is the Mock Server?

The **Mock Server** is a Node.js Express application that mimics our backend's private API. It runs locally within the front-end application, allowing developers to simulate API responses and behaviours.

### Key Features

- **Local Development:** The mock server is designed to run only in the front-end application environment, enabling developers to work offline and independently from the live backend.
- **Customisable Responses:** The server can be configured to return specific responses based on your testing needs, making it easier to simulate various scenarios.

### Location and Configuration

- The mock server code is located in the `src/mock-server` directory of the project.
- **Endpoints Configuration:** The endpoints are configured in mock-server/index.ts. Each endpoint references a handler found in the mock-server/handlers directory.
  - For example, for the /api/bulkdownloads/v1 endpoint, the corresponding handler file is mock-server/handlers/bulkdownloads/v1.ts.

### Handlers

- Handlers are standard Express.js API handlers that return JSON responses mimicking the actual API.
- The JSON responses are usually located in a fixtures folder adjacent to the handler file, allowing for easy management and updates of the mock data.

### Dynamic Responses

- Dynamic JSON can be served through integration with the Switchboard using the getSwitchBoardState helper. This allows for real-time changes to the mock responses based on the Switchboard's configuration.

### Starting the Mock Server

The mock server starts automatically when you run the command npm run dev. It will be accessible at http://localhost:3005, allowing for seamless local development.

## Environment Configuration

When working locally, you need to set up a .env.local file to configure the API endpoint and authentication key. This file should include the following:

```
API_URL=http://localhost:3005
API_KEY=123
```

### Testing Against a Deployed Environment

If you want to test against a real deployed environment, you can adjust your .env.local file as follows:

```
API_URL=https://private-api.dev.ukhsa-dashboard.data.gov.uk
API_KEY={DEV_API_KEY}
```

Make sure to uncomment these lines when you wish to test against the actual API.

## Switchboard

### What is the Switchboard?

The **Switchboard** is a local-only UI dashboard that allows developers to manipulate the responses from the mock server dynamically. It achieves this through the use of cookies, providing a flexible way to test different front-end states.

### Key Features

- **Dynamic Mock Responses:** The switchboard enables you to change the data returned by the mock server in real time, which is particularly useful for testing feature flags and other conditional behaviours in the front end.
- **Facilitates Testing:** By allowing developers to simulate different backend responses, the switchboard is instrumental in validating the front end against various scenarios, especially in automated tests like Playwright.

### Location

The switchboard is located in the `src/app/(pages)/switchboard` directory. You can access the switchboard interface in your local development environment at http://localhost:3000/switchboard to manipulate mock responses as needed.

## Usage

1. **Starting the Development Environment:**
   - Run the command npm run dev to start the development server, including the mock server.
2. **Accessing the Mock Server:**

   - Once the mock server is running, navigate to http://localhost:3005 in your browser to access the mock API.

3. **Accessing the Switchboard:**
   - After starting the mock server, navigate to http://localhost:3000/switchboard in your browser to access the switchboard UI.
   - Use the interface to modify mock responses by setting cookies, testing various configurations, and validating front-end behaviours.

## Conclusion

The Mock Server and Switchboard are powerful tools that enhance local development and testing workflows. By simulating backend API responses and allowing dynamic manipulation of those responses, they enable developers to work more efficiently and effectively test the front-end application.

For any questions or additional information, please refer to the project README or reach out to the development team.
