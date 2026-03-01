# UKHSA Data Dashboard Frontend Documentation

Welcome to the UKHSA Data Dashboard Frontend. This project is built with [Next.js](https://nextjs.org/), utilizing the [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/) and adhering to the [GOV.UK Design System (GDS)](https://design-system.service.gov.uk/) principles to deliver a robust and accessible data visualization platform.

## Table of Contents

- [UKHSA Data Dashboard Frontend Documentation](#ukhsa-data-dashboard-frontend-documentation)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Initial Setup](#initial-setup)
    - [Local Development](#local-development)
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