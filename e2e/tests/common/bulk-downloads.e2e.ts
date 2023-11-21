import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Bulk downloads', () => {
  test('Page layout', async ({ bulkDownloadsPage, app }) => {
    await test.step('loads the page', async () => {
      await bulkDownloadsPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await bulkDownloadsPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('does not display last updated date', async () => {
      await bulkDownloadsPage.hasNotLastUpdated()
    })
    await test.step('displays page content', async () => {
      await bulkDownloadsPage.hasPageContent()
    })
    await test.step('does not display back to top', async () => {
      await app.hasNotBackToTop()
    })
  })

  test('Downloads a bulk csv of all data', async ({ bulkDownloadsPage }) => {
    await test.step('loads the page', async () => {
      await bulkDownloadsPage.goto()
    })
    await test.step('downloads bulk csv', async () => {
      await bulkDownloadsPage.canBulkDownload()
    })
  })
})

test.describe('Bulk downloads - mobile', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ bulkDownloadsPage, app }) => {
    await bulkDownloadsPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Bulk downloads - tablet', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ bulkDownloadsPage, app }) => {
    await bulkDownloadsPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Bulk downloads - desktop', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ bulkDownloadsPage, app }) => {
    await bulkDownloadsPage.goto()
    await app.hasDesktopNav()
  })
})
