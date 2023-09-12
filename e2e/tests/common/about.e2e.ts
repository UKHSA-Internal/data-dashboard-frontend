import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test('About page', async ({ aboutPage, app }) => {
  await test.step('loads the page', async () => {
    await aboutPage.goto()
  })
  await test.step('metadata is correct', async () => {
    await aboutPage.hasMetadata()
  })
  await test.step('displays the correct layout', async () => {
    await app.hasLayout()
  })
  await test.step('displays without any accessibility defects', async () => {
    await app.hasNoAccessibilityDefects()
  })
  await test.step('displays last updated date', async () => {
    await aboutPage.hasLastUpdated()
  })
  await test.step('displays table of contents', async () => {
    await app.hasTableOfContents([
      'About the UKHSA data dashboard',
      'Using the dashboard',
      'Respiratory viruses',
      'Metrics',
      'Data availability',
      'Data sources',
    ])
  })
  await test.step('displays cms page content', async () => {
    await aboutPage.hasPageContent()
  })
  await test.step('displays related links', async () => {
    await app.hasRelatedLinks()
  })
  await test.step('displays back to top', async () => {
    await app.hasBackToTop()
  })
  await test.step('confirms page against screenshot', async () => {
    await aboutPage.hasScreenshot()
  })
})

test.describe('About page - mobile', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ aboutPage, app }) => {
    await aboutPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('About page - tablet', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ aboutPage, app }) => {
    await aboutPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('About page - desktop', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ aboutPage, app }) => {
    await aboutPage.goto()
    await app.hasDesktopNav()
  })
})
