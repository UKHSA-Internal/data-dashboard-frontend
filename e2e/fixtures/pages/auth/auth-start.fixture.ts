import { expect, Locator, type Page } from '@playwright/test'

export class AuthStartPage {
  readonly page: Page
  readonly authEnabled: boolean
  readonly authUserName: string
  readonly menuLinkLoggedIn: Locator
  readonly menuLinkLoggedOut: Locator
  readonly signOutButton: Locator

  constructor(page: Page, authEnabled: boolean, authUserName: string) {
    this.page = page
    this.authEnabled = authEnabled
    this.authUserName = authUserName
    this.menuLinkLoggedIn = this.page.getByRole('link', {
      name: `Show navigation menu – Logged in as ${this.authUserName}`,
      exact: true,
      expanded: false,
    })
    this.menuLinkLoggedOut = this.page.getByRole('link', {
      name: `Show navigation menu`,
      exact: true,
      expanded: false,
    })
    this.signOutButton = this.page.getByRole('navigation', { name: 'Menu' }).getByRole('button', { name: 'Sign out' })
  }

  async goto() {
    await this.page.goto('/start')
  }

  async checkIsLoggedIn() {
    await expect(this.menuLinkLoggedIn).toBeVisible()
  }

  async checkIsLoggedOut() {
    await expect(this.menuLinkLoggedOut).toBeVisible()
  }

  async isStartPage({ afterLogout }: { afterLogout: boolean } | undefined = { afterLogout: false }) {
    if (afterLogout) {
      await expect(this.page.waitForURL('/start?logout=success')).toBeTruthy()
    } else {
      await expect(this.page.waitForURL('/start')).toBeTruthy()
    }
  }

  async redirectedDueToLoggedIn() {
    await expect(this.page.waitForURL('/')).toBeTruthy()
  }

  async checkSignOutButtonExists() {
    await this.menuLinkLoggedIn.click()
    await expect(this.signOutButton).toBeVisible()
  }

  async signOut() {
    await this.menuLinkLoggedIn.click()
    await this.signOutButton.click()
  }

  async checkSignOutBannerExists() {
    await expect(this.page.getByRole('alert', { name: 'Success' })).toMatchAriaSnapshot(`
     - alert "Success":
       - heading "Success" [level=2]
       - heading "You've been signed out" [level=3]
       - paragraph: You have successfully signed out of the UKHSA Data Dashboard. If you need to access the data again, please sign in.
    `)
  }
}
