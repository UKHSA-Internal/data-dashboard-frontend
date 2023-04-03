# Deployment of UKHSA Dashboard

This is a [Next.js](https://nextjs.org/) project that utilizes Static Site Generation (SSG) and Incremental Static Regeneration (ISR) for fetching and displaying data.

## GitHub Actions Workflow

We have a GitHub Actions workflow located in `.github/workflows/build-test-deploy` that builds, tests, runs code quality checks, and deploys a built Docker image to AWS Elastic Container Service (ECS) running on port `3000`. Various environment secrets are injected through GitHub secrets.

## Environments

### Development

The development environment is automatically deployed whenever feature branches are merged into `main` via a [Pull Request](https://github.com/publichealthengland/winter-pressures-frontend/pulls).

### User Acceptance Testing (UAT)

Currently not available.

### Production

Currently not available.
