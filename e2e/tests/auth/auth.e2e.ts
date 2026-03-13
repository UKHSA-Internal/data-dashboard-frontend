import { test } from '../../fixtures/app.fixture'

const runIfAuthEnabled = async (authEnabled: boolean, run: () => Promise<void>) => {
  if (!authEnabled) return
  await run()
}

test.describe('Start page - when auth is disabled', () => {
  if (process.env.AUTH_ENABLED !== 'false') {
    return
  }

  test.use({ authEnabled: false })

  test('Returns 404 when auth is disabled', async ({ notFoundPage }) => {
    await notFoundPage.goto('/start')
    await notFoundPage.hasPageContent()
  })
})

test.describe('Start page - logged out (normal initial state)', () => {
  test.use({ startLoggedOut: true })

  test('Shows logged-out state when not logged in', async ({ landingPage, aboutPage, authStartPage, authEnabled }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await landingPage.goto()
      await authStartPage.checkIsLoggedOut()

      await aboutPage.goto()
      await authStartPage.checkIsLoggedOut()

      await authStartPage.goto()
      await authStartPage.isStartPage()
    })
  })

  test('Page layout', async ({ authStartPage, app, authEnabled }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await authStartPage.goto()
      await app.hasLayout()
      await app.hasNoAccessibilityDefects()
      await app.hasBackToTop()
    })
  })

  test('Displays page content', async ({ authStartPage, authEnabled }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await authStartPage.goto()
      await authStartPage.hasMainHeading()
      await authStartPage.hasSignInAction()
    })
  })

  test('Does not show logout banner', async ({ authStartPage, authEnabled }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await authStartPage.goto()
      await authStartPage.hasNoLogoutBanner()
    })
  })

  test('Displays classification banner', async ({ authStartPage, authEnabled }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await authStartPage.goto()
      await authStartPage.hasClassificationBanner()
      await authStartPage.checkClassificationBannerContent()
    })
  })
})

test.describe('Start page - logged in', () => {
  test('Start page is not accessible when logged in', async ({ landingPage, authStartPage, authEnabled }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await authStartPage.goto()
      await authStartPage.isRedirectedDueToLoggedIn()

      await landingPage.hasHeading()
      await landingPage.hasMetadata()
    })
  })

  test('Shows an avatar & sign out button in the navigation menu', async ({
    landingPage,
    authStartPage,
    authEnabled,
  }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await landingPage.goto()

      await authStartPage.checkIsLoggedIn()
      await authStartPage.checkSignOutButtonExists()
    })
  })

  test('Successfully signs out & redirects to start page', async ({ landingPage, authStartPage, authEnabled }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await landingPage.goto()

      await authStartPage.checkIsLoggedIn()
      await authStartPage.signOut()
      await authStartPage.checkIsLoggedOut()

      await authStartPage.isStartPage({ afterLogout: true })
      await authStartPage.checkSignOutBannerExists()
    })
  })
})

test.describe('Start page - after logout (post-logout state)', () => {
  test.use({ startLoggedOut: true })

  test('Does not show regular page content when logout banner is present', async ({ authStartPage, authEnabled }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await authStartPage.page.goto('/start?logout=success')
      await authStartPage.hasLogoutBanner()
      await authStartPage.hasNoMainHeading()
      await authStartPage.hasNoSignInAction()
    })
  })

  test('Displays classification banner after logout', async ({ authStartPage, authEnabled }) => {
    await runIfAuthEnabled(authEnabled, async () => {
      await authStartPage.page.goto('/start?logout=success')
      await authStartPage.hasClassificationBanner()
      await authStartPage.checkClassificationBannerContent()
    })
  })
})
