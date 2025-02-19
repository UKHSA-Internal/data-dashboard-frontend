import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env.local') })

const baseURL = process.env.baseURL || 'http://localhost:3000'

const authStorage =
  process.env.AUTH_ENABLED === 'true' && fs.existsSync('e2e/storage/auth.json') ? 'e2e/storage/auth.json' : undefined

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '*.e2e.ts',
  testIgnore: ['**/src/**'],

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  forbidOnly: false,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Limit the number of failures on CI to save resources */
  maxFailures: process.env.CI ? 10 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Ensure auth session is loaded if it exists */
    storageState: authStorage,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      grepInvert: /@mobileOnly | @tabletOnly/,
    },

    /* TODO: CDD-2209: Restore Firefox after investigating Switchboard incompatibility */
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   grepInvert: /@mobileOnly | @tabletOnly/,
    // },

    /* Test against mobile viewport. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
      grepInvert: /@desktopOnly/,
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'NODE_ENV=test npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
