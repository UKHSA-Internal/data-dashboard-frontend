import { test } from '../../fixtures/app.fixture'

test.describe('Mega Menu', () => {
  test.describe('Feature flag is enabled', () => {
    test.beforeEach(async ({ switchboardPage }) => {
      await switchboardPage.setFeatureFlag('megaMenu', 'Enabled')
    })

    test('Hides the Side Navigation @desktop', async ({ app, homePage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto()
      })
      await test.step('Check Side Navigation is hidden', async () => {
        await app.hasNotDesktopNav()
      })
    })
  })

  test.describe('Feature flag is disabled', () => {
    test.beforeEach(async ({ switchboardPage }) => {
      await switchboardPage.setFeatureFlag('megaMenu', 'Disabled')
    })

    test('Shows the Side Navigation @desktop', async ({ app, homePage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto()
      })
      await test.step('Check Side Navigation is visible', async () => {
        await app.hasDesktopNav()
      })
    })
  })
})
