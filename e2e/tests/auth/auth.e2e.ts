import { test } from '../../fixtures/app.fixture'

test.describe('Start page - when auth is disabled', () => {
  test.use({ authEnabled: false })

  test('Returns 404 when auth is disabled', async ({ authStartPage }) => {
    await authStartPage.goto()
    await authStartPage.page.waitForURL('**/404')
  })
})

test.describe('Start page - logged out (normal initial state)', () => {
  test.use({ startLoggedOut: true })

  test('Redirects to start page when not logged in', async ({ landingPage, aboutPage, authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await landingPage.goto()
    await authStartPage.checkIsLoggedOut()
    await authStartPage.isStartPage()

    await aboutPage.goto()
    await authStartPage.checkIsLoggedOut()
    await authStartPage.isStartPage()
  })

  test('Page layout', async ({ authStartPage, app, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await authStartPage.goto()
    await app.hasLayout()
    await app.hasNoAccessibilityDefects()
    await app.hasBackToTop()
  })

  test('Displays page content', async ({ authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await authStartPage.goto()
    await authStartPage.hasMainHeading()
    await authStartPage.hasSignInAction()
  })

  test('Does not show logout banner', async ({ authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await authStartPage.goto()
    await authStartPage.hasNoLogoutBanner()
  })

  test('Displays classification banner', async ({ authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await authStartPage.goto()
    await authStartPage.hasClassificationBanner()
    await authStartPage.checkClassificationBannerContent()
  })
})

test.describe('Start page - logged in', () => {
  test('Start page is not accessible when logged in', async ({ landingPage, authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await authStartPage.goto()
    await authStartPage.isRedirectedDueToLoggedIn()

    await landingPage.hasHeading()
    await landingPage.hasMetadata()
  })

  test('Shows an avatar & sign out button in the navigation menu', async ({
    landingPage,
    authStartPage,
    authEnabled,
  }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await landingPage.goto()

    await authStartPage.checkIsLoggedIn()
    await authStartPage.checkSignOutButtonExists()
  })

  test('Successfully signs out & redirects to start page', async ({ landingPage, authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await landingPage.goto()

    await authStartPage.checkIsLoggedIn()
    await authStartPage.signOut()
    await authStartPage.checkIsLoggedOut()

    await authStartPage.isStartPage({ afterLogout: true })
    await authStartPage.checkSignOutBannerExists()
  })
})

test.describe('Start page - after logout (post-logout state)', () => {
  test.use({ startLoggedOut: true })

  test('Does not show regular page content when logout banner is present', async ({ authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await authStartPage.page.goto('/start?logout=success')
    await authStartPage.hasLogoutBanner()
    await authStartPage.hasNoMainHeading()
    await authStartPage.hasNoSignInAction()
  })

  test('Displays classification banner after logout', async ({ authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await authStartPage.page.goto('/start?logout=success')
    await authStartPage.hasClassificationBanner()
    await authStartPage.checkClassificationBannerContent()
  })
})
