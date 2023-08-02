import { test } from '../../fixtures/base.fixture'

test('COVID-19 page', async ({ covid19Page, app }) => {
  await test.step('loads the page', async () => {
    await covid19Page.goto()
  })
  await test.step('metadata is correct', async () => {
    await covid19Page.hasMetadata()
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
