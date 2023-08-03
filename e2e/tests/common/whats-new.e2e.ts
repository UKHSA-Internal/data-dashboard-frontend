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
