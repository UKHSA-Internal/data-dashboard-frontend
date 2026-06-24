import { test } from '../../fixtures/app.fixture'

// test.describe('Start page - when auth is disabled', () => {
//   if (process.env.AUTH_ENABLED !== 'false') {
//     return
//   }

//   //  test.use({ authEnabled: true })

//   test('Returns 404 when auth is disabled', async ({ notFoundPage }) => {
//     await notFoundPage.goto('/start')
//     await notFoundPage.hasPageContent()
//   })
// })

test.describe('Start page - logged out (normal initial state) @auth-ui', () => {
  test.use({ startLoggedOut: true })

  test('Shows logged-out state when not logged in', async ({ landingPage, aboutPage, authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await landingPage.goto()
    await authStartPage.checkIsLoggedOut()

    await aboutPage.goto()
    await authStartPage.checkIsLoggedOut()

    await authStartPage.goto()
    await authStartPage.isStartPage()
  })

  test('Page layout', async ({ authStartPage, app, authEnabled }) => {
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await authStartPage.goto()
    await app.hasLayout()
    await app.hasNoAccessibilityDefects()
    await app.hasBackToTop()
  })
})

// test('Does not show logout banner', async ({ authStartPage, authEnabled }) => {
//   test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
//   await authStartPage.goto()
//   await authStartPage.hasNoLogoutBanner()
// })

test('Displays classification banner', async ({ authStartPage, authEnabled }) => {
  test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
  await authStartPage.goto()
  // await authStartPage.hasClassificationBanner()
  await authStartPage.checkClassificationBannerContent()
})

test.describe('Start page - logged in', () => {
  test('Shows an avatar & sign out button in the navigation menu', async ({
    landingPage,
    authStartPage,
    authEnabled,
  }) => {
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await landingPage.goto()

    await authStartPage.checkIsLoggedIn()
    await authStartPage.checkSignOutButtonExists()
  })
})

test.describe('Start page - after logout (post-logout state) @auth-ui', () => {
  test.use({ startLoggedOut: true })

  test('Does not show regular page content when logout banner is present', async ({ authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await authStartPage.page.goto('/start?logout=success')
    await authStartPage.hasLogoutBanner()
    await authStartPage.hasNoMainHeading()
    await authStartPage.hasNoSignInAction()
  })
})

test.describe('Start page - after logout (post-logout state) - classification banner', () => {
  test.use({ startLoggedOut: true })

  test('Displays classification banner after logout', async ({ authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await authStartPage.page.goto('/start?logout=success')
    // await authStartPage.hasClassificationBanner()
    await authStartPage.checkClassificationBannerContent()
  })
})
