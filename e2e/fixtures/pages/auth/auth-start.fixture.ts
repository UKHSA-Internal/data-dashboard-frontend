import { expect, Locator, type Page } from '@playwright/test'

export class AuthStartPage {
  readonly page: Page
  readonly authEnabled: boolean
  readonly authUserName: string
  readonly signOutButton: Locator
  readonly logoutBanner: Locator

  constructor(page: Page, authEnabled: boolean, authUserName: string) {
    this.page = page
    this.authEnabled = authEnabled
    this.authUserName = authUserName
    this.signOutButton = this.page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('button', { name: 'Sign out' })
    this.logoutBanner = this.page.locator('.govuk-notification-banner--success')
  }

  async goto() {
    await this.page.goto('/start')
  }

  async checkIsLoggedIn() {
    await expect(this.page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  }

  async checkIsLoggedOut() {
    // await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Sign out' })).toBeHidden()
    console.log("aftercheckloggedout🦄🦄🦄", this.page.url())
    // expect(this.signOutButton).toBeHidden()
  }

  async isStartPage({ afterLogout }: { afterLogout: boolean } | undefined = { afterLogout: false }) {
    if (afterLogout) {
      await expect(this.page).toHaveURL(/\/start\/?\?logout=success$/)
    } else {
      await expect(this.page).toHaveURL(/\/start\/?$/)
    }
  }

  async isRedirectedDueToLoggedIn() {
    await expect(this.page).toHaveURL(/\/acknowledgement\/?$/)
  }

  async checkSignOutButtonExists() {
    await expect(this.page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  }

  async signOut() {
    const signOutButton = this.page.getByRole('button', {name: 'sign out'})
    await expect(signOutButton).toBeVisible()
    console.log('Enabled:', await signOutButton.isEnabled())

    console.log("signout🦄🦄🦄", this.page.url())
    await this.page.getByRole('button', { name: 'Sign out' }).click()
    await this.page.waitForLoadState('networkidle');
    // await this.page.goto('/fakeclick')
    console.log("signoutafter🦄🦄🦄", this.page.url())
  }

  async checkSignOutBannerExists() {
    await expect(this.page.getByRole('alert', { name: 'Success' })).toMatchAriaSnapshot(`
     - alert "Success":
       - heading "Success" [level=2]
       - heading "You've been signed out" [level=3]
       - paragraph: You have successfully signed out of the UKHSA Data Dashboard. If you need to access the data again, please sign in.
    `)
  }

  async hasLogoutBanner() {
    await expect(this.logoutBanner).toHaveCount(1)
  }

  async hasNoLogoutBanner() {
    await expect(this.logoutBanner).toHaveCount(0)
  }

  async hasMainHeading() {
    await expect(this.page.locator('main').getByRole('heading', { level: 1 })).toHaveCount(1)
  }

  async hasNoMainHeading() {
    await expect(this.page.locator('main').getByRole('heading', { level: 1 })).toHaveCount(0)
  }

  async hasSignInAction() {
    await expect(this.page.locator('main').locator('button[type="submit"]')).toHaveCount(1)
  }

  async hasNoSignInAction() {
    await expect(this.page.locator('main').locator('button[type="submit"]')).toHaveCount(0)
  }

  async hasClassificationBanner() {
    await expect(this.page.getByRole('note', { name: 'Official-Sensitive classification' }).first()).toBeVisible()
  }

  async checkClassificationBannerContent() {
    const banner = this.page.getByRole('note', { name: 'Official-Sensitive classification' }).first()
    await expect(banner).toContainText('Official-Sensitive')
  }
}
