import { test } from '../../fixtures/app.fixture'

test('Feedback page', async ({ feedbackPage, app }) => {
  await test.step('Loads the page', async () => {
    await feedbackPage.goto()
  })

  await test.step('Metadata is correct', async () => {
    await feedbackPage.hasMetadata()
  })

  await test.step('Displays heading', async () => {
    await feedbackPage.hasHeading()
  })

  await test.step('Has headings', async () => {
    await feedbackPage.hasPageContent()
  })

  await test.step('displays the correct layout', async () => {
    await app.hasLayout()
  })
  await test.step('displays without any accessibility defects', async () => {
    await app.hasNoAccessibilityDefects()
  })
})

test('Feedback confirmation page', async ({ feedbackConfirmationPage, app }) => {
  await test.step('Loads the page', async () => {
    await feedbackConfirmationPage.goto()
  })

  await test.step('Metadata is correct', async () => {
    await feedbackConfirmationPage.hasMetadata()
  })

  await test.step('Displays heading', async () => {
    await feedbackConfirmationPage.hasHeading()
  })

  await test.step('Has headings', async () => {
    await feedbackConfirmationPage.hasPageContent()
  })

  await test.step('displays the correct layout', async () => {
    await app.hasLayout()
  })

  await test.step('displays without any accessibility defects', async () => {
    await app.hasNoAccessibilityDefects()
  })
})
