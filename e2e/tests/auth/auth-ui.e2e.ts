import { test } from '../../fixtures/app.fixture'

test.describe('Logged out', () => {
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
})

test.describe('Logged in', () => {
  test('Start page is not accessible when logged in', async ({ landingPage, authStartPage, authEnabled }) => {
    test.skip(!authEnabled, 'Skipping auth UI tests when auth is disabled')

    await authStartPage.goto()
    await authStartPage.redirectedDueToLoggedIn()

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
