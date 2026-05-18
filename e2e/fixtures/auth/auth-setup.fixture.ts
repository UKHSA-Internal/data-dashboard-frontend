import { test as base } from '@playwright/test'

// 1. Define SessionShape type
export type SessionShape = 'admin' | 'standard' | 'restricted'

// 2. Define mock sessions as a Record keyed by SessionShape
const mockSessions: Record<
  SessionShape,
  { user: { sub: string; email: string; name: string; permissions: string[] }; accessToken: string; expires: string }
> = {
  standard: {
    user: {
      sub: 'mock-user-123',
      email: 'test@ukhsa.gov.uk',
      name: process.env.PLAYWRIGHT_AUTH_USER_USERNAME ?? 'Test User',
      permissions: ['view:dashboard', 'view:reports'],
    },
    accessToken: 'mock-access-token',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  admin: {
    user: {
      sub: 'admin-user-123',
      email: 'admin@ukhsa.gov.uk',
      name: 'Admin User',
      permissions: ['view:dashboard', 'view:reports', 'manage:users', 'manage:settings'],
    },
    accessToken: 'mock-admin-access-token',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  restricted: {
    user: {
      sub: 'restricted-user-123',
      email: 'restricted@ukhsa.gov.uk',
      name: 'Restricted User',
      permissions: [],
    },
    accessToken: 'mock-restricted-access-token',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
}

type AuthSetupFixtures = {
  authEnabled: boolean
  authUserName: string
  setupAuth: void
  startLoggedOut: boolean
  sessionShape: SessionShape
}

export const AuthSetupFixtures = base.extend<AuthSetupFixtures>({
  // 3. Default session shape
  sessionShape: async ({}, use) => {
    await use('standard')
  },

  authEnabled: async ({}, use) => {
    await use(process.env.AUTH_ENABLED === 'true')
  },

  // 4. Use sessionShape to get the correct name
  authUserName: async ({ sessionShape }, use) => {
    await use(mockSessions[sessionShape].user.name)
  },

  startLoggedOut: async ({}, use) => {
    await use(false)
  },

  setupAuth: [
    // 5. Destructure sessionShape in params
    async ({ page, authEnabled, startLoggedOut, sessionShape }, use) => {
      if (!authEnabled || startLoggedOut) {
        await page.context().clearCookies()
        return await use()
      }

      // 6. Now correctly indexes mockSessions
      const mockSession = mockSessions[sessionShape]

      await page.context().route('**/api/auth/session', async (route) => {
        console.log('Auth route hit:', route.request().url())
        console.log('✅ Session intercepted')
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockSession),
        })
      })

      await page.context().route('**/oauth2/token', async (route) => {
        console.log('Auth route hit:', route.request().url())
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            access_token: mockSession.accessToken, // use mockSession not mockSessions
            token_type: 'Bearer',
            expires_in: 3600,
          }),
        })
      })

      await page.context().route('**/.well-known/openid-configuration', async (route) => {
        console.log('Auth route hit:', route.request().url())
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            issuer: process.env.AUTH_DOMAIN,
            token_endpoint: `${process.env.AUTH_DOMAIN}/oauth2/token`,
            authorization_endpoint: `${process.env.AUTH_DOMAIN}/oauth2/authorize`,
          }),
        })
      })

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
