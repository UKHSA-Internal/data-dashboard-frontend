import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Archive data download', () => {
  test('Page layout', async ({ archiveDataPage, app }) => {
    await test.step('loads the page', async () => {
      await archiveDataPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await archiveDataPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('displays last updated date', async () => {
      await archiveDataPage.hasLastUpdated()
    })
    await test.step('displays cms page content', async () => {
      await archiveDataPage.hasPageContent()
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })
})

test.describe('Archive data download - no JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('Page layout', async ({ archiveDataPage, app }) => {
    await test.step('loads the page', async () => {
      await archiveDataPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await archiveDataPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays last updated date', async () => {
      await archiveDataPage.hasLastUpdated()
    })
    await test.step('displays cms page content', async () => {
      await archiveDataPage.hasPageContent()
    })
  })
})

test.describe('Archive data download - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ archiveDataPage, app }) => {
    await archiveDataPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Archive data download - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ archiveDataPage, app }) => {
    await archiveDataPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Archive data download - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ archiveDataPage, app }) => {
    await archiveDataPage.goto()
    await app.hasDesktopNav()
  })
})

test.describe('Archive data download @smoke tests', () => {
  test('displays all download links', async ({ archiveDataPage }) => {
    const downloadHrefs = [
      'https://archive.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/covid-19-archive.zip',
      'https://archive.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/cases.zip',
      'https://archive.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/deaths.zip',
      'https://archive.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/healthcare.zip',
      'https://archive.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/vaccinations.zip',
      'https://archive.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/testing.zip',
    ]

    await archiveDataPage.goto()
    for (const href of downloadHrefs) {
      await archiveDataPage.hasDownloadLinkByHref(href)
    }
  })
})
