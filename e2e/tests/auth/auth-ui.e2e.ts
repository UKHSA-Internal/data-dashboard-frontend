import { test } from '../../fixtures/app.fixture'

test.describe(' Start page - when auth is disabled @auth-ui', () => {
  if (process.env.AUTH_ENABLED !== 'false') {
    return
  }

  test('Returns 404 when auth is disabled', async ({ notFoundPage }) => {
    await notFoundPage.goto('/start')
    await notFoundPage.hasPageContent()
  })
})

test.describe('Start page - logged out (normal initial state) @auth-ui', () => {
  test.use({ startLoggedOut: true })

  test('Shows logged-out state when not logged in', async ({ landingPage, aboutPage, authStartPage, authEnabled }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await landingPage.goto()
    await authStartPage.checkIsLoggedOut()

    await aboutPage.goto()
    await authStartPage.checkIsLoggedOut()

    await authStartPage.goto()
    await authStartPage.isStartPage()
    await authStartPage.checkIsLoggedOut()
    await authStartPage.checkSignInButtonExists()
  })

  test('Page layout', async ({ authStartPage, app, authEnabled }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await authStartPage.goto()
    await app.hasLayout()
    await app.hasNoAccessibilityDefects()
    await app.hasBackToTop()
  })
})

test('Start page is not accessible when logged in @auth-ui', async ({
  authStartPage,
  authEnabled,
}) => {
  test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')

  await authStartPage.goto()

  await authStartPage.isRedirectedDueToLoggedIn()
  // Need an acknowledgement page fixture?
})

test('Displays classification banner @auth-ui', async ({ authStartPage, authEnabled }) => {
  // Reason: All tests here are only relevant when auth has been enabled
  test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
  await authStartPage.goto()
  await authStartPage.hasClassificationBanner()
  await authStartPage.checkClassificationBannerContent()
})

test.describe('Start page - logged in @auth-ui', () => {
  test.use({ startLoggedOut: false })
  test('Shows an avatar & sign out button in the navigation menu', async ({
    landingPage,
    authStartPage,
    authEnabled,
  }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await landingPage.goto()

    await authStartPage.checkIsLoggedIn()
    await authStartPage.checkSignOutButtonExists()
  })

  test('Successfully signs out & redirects to start page @auth-ui', async ({
    landingPage,
    authStartPage,
    authEnabled,
  }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await landingPage.goto()

    await authStartPage.checkIsLoggedIn()
    await authStartPage.checkSignOutButtonExists()
    await authStartPage.signOut()
    await authStartPage.isStartPage()
    await authStartPage.checkIsLoggedOut()
    await authStartPage.checkSignInButtonExists()
    
  })  
})

test.describe('Start page - after logout (post-logout state) @auth-ui', () => {
  test.use({ startLoggedOut: true })

  test('Does not show regular page content when logout banner is present', async ({ authStartPage, authEnabled }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await authStartPage.page.goto('/start?logout=success')
    await authStartPage.hasLogoutBanner()
    await authStartPage.hasNoMainHeading()
    await authStartPage.hasNoSignInAction()
  })
})

test.describe('Start page - after logout (post-logout state) - classification banner @auth-ui', () => {
  test.use({ startLoggedOut: true })

  test('Displays classification banner after logout', async ({ authStartPage, authEnabled }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await authStartPage.page.goto('/start?logout=success')
    await authStartPage.hasClassificationBanner()
    await authStartPage.checkClassificationBannerContent()
  })
})
