import { expect, test } from '../../fixtures/app.fixture'

test.describe(' Start page - when auth is disabled', () => {
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

test.describe('Authentication-only page metadata @auth-ui', () => {
  test.use({ startLoggedOut: true })

  const authenticationOnlyPages = [
    { path: '/start', heading: 'Sign in to the UKHSA data dashboard' },
    { path: '/acknowledgement', heading: 'Acknowledgement' },
    { path: '/authentication-error', heading: 'Failed to sign in' },
    { path: '/logged-out', heading: 'Logged out' },
  ]

  for (const { path, heading } of authenticationOnlyPages) {
    test(`${path} has noindex, nofollow metadata`, async ({ app, authEnabled }) => {
      // Reason: All tests here are only relevant when auth has been enabled
      test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')

      await app.goto(path)
      await app.hasHeading(heading)

      await app.hasRobotsMetadata('noindex, nofollow')
    })
  }
})

test.describe('Public and non-public page metadata @auth-ui', () => {
  test('Public-only pages do not have robots metadata', async ({ app, authEnabled }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')

    const publicPages = [
      { path: '/', title: 'UKHSA data dashboard' },
      { path: '/about', title: 'About | UKHSA data dashboard' },
      {
        path: '/metrics-documentation',
        title: 'Metrics documentation (page 1 of 6) | UKHSA data dashboard',
      },
    ]

    for (const { path, title } of publicPages) {
      await test.step(path, async () => {
        await app.goto(path)
        await app.hasDocumentTitle(title)
        await app.hasNoRobotsMetadata()
      })
    }
  })

  test('A public topic page does not have robots metadata', async ({ app, authEnabled, switchboardPage }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')

    await switchboardPage.setTopicPageIsPublic(true)
    await app.goto('/respiratory-viruses/covid-19')
    await app.hasDocumentTitle('COVID-19 | UKHSA data dashboard')

    await app.hasNoRobotsMetadata()
  })

  test('A non-public topic page has noindex, nofollow metadata', async ({ app, authEnabled, switchboardPage }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')

    await switchboardPage.setTopicPageIsPublic(false)
    await app.goto('/respiratory-viruses/covid-19')
    await app.hasDocumentTitle('COVID-19 | UKHSA data dashboard')

    await app.hasRobotsMetadata('noindex, nofollow')
  })
})

test('Start page is not accessible when logged in @auth-ui', async ({ authStartPage, authEnabled }) => {
  // Reason: All tests here are only relevant when auth has been enabled
  test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
  await authStartPage.goto()
  await authStartPage.isRedirectedDueToLoggedIn()
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

  test('Successfully signs out from sign-out page and redirects to site route @auth-ui', async ({
    page,
    authStartPage,
    authEnabled,
    baseURL,
  }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await page.goto('/auth/signout')

    await page.locator('main').getByRole('button', { name: 'Sign out' }).click()

    await expect(page).toHaveURL(new URL('/', baseURL).toString())
    await authStartPage.checkIsLoggedOut()
  })

  test('Successfully signs out after inactivity and redirects to logged-out page @auth-ui', async ({
    page,
    landingPage,
    authEnabled,
  }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await page.clock.install()
    await landingPage.goto()
    await page.waitForFunction(() => localStorage.getItem('lastActivity') !== null)

    await page.clock.runFor(4 * 60 * 1000 + 15 * 1000)

    await expect(page).toHaveURL(/\/logged-out\/?$/, { timeout: 15000 })
    await expect(page.getByRole('heading', { name: 'Logged out' })).toBeVisible()
    await expect(page.getByText('You have been automatically signed out')).toBeVisible()
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
