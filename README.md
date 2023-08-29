# UKHSA data dashboard Frontend

This is a [Next.js](https://nextjs.org/) project built using the [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/) and following [GOV.UK Design system (GDS)](https://design-system.service.gov.uk/) principles.

### Prerequisites

- NodeJs (Minimum version of 18.16.0)

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In development, the UKHSA data dashboard frontend serves content and data from mocked api endpoints. We run a NodeJs Express based mock server
alongside the NextJs development instance. The mock server is run on [http://localhost:3005](http://localhost:3005) and loads the mocks from inside the `/mock-server/handlers` directory.

### Run development against real APIs

Add a .env.local file with the following values filled in:

```
API_URL=<URL_HERE>
API_KEY=<API_KEY_HERE>
```

## Deployment

We have a GitHub Actions workflow located in `.github/workflows/build-test-deploy` that builds, tests, runs code quality checks, and deploys a built Docker image to AWS Elastic Container Service (ECS) running on port `3000`.

TODO: Explain how the infra repo is then responsible for deploying to all well known environments.

### Environments

[View our list of well known environments in Confluence →](https://digitaltools.phe.org.uk/confluence/pages/viewpage.action?spaceKey=DPD&title=Environments)

### Cache revalidation

The UKHSA data dashboard front-end utilises NextJs Server Components with route segment revalidation. This means that an initial copy of the entire app is built and cached within the container on each deployment. This allows for almost instantaneous page loads.

Content will become stale after pre-defined period of time after which NextJs will fetch and update that
content using a stale-while-revalidate caching strategy.

[View NextJs' caching documentation →](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data)

# Styling

We priortise the use of [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/) CSS along with Tailwind for additional styling.
