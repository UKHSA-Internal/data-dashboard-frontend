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
    name: process.env.MOCK_SESSION_USERNAME ?? 'Test User',
    permissions: [],
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
      // let isLoggedIn = true
      console.log("🐞made it")
      page.on('request', request => {
      console.log('➡️ REQUEST', request.method(), request.url())
      })

      page.on('response', response => {
        console.log('⬅️ RESPONSE', response.status(), response.url())
      })

      page.on('framenavigated', frame => {
        console.log('🌍 NAVIGATED', frame.url())
      })

      page.on('response', async response => {
        if (response.status() >= 500) {
          console.log('💥 FAILING URL', response.url())
        }
      })

      if (!authEnabled || startLoggedOut) {
        await page.context().clearCookies()
        return await use()
      }

      await page.route('**/*', async (route) => {
        
        const requestUrl = route.request().url()
        // console.log("💥requestUrl", requestUrl)
        if (requestUrl.includes("/logout"))
          {
            console.log("⭐️")
            await route.fulfill({
            status: 302,
            headers: {
              location: '/start?logout=success',
            },
          })
          console.log("🦄🦄🦄", page.url())
          console.log("🦄🦄🦄", route.request().url())
        }

        await route.fallback()

      })

      await page.route('**/api/auth/session', async (route) => {
        console.log('🔥 returning authenticated session')
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockSession),
        })
      })

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

      await page.route('**/revoke', async route => {
        console.log('🔓 mocked revoke');

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({}),
        });
      });

      await page.route('**/oauth2/revoke', async route => {
        console.log('🔓 mocked oauth2 revoke');

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({}),
        });
      });

      await page.route('**/*revoke*', async route => {
        console.log('🔓 revoke call:', route.request().url());

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: '{}',
        });
      });


      // Inject an Auth.js session cookie so server components using `auth()` see a logged-in session.
      const secureCookie = process.env.NEXTAUTH_URL?.startsWith('https://') ?? false
      const sessionCookieName = secureCookie ? '__Secure-authjs.session-token' : 'authjs.session-token'

      const { encode } = await import('next-auth/jwt')
      const timeInSeconds = Math.floor(Date.now() / 1000)
      const expiresAt = timeInSeconds + 60 * 60 // 1 hour

      const sessionToken = await encode({
        secret: process.env.AUTH_SECRET!,
        salt: sessionCookieName,
        token: {
          name: mockSession.user.name,
          email: mockSession.user.email,
          sub: mockSession.user.sub,
          access_token: mockSession.accessToken,
          refresh_token: 'mock-refresh-token',
          expires_at: expiresAt,
          user_id: mockSession.user.sub,
          exp: expiresAt,
        },
      })

      const domain = (() => {
        try {
          return new URL(process.env.baseURL || 'http://localhost:3000').hostname
        } catch {
          return 'localhost'
        }
      })()

      await page.context().addCookies([
        {
          name: sessionCookieName,
          value: sessionToken,
          domain,
          path: '/',
          httpOnly: true,
          secure: secureCookie,
          sameSite: 'Lax',
        },
      ])

      console.log("🐞made it to start")
      await page.goto('/start')
      await page.waitForLoadState('networkidle')
      
      console.log("🐞made it to use")
      await use()
      console.log("🐞made it past use")
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
