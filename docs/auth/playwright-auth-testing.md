# Authentication Testing in Playwright

This document explains how authentication testing works in our Playwright test suite, specifically for non-public dashboard routes.

## Overview

Our authentication testing uses a dynamic fixture system that is enabled based on environment variables. This allows us to:

- Run tests with authentication in CI/CD environments
- Skip authentication in local development
- Securely manage test credentials through GitHub Secrets (to be migrated to AWS Secrets Manager)
- Run the entire test suite for both public and non-public routes

## Environment Variables

The following environment variables control the authentication testing behavior:

- `AUTH_ENABLED`: Controls whether authentication is required for the application
- `PLAYWRIGHT_AUTH_USER_USERNAME`: Username for test authentication (from GitHub Secrets)
- `PLAYWRIGHT_AUTH_USER_PASSWORD`: Password for test authentication (from GitHub Secrets)

## Test Credentials Setup

Before using the test credentials, they must be set up in your environment's Cognito User Pool:

1. Access the AWS Console and navigate to Cognito
2. Select your environment's User Pool
3. Create a new user with the following settings:
   - Username: Must match `PLAYWRIGHT_AUTH_USER_USERNAME`
   - Password: Must match `PLAYWRIGHT_AUTH_USER_PASSWORD`
   - Email: Use a test email address
   - Email verified: Yes
   - Phone number: Optional
   - Status: Enabled

The test user must be created in each environment's Cognito User Pool where tests will run (development, staging, production).

## Test Fixture Setup

The authentication system uses two key fixtures in `e2e/fixtures/auth.ts`:

1. `authEnabled` fixture: Reads the `AUTH_ENABLED` environment variable and provides a boolean value
2. `setupAuth` fixture: An auto fixture that runs for all tests but exits early if `authEnabled` is false

The `setupAuth` fixture is marked as an auto fixture, meaning it runs automatically for all tests. However, it first checks the `authEnabled` value and exits early if authentication is not required.

## Test Suite Design

The test suite is designed to run all tests for both public and non-public routes:

1. **Public Routes**: Tests run without authentication
2. **Non-Public Routes**: Tests run with authentication when `AUTH_ENABLED=true`

### Writing Specific Tests

You can write tests that are specific to either public or non-public routes by injecting the `authEnabled` fixture:

```typescript
// Test that only runs for public routes
test('should access public dashboard without auth', async ({ page, authEnabled }) => {
  test.skip(authEnabled, 'This test is for public routes only')
  await page.goto('/public-dashboard')
  await expect(page).toHaveTitle(/Public Dashboard/)
})

// Test that only runs for non-public routes
test('should access protected dashboard with auth', async ({ page, authEnabled }) => {
  test.skip(!authEnabled, 'This test is for non-public routes only')
  await page.goto('/dashboard')
  await expect(page).toHaveTitle(/Protected Dashboard/)
})

// Test that runs for both scenarios
test('should handle both public and protected routes', async ({ page }) => {
  // The auth fixture will handle authentication if AUTH_ENABLED is true
  await page.goto('/dashboard')
  await expect(page).toHaveTitle(/Dashboard/)
})
```

## GitHub Secrets Integration

Currently, test credentials are managed through GitHub Secrets:

1. `PLAYWRIGHT_AUTH_USER_USERNAME`: Username for test authentication (must match Cognito user)
2. `PLAYWRIGHT_AUTH_USER_PASSWORD`: Password for test authentication (must match Cognito user)

These secrets are injected into the test environment during CI/CD runs and must correspond to an existing user in the environment's Cognito User Pool.

## Migration to AWS Secrets Manager

**TODO**: The current GitHub Secrets implementation should be migrated to AWS Secrets Manager for better security and management. This migration will involve:

1. Creating corresponding secrets in AWS Secrets Manager
2. Updating the CI/CD pipeline to fetch secrets from AWS
3. Updating the test configuration to use AWS secrets

## Local Development

For local development:

1. Set `AUTH_ENABLED=false` in your `.env.local` file to skip authentication
2. Or set `AUTH_ENABLED=true` and provide test credentials in your environment:
   ```bash
   PLAYWRIGHT_AUTH_USER_USERNAME=your_test_username  # Must match Cognito user
   PLAYWRIGHT_AUTH_USER_PASSWORD=your_test_password  # Must match Cognito user
   ```
   Ensure these credentials match a user in your local environment's Cognito User Pool.

## CI/CD Configuration

The CI/CD pipeline is configured to:

1. Set `AUTH_ENABLED=true` for relevant test runs
2. Inject GitHub Secrets as environment variables:
   - `PLAYWRIGHT_AUTH_USER_USERNAME`
   - `PLAYWRIGHT_AUTH_USER_PASSWORD`
3. Run the test suite with authentication enabled

## Security Considerations

1. Test credentials should never be committed to the repository
2. All sensitive data should be managed through secure secret management
3. Test credentials should be rotated regularly
4. Access to test credentials should be limited to necessary team members

## Future Improvements

1. Migrate from GitHub Secrets to AWS Secrets Manager
2. Implement credential rotation automation
3. Add audit logging for test credential usage
4. Consider implementing different test user roles for more comprehensive testing
