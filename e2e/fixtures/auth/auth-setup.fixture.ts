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
    async ({ page, authEnabled, startLoggedOut }, use) => {
      // For tests that should start logged out or when auth is disabled
      if (!authEnabled || startLoggedOut) {
        await page.context().clearCookies()
        return await use()
      }

      // Intercept next-auth session endpoint with mocked session
      await page.route('**/api/auth/session', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockSession),
        })
      })

      // Intercept Cognito token endpoint - no real calls needed
      await page.route('**/oauth2/token', async (route) => {
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

      // Inject session cookie so next-auth treats user as authenticated
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

      await use()
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
