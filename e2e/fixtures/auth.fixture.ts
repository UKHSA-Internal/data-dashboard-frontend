import { Cookie, test as base } from '@playwright/test'
import fs from 'fs'

type AuthFixtures = {
  authEnabled: boolean
  setupAuth: void
}

export const AuthFixtures = base.extend<AuthFixtures>({
  authEnabled: async ({}, use) => {
    const isAuthEnabled = process.env.AUTH_ENABLED === 'true'
    await use(isAuthEnabled)
  },

  setupAuth: [
    async ({ page, authEnabled }, use) => {
      const storagePath = 'e2e/storage/auth.json'

      if (!authEnabled) {
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
      await page.getByRole('button', { name: 'Sign in' }).click({ timeout: 10000 })

      const partialMatch = process.env.AUTH_DOMAIN
      await page.waitForURL(new RegExp(partialMatch), { timeout: 5000 })

      // Cognito UI - OOTB hosted sign in form has multiple elements with the same id on the page! Make sure to select the first found elements
      await page
        .locator('#signInFormUsername')
        .first()
        .fill(process.env.PLAYWRIGHT_AUTH_USER_USERNAME || '')
      await page
        .locator('#signInFormPassword')
        .first()
        .fill(process.env.PLAYWRIGHT_AUTH_USER_PASSWORD || '')
      await page.getByRole('button', { name: 'submit' }).first().click()
      await page.context().storageState({ path: storagePath })

      console.log('✅ Authentication session saved!')
      await use()
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
