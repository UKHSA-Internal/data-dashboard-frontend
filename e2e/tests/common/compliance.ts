import { test } from '../../fixtures/app.fixture'

test('Compliance Page', async ({ compliancePage }) => {
  await test.step('loads the page', async () => {
    await compliancePage.goto()
  })
  await test.step('metadata is correct', async () => {
    await compliancePage.hasMetadata()
  })
  await test.step('loads the heading', async () => {
    await compliancePage.hasHeading()
  })
})

test('confirms page against screenshot @visual', async ({ compliancePage, app }) => {
  await compliancePage.goto()
  await app.compareVisualDifferences('compliance')
})
