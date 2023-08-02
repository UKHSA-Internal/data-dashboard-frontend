import { test } from '../../fixtures/base.fixture'

test('Influenza page', async ({ influenzaPage, app }) => {
  await test.step('loads the page', async () => {
    await influenzaPage.goto()
  })
  await test.step('metadata is correct', async () => {
    await influenzaPage.hasMetadata()
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
