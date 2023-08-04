import { test } from '../../fixtures/app.fixture'

test('Feedback page', async ({ feedbackPage, app }) => {
  await test.step('loads the page', async () => {
    await feedbackPage.goto()
  })
  await test.step('metadata is correct', async () => {
    await feedbackPage.hasMetadata()
  })
  await test.step('displays heading', async () => {
    await feedbackPage.hasHeading()
  })
  await test.step('displays form question headings', async () => {
    await feedbackPage.hasPageContent()
  })
  await test.step('displays the correct layout', async () => {
    await app.hasLayout()
  })
  await test.step('displays without any accessibility defects', async () => {
    await app.hasNoAccessibilityDefects()
  })
  await test.step('allows form fill and successfully submits', async () => {
    await feedbackPage.submitsForm()
  })
})

test('Feedback confirmation page', async ({ feedbackConfirmationPage, app }) => {
  await test.step('loads the page', async () => {
    await feedbackConfirmationPage.goto()
  })
  await test.step('metadata is correct', async () => {
    await feedbackConfirmationPage.hasMetadata()
  })
  await test.step('displays heading', async () => {
    await feedbackConfirmationPage.hasHeading()
  })
  await test.step('has headings', async () => {
    await feedbackConfirmationPage.hasPageContent()
  })
  await test.step('displays the correct layout', async () => {
    await app.hasLayout()
  })
  // await test.step('displays without any accessibility defects', async () => {
  //   await app.hasNoAccessibilityDefects()
  // })
})