import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test("What's new page", async ({ whatsNewPage, app }) => {
  await test.step('loads the page', async () => {
    await whatsNewPage.goto()
  })
  await test.step('metadata is correct', async () => {
    await whatsNewPage.hasMetadata()
  })
  await test.step('displays the correct layout', async () => {
    await app.hasLayout()
  })
  await test.step('displays without any accessibility defects', async () => {
    await app.hasNoAccessibilityDefects()
  })
  await test.step('displays last updated date', async () => {
    await whatsNewPage.hasLastUpdated()
  })
  await test.step('displays table of contents', async () => {
    await app.hasTableOfContents(['March 2023', 'February 2023'])
  })
  await test.step('displays cms page content', async () => {
    await whatsNewPage.hasPageContent()
  })
  await test.step('displays related links', async () => {
    await app.hasRelatedLinks()
  })
  await test.step('displays back to top', async () => {
    await app.hasBackToTop()
  })
})

test.describe("What's new page - mobile", () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ whatsNewPage, app }) => {
    await whatsNewPage.goto()
    await app.hasMobileNav()
  })
})

test.describe("What's new page - tablet", () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ whatsNewPage, app }) => {
    await whatsNewPage.goto()
    await app.hasMobileNav()
  })
})

test.describe("What's new page - desktop", () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ whatsNewPage, app }) => {
    await whatsNewPage.goto()
    await app.hasDesktopNav()
  })
})
