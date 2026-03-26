import { Cookie, Page, test as base } from '@playwright/test'
import fs from 'fs'

type AuthSetupFixtures = {
  authEnabled: boolean
  authUserName: string
  setupAuth: void
  startLoggedOut: boolean
}

const MICROSOFT_LOGIN_HOST = 'login.microsoftonline.com'

const getHost = (urlString: string) => {
  try {
    return new URL(urlString).host
  } catch {
    return ''
  }
}

const isAllowedAuthHost = (urlString: string, hosts: string[]) => {
  const host = getHost(urlString)
  return hosts.some((allowedHost) => host === allowedHost || host.endsWith(`.${allowedHost}`))
}

async function signInViaMicrosoft(page: Page, username: string, password: string) {
  await page.getByRole('textbox', { name: /email|phone|skype/i }).fill(username)

  const nextButton = page.getByRole('button', { name: /^next$/i })
  if (await nextButton.isVisible().catch(() => false)) {
    await nextButton.click()
  } else {
    await page.locator('#idSIButton9').click()
  }

  await page.locator('input[name="passwd"]').fill(password)
  await page.locator('#idSIButton9').click()

  // "Stay signed in?" prompt is optional.
  const staySignedInNo = page.locator('#idBtn_Back')
  if (await staySignedInNo.isVisible().catch(() => false)) {
    await staySignedInNo.click()
  }
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
            return use()
          }
        } catch (error) {
          console.log('❌ Error reading storage state:', error)
        }
      }

      // Perform login if needed
      const username = process.env.PLAYWRIGHT_AUTH_USER_USERNAME || ''
      const password = process.env.PLAYWRIGHT_AUTH_USER_PASSWORD || ''
      const authDomainHost = getHost(process.env.AUTH_DOMAIN || '')
      const allowedAuthHosts = [authDomainHost, MICROSOFT_LOGIN_HOST].filter(Boolean)

      if (!username || !password) {
        throw new Error('Missing PLAYWRIGHT_AUTH_USER_USERNAME or PLAYWRIGHT_AUTH_USER_PASSWORD for auth-enabled tests')
      }

      if (allowedAuthHosts.length === 0) {
        throw new Error('AUTH_DOMAIN must be set to a valid URL for auth-enabled tests')
      }

      await page.goto('/start')
      await Promise.all([
        page.waitForURL((url) => isAllowedAuthHost(url.toString(), allowedAuthHosts), { timeout: 30000 }),
        page.getByRole('button', { name: 'Sign in' }).click(),
      ])

      const currentUrl = page.url()

      if (currentUrl.includes(MICROSOFT_LOGIN_HOST)) {
        await signInViaMicrosoft(page, username, password)
      } else {
        await page.keyboard.press('Tab')
        await page.keyboard.type(username)
        await page.keyboard.press('Tab')
        await page.keyboard.type(password)
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Enter')
      }

      // Wait until we return to the app domain after external auth redirects.
      await page.waitForURL((url) => url.host === getHost(process.env.baseURL || ''), { timeout: 30000 })

      // eslint-disable-next-line playwright/no-networkidle
      await page.waitForLoadState('networkidle')
      await page.context().storageState({ path: storagePath })

      await use()
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
