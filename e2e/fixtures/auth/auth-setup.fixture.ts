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

      // For tests that should start logged out or when auth is disabled
      if (!authEnabled || startLoggedOut) {
        await page.context().clearCookies()
        return await use()
      }

      // Try to restore auth state from storage
      if (fs.existsSync(storagePath)) {
        try {
          const storageState = JSON.parse(fs.readFileSync(storagePath, 'utf-8'))
          const cookies = (storageState.cookies as Cookie[]) || []

          if (cookies.length > 0) {
            await page.context().addCookies(cookies)
            return await use()
          }
        } catch (error) {
          console.log('❌ Error reading storage state:', error)
        }
      }

      // Perform login if needed
      await page.goto('/')
      await page.getByRole('button', { name: 'Start now' }).click()
      await page.waitForURL(new RegExp(process.env.AUTH_DOMAIN || ''), { timeout: 5000 })

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

      await use()
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
