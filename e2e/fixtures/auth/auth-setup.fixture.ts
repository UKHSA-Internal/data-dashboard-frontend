import { Cookie, test as base } from '@playwright/test'
import fs from 'fs'

type AuthSetupFixtures = {
  authEnabled: boolean
  authUserName: string
  setupAuth: void
  startLoggedOut: boolean
}

export const AuthSetupFixtures = base.extend<AuthSetupFixtures>({
  authEnabled: async ({}, use) => {
    const isAuthEnabled = process.env.AUTH_ENABLED === 'true'
    await use(isAuthEnabled)
  },

  authUserName: async ({}, use) => {
    await use(process.env.PLAYWRIGHT_AUTH_USER_USERNAME)
  },

  startLoggedOut: async ({}, use) => {
    await use(false) // Default to logged in state
  },

  setupAuth: [
    async ({ page, authEnabled, startLoggedOut }, use) => {
      const storagePath = 'e2e/storage/auth.json'

      // If auth is disabled or we want to start logged out, clear any existing auth state
      if (!authEnabled || startLoggedOut) {
        if (fs.existsSync(storagePath)) {
          fs.unlinkSync(storagePath)
        }
        return await use()
      }

      // Check if auth session exists and is still valid
      if (fs.existsSync(storagePath)) {
        const storageState = JSON.parse(fs.readFileSync(storagePath, 'utf-8'))
        const cookies = (storageState.cookies as Cookie[]) || []
        const hasValidSession = cookies.some(
          (cookie) => cookie.name.includes('authjs.session-token') && cookie.expires > Date.now() / 1000
        )

        if (hasValidSession) {
          return await use()
        }
      }

      console.log('🔐 No valid auth session found. Logging in...')
      await page.goto('/')

      // Dashboard Sign in link
      await page.getByRole('button', { name: 'Start now' }).click({ timeout: 10000 })

      const partialMatch = process.env.AUTH_DOMAIN
      await page.waitForURL(new RegExp(partialMatch), { timeout: 5000 })

      // Cognito UI
      // The hosted sign in form has multiple elements with the same id on the page for different viewports.
      // The only way to select the correct element is via keyboard!
      await page.keyboard.press('Tab')
      await page.keyboard.type(process.env.PLAYWRIGHT_AUTH_USER_USERNAME || '')

      await page.keyboard.press('Tab')
      await page.keyboard.type(process.env.PLAYWRIGHT_AUTH_USER_PASSWORD || '')

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')

      // eslint-disable-next-line playwright/no-networkidle
      await page.waitForLoadState('networkidle')

      await page.context().storageState({ path: storagePath })

      console.log('✅ Authentication session saved!')
      await use()
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
