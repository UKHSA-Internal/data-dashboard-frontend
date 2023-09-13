import { test } from '../../fixtures/app.fixture'

test('Accessibility Statement Page', async ({ accessibilityStatementPage }) => {
  await test.step('loads the page', async () => {
    await accessibilityStatementPage.goto()
  })
  await test.step('metadata is correct', async () => {
    await accessibilityStatementPage.hasMetadata()
  })
  await test.step('loads the heading', async () => {
    await accessibilityStatementPage.hasHeading()
  })
})

test('confirms page against screenshot @visual', async ({ accessibilityStatementPage, app }) => {
  await accessibilityStatementPage.goto()
  await app.compareVisualDifferences('accessibilityStatement')
})
