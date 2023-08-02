import { test } from '../../fixtures/base.fixture'

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
  await test.step('displays related links', async () => {
    await app.hasRelatedLinks()
  })
})
