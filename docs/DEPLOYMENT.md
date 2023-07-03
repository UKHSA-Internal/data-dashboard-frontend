# Deployment of UKHSA data dashboard

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

The UKHSA data dashboard is generated statically during deployment, with all data fetched and rendered at that time. The site relies on two data sources: the CMS API endpoints and the statistic/chart API endpoints. As the frequency of data updates from these sources is unknown, we have implemented two methods of cache revalidation.

### 1) Automatic Revalidation

The NextJS application is configured with a stale-while-revalidate cache, enforced with a one-minute revalidation period. This means that any updates or modifications made to the content management system (CMS) or data ingestion process will be reflected in the application's dashboard within a minute of their occurrence.

### 2) On-Demand Revalidation

If immediate updates are required, an HTTP GET request can be sent to an API route that we have exposed: `/api/revalidate?token=<secret>&page=<page>`. This method allows for per-page revalidation, and will be triggered automatically upon any CMS edits.

```
Note: This feature is presently inactive as a result of the UKHSA front-end infrastructure. The load balancer initiates invalidations on an individual container, leading to potential discrepancies in content delivery. While some requests may receive updated content, others may receive outdated content.
```
