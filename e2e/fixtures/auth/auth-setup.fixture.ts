import { test as base } from '@playwright/test'

type AuthSetupFixtures = {
  authEnabled: boolean
  authUserName: string
  setupAuth: void
  startLoggedOut: boolean
}

// Mock session representing an authenticated user
// Shape matches what the FE expects from the session
const mockSession = {
  user: {
    sub: 'mock-user-123',
    email: 'test@ukhsa.gov.uk',
    name: process.env.PLAYWRIGHT_AUTH_USER_USERNAME ?? 'Test User',
    permissions: ['view:dashboard', 'view:reports'],
  },
  accessToken: 'mock-access-token',
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
}

export const AuthSetupFixtures = base.extend<AuthSetupFixtures>({
  authEnabled: async ({}, use) => {
    await use(process.env.AUTH_ENABLED === 'true')
  },

  authUserName: async ({}, use) => {
    await use(mockSession.user.name)
  },

  startLoggedOut: async ({}, use) => {
    await use(false)
  },

  setupAuth: [
    async ({ page, authEnabled, startLoggedOut }, use, testInfo) => {
      const logPrefix = `[auth setup] ${testInfo.titlePath.join(' > ')}`

      console.log(`${logPrefix}: start`, { authEnabled, startLoggedOut });

      if (!authEnabled || startLoggedOut) {
        console.log(`${logPrefix}: clearing cookies and skipping setup`);
        await page.context().clearCookies()
        return await use()
      }

      await page.route('**/api/auth/session', async (route) => {
        console.log(`${logPrefix}: intercepted /api/auth/session`);
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockSession),
        })
      })

      await page.route('**/oauth2/token', async (route) => {
        console.log(`${logPrefix}: intercepted /oauth2/token`);
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            access_token: mockSession.accessToken,
            token_type: 'Bearer',
            expires_in: 3600,
          }),
        })
      })

      // Inject session cookie
      await page.context().addCookies([
        {
          name: 'next-auth.session-token',
          value: 'mock-session-token',
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
        },
      ])

      console.log(`${logPrefix}: cookies injected`);

      const startedAt = Date.now();
      console.log(`${logPrefix}: goto /start begin`);

      const response = await page.goto('/start')

      console.log(`${logPrefix}: goto /start complete`, {
        elapsedTime: Date.now() - startedAt,
        status: response?.status(),
        url: page.url()
      });

      const networkStartedAt = Date.now();
      console.log(`${logPrefix}: networkidle begin`);

      await page.waitForLoadState('networkidle')

      console.log(`${logPrefix}: networkidle complete`, {
        elapsedTime: Date.now() - networkStartedAt,
        url: page.url()
      });

      await use()
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
