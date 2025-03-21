import type { Cookie } from '@playwright/test'
import { expect, test as base } from '@playwright/test'
import fs from 'fs'

import type { Fixtures } from './app.fixture'
import { App } from './app.fixture'

type AuthFixtures = {
  authEnabled: boolean
  setupAuth: void
}

export const AuthFixtures = base.extend<AuthFixtures>({
  authEnabled: async ({}, use) => {
    const isAuthEnabled = process.env.AUTH_ENABLED === 'true'
    use(isAuthEnabled)
  },

  setupAuth: [
    async ({ page, authEnabled }, use) => {
      const storagePath = 'e2e/storage/auth.json'

      if (!authEnabled) return use()

      // Force clean login
      await page.evaluate(() => {
        localStorage.clear()
        sessionStorage.clear()
      })
      await page.context().clearCookies()

      if (fs.existsSync(storagePath)) {
        let storageState: { cookies: Cookie[]; origins: unknown[] } = { cookies: [], origins: [] }
        try {
          storageState = JSON.parse(fs.readFileSync(storagePath, 'utf-8'))
        } catch {
          console.warn('Warning: auth.json is empty or invalid. Forcing a new login.')
        }

        const cookies = storageState.cookies ?? []
        const hasValidSession = cookies.some(
          (cookie) => cookie.name.includes('authjs.session-token') && cookie.expires > Date.now() / 1000
        )

        if (hasValidSession) {
          console.log('Reusing existing valid auth session.')
          return use()
        }
      }

      console.log('No valid auth session found. Logging in...')
      await page.goto('/')
      await page.getByRole('button', { name: 'Sign in' }).click()

      const partialMatch = process.env.AUTH_DOMAIN
      await page.waitForURL(new RegExp(partialMatch), { timeout: 5000 })

      await page.locator('input[name="username"]').fill(process.env.PLAYWRIGHT_AUTH_USER_USERNAME || '')
      await page.locator('input[name="password"]').fill(process.env.PLAYWRIGHT_AUTH_USER_PASSWORD || '')
      await page.locator('button[type="submit"]').click()

      await page.context().storageState({ path: storagePath })

      console.log('Authentication session saved!')
      await use()
    },
    { auto: true },
  ],
})

export const test = AuthFixtures.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use(new App(page))
  },
})

export { expect }
