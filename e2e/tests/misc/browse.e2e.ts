import { test } from '../../fixtures/app.fixture'

test('Browse page', async ({ browsePage, app }) => {
  await test.step('loads the page', async () => {
    await browsePage.goto()
  })
  await test.step('metadata is correct', async () => {
    await browsePage.hasMetadata()
  })
  await test.step('displays without any accessibility defects', async () => {
    await app.hasNoAccessibilityDefects()
  })
  await test.step('displays fallback menu', async () => {
    await browsePage.hasPageContent()
  })
  await test.step('confirms page against screenshot', async () => {
    await browsePage.hasScreenshot()
  })
})
