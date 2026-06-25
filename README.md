# UKHSA Data Dashboard Frontend Documentation

Welcome to the UKHSA Data Dashboard Frontend. This project is built with [Next.js](https://nextjs.org/), utilizing the [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/) and adhering to the [GOV.UK Design System (GDS)](https://design-system.service.gov.uk/) principles to deliver a robust and accessible data visualization platform.

## Table of Contents

- [UKHSA Data Dashboard Frontend Documentation](#ukhsa-data-dashboard-frontend-documentation)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Initial Setup](#initial-setup)
    - [Local Development](#local-development)
    - [Playwright Tests](playwright-tests)
  - [Deployment](#deployment)
  - [Styling](#styling)
  - [Environments](#environments)
  - [Enabling Non-Public functionality](#enabling-non-public-functionality)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js version 22.13.1 or later

## Getting Started

### Initial Setup

1. **Install Dependencies**
   - Install node modules : `npm install`

2. **Environment Variables:**  
   Create a `.env.local` file at the root of your project directory. Use the example below as a reference for the required environment variables:

   ```
   TZ="Europe/London"
   API_KEY=123
   API_URL=http://localhost:3005
   FEEDBACK_API_URL=http://localhost:3005
   GOOGLE_TAG_MANAGER_ID=GTM-W39KF5J2
   ```

3. **Development Server:**  
   Start the Next.js development server by running the following command in your terminal:

   ```bash
   npm run dev
   ```

   Access the application by navigating to [http://localhost:3000](http://localhost:3000) in your browser.

### Local Development

The frontend interacts with a Node.js Express-based mock server during development. This server runs on [http://localhost:3005](http://localhost:3005) and uses the `/mock-server/handlers` directory for loading mock data. This setup allows for isolated local development ahead of backend integrations.

### Playwright Tests

We have some Playwright tests which are used during the CI pipeline on PRs for testing as well as after deployments to
smoke test (this is [triggered](https://github.com/UKHSA-Internal/data-dashboard-infra/blob/main/.github/workflows/production.yml#L138) from the infrastructure repository after a deployment is completed).

#### Installing Playwright

To setup to run the playwright tests locally, you must install playwright's dependencies:

```bash
npx playwright install --with-deps
```

This should install the necessary packages on your system and will inform you if anything can't be installed.

#### Running the Playwright Tests

There are several sets of the Playwright tests, each of which tragets a specific task and server.
General tests should be run against a development instance of the frontend using either the mock server or a dev backend
instance. Smoke tests should be run against WKEs like production. Auth UI and non-public tests should be run against an
auth-enabled local or deploted environment.

Which server to target is specified using the `baseURL` environment variable.
You can specify this in your `.env.local` file which is read in the [Playwright config file](playwright.config.ts), or
you can specify it directly as an environment variable before you run Playwright (e.g. `export baseURL=http://a.b.c`).
The Playwright configuration will default this `baseURL` to `http://localhost:3000` if not specified.

when running against a local frontend, start the app first:

```bash
npm run dev
```

The default Playwright config runs tests against Chromium desktop and Mobile chrome. The desktop project excludes
`@mobileOnly` and `@tabletOnly` tests, while the Mobile Chrome project excludes `@desktopOnly` tests.

Which tests are run is easiest controlled using the `--grep` or `--grep-invert` argument passed to `playwright`

##### Running the general tests

Target `baseURL` at local development server, make sure your dev server is running, and then run:

```bash
npx playwright test --grep-invert @smoke
# or
npm run test:e2e
```

`npm run test:e2e` opens Playwright UI mode. Use `npm run tests:e2e:ci` to run the same non-smoke tests headlessly.

##### Running the smoke tests

Target `baseURL` at a WKE's URL and then run:

```bash
npx playwright test --grep @smoke
# or
npm run test:e2e:smoke
```

Use `npm run test:e2e:smoke:ui` to run smoke tests in Playwright UI mode.

### Running auth and non-public tests

Tests tagged `@auth-ui` and `@non-public` only run meaningful assertions when `AUTH_ENABLED=true`. These tests use a
mocked auth session, so they so not require real Platwright user credentials, but they so require auth environment
variables needed to create the session cookie:

```bash
AUTH_ENABLED=true
AUTH_SECRET=<random-secret>
NEXTAUTH_URL=http://localhost:3000
PLAYWRIGHT_AUTH_USER_USERNAME="Test User"
```

`PLAYWRIGHT_AUTH_USER_USERNAE` is optional and defaults to `Test User`.

To run only the auth UI tests:

```bash
npx playwright test --grep @auth-ui
```

To run only the non-public tests:

```bash
npx playwright test --grep @non-public
```

#### Test tags

- `@smoke`: post-deployment smoke tests, usually run against a WKE such as production.
- `@auth-ui`: auth start, logged in, logged-out and classification banner in UI tests.
- `@non-public`: non-public page and sitemap tests. requires `AUTH_ENABLED=true`.
- `@desktopOnly`: excluded from the Mobile Chrome project.
- `@mobileOnly`: excluded from the desktop Chromium project.
- `@tabletOnly`: excluded from the desktop Chromium project. These tests use tablet viewport settings inside the test
suite and surrently run under the Mobile Chrome project.

## Deployment

Our project uses a GitHub Actions workflow for CI/CD. The workflow, located at `.github/workflows/build-test-deploy`, automates the build, test, code quality checks, and deployment processes. Deployments are made to AWS Elastic Container Service (ECS) on port `3000`. The workflow also initiates deployment updates in our [infrastructure repository](https://github.com/UKHSA-Internal/data-dashboard-infra/).

## Styling

For styling, the project primarily uses [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/) components and styles, supplemented with Tailwind CSS for additional customization. Conditional styles within components are managed using the `clsx` package.

## Environments

For a detailed list of our deployment environments and their configurations, refer to our [environments documentation on Confluence](https://digitaltools.phe.org.uk/confluence/pages/viewpage.action?spaceKey=DPD&title=Environments).

## Enabling Non-Public functionality

Instructions on setting up your the non-public version of the dashboard can be found here: [Enabling Non Public](./docs/auth/enabling-non-public.md)

### Pre-commit Hooks

This repository uses **pre-commit** to automatically scan for hardcoded secrets before allowing commits.

We recommend using **prek**, a faster drop-in replacement for pre-commit. It works with the existing configuration and requires no changes to the config files.

---

#### Setup (one-time)

1. Install `uv` (if not already installed)

On macOS:

```bash
brew install uv
```

2. Install `prek` globally:

```bash
uv tool install prek
```

3. Install Git Hooks(required)

Run this once per repository

```bash
prek install
```

This install the git hooks so secret scanning runs automatically before every commit

4. Run Manually(Optional)

To scan all files manually

```bash
prek run --all-files
```
