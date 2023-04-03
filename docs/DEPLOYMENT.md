# Deployment of UKHSA Dashboard

![Pipeline](https://github.com/publichealthengland/winter-pressures-frontend/actions/workflows/build-test-deploy.yml/badge.svg)

This is a [Next.js](https://nextjs.org/) project that utilizes Static Site Generation (SSG) and Incremental Static Regeneration (ISR) for fetching and displaying data.

## GitHub Actions Workflow

We have a GitHub Actions workflow located in `.github/workflows/build-test-deploy` that builds, tests, runs code quality checks, and deploys a built Docker image to AWS Elastic Container Service (ECS) running on port `3000`. Various environment secrets are injected through GitHub secrets.

## Environments

### Development

The development environment is automatically deployed whenever feature branches are merged into `main` via a [Pull Request](https://github.com/publichealthengland/winter-pressures-frontend/pulls).

[Visit Dev →](http://wp-lb-frontend-1239290931.eu-west-2.elb.amazonaws.com/)

### User Acceptance Testing (UAT)

Currently not available.

[Visit UAT →](#)

### Production

Currently not available.

[Visit Production →](#)

## Static Cache Revalidation

The UKHSA Dashboard is generated statically during deployment, with all data fetched and rendered at that time. The site relies on two data sources: the CMS API endpoints and the statistic/chart API endpoints. As the frequency of data updates from these sources is unknown, we have implemented two methods of cache revalidation.

### 1) Automatic Revalidation

Our NextJS app has a 24-hour forced revalidate period. Any changes made to the CMS or data ingestion during this period will be reflected in the dashboard within 24 hours.

### 2) On-Demand Revalidation

If immediate updates are required, an HTTP GET request can be sent to an API route that we have exposed: `/api/revalidate?token=<secret>&page=<page>`. This method allows for per-page revalidation, and will be triggered automatically upon any CMS edits.
