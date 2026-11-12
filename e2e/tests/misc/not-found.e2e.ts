import { expect } from '@playwright/test'

import { test } from '../../fixtures/app.fixture'

test.describe('Not found page', () => {
  const missingPaths = [
    '/some-non-existent-page',
    '/testing',
    '/cover/childhood-vaccinationsss',
    '/access-our-data/nope',
    '/weather-health-alerts/nope',
    '/weather-health-alerts/heat/E12000007/nope',
  ]

  for (const path of missingPaths) {
    test(`Default layout for ${path}`, async ({ notFoundPage, page }) => {
      await test.step('navigate to an unknown url', async () => {
        await notFoundPage.goto(path)
      })

      await test.step('displays not found page with one header and the correct title', async () => {
        await notFoundPage.hasPageContent()
      })

      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'Error - Page not found')
    })
  }

  // Run where the deployed-environment restriction makes switchboard return 404.
  test('Switchboard not found page @smoke', async ({ notFoundPage, page }) => {
    await test.step('navigate to the restricted switchboard page', async () => {
      await notFoundPage.goto('/switchboard')
    })

    await test.step('displays not found page with one header and the correct title', async () => {
      await notFoundPage.hasPageContent()
    })

    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'Error - Page not found')
  })
})
