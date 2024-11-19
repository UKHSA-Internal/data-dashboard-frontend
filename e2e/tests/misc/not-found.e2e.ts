import { test } from '../../fixtures/app.fixture'

test.describe('Not found page', () => {
  test('Default layout', async ({ notFoundPage }) => {
    await test.step('navigate to an unknown url', async () => {
      await notFoundPage.goto('/some-non-existent-page')
    })
    await test.step('displays not found page', async () => {
      await notFoundPage.hasPageContent()
    })
  })

  test('Return to home page', async ({ notFoundPage, landingPage }) => {
    await test.step('navigate to an unknown url', async () => {
      await notFoundPage.goto('/some-non-existent-page')
    })
    await test.step('click the return to home link', async () => {
      await notFoundPage.clickReturnToHome()
    })
    await test.step('loads the home page', async () => {
      await landingPage.hasHeading()
      await landingPage.hasMetadata()
      await landingPage.hasWelcomeText()
    })
  })
})
