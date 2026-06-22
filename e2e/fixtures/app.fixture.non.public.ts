import { expect, Locator, Page } from '@playwright/test'

import { AuthSetupFixtures } from './auth/auth-setup.fixture'
import { AuthStartPage, LandingPage, SitemapPage, SwitchboardPage } from './index'

type Fixtures = {
  app: App
  authStartPage: AuthStartPage
  sitemapPage: SitemapPage
  switchboardPage: SwitchboardPage
  landingPage: LandingPage
}

export class App {
  readonly page: Page
  readonly header: Locator
  readonly nav: Locator
  readonly sideNav: Locator
  readonly authEnabled: boolean
  readonly authUserName: string
  readonly menuLinkClosed: Locator
  readonly menuLinkOpen: Locator

  constructor(page: Page, authEnabled: boolean, authUserName: string) {
    this.page = page
    this.header = this.page.getByRole('banner')
    this.nav = this.page.getByRole('navigation', { name: 'Menu' })
    this.sideNav = this.page.getByRole('navigation', { name: 'Side navigation' })
    this.authEnabled = authEnabled
    this.authUserName = authUserName
    this.menuLinkClosed = this.page.getByRole('link', {
      name: this.authEnabled ? `Show navigation menu – Logged in as ${this.authUserName}` : 'Show navigation menu',
      exact: true,
      expanded: false,
    })
    this.menuLinkOpen = this.page.getByRole('link', {
      name: this.authEnabled ? `Hide navigation menu – Logged in as ${this.authUserName}` : 'Hide navigation menu',
      exact: true,
      expanded: true,
    })
  }

  async hasHeading(name: string) {
    await expect(this.page.getByRole('heading', { name, level: 1 })).toBeVisible()
  }

  async waitForPageLoaded() {
    await this.page.waitForFunction(() => document.body.className.includes('js-enabled'), undefined, { timeout: 5000 })
  }

  async clickNav(name: string) {
    await expect(this.page.getByRole('link', { name: 'Menu', expanded: false })).toBeVisible()
    await this.page.getByRole('link', { name: 'Show navigation menu', expanded: false }).click()
    const nav = this.page.getByRole('navigation', { name: 'Menu' })
    await expect(nav).toBeVisible()
    await nav.getByRole('link', { name }).click()
  }

  async clickBrowseNav(name: string) {
    await this.page.getByRole('link', { name: 'Show navigation menu', expanded: false }).click()
    await expect(this.page.getByRole('heading', { name: 'Browse', level: 1 })).toBeVisible()
    await this.page.getByRole('link', { name }).click()
  }

  async hasClassificationBanner() {
    await expect(this.page.getByRole('note', { name: 'Official-Sensitive classification'}).first()).toBeVisible()
  }

  async hasNoClassificationBanner() {
    await expect(this.page.getByRole('note', { name: 'Official-Sensitive classification'})).toHaveCount(0)
  }

  async checkClassificationBannerContent() {
    const banner = this.page.locator('div.govuk-classification-banner')
    await expect(banner).toContainText('Official-Sensitive')
  }
}

export const test = AuthSetupFixtures.extend<Fixtures>({
  app: async ({ page, authEnabled, authUserName }, use) => {
    await use(new App(page, authEnabled, authUserName))
  },
  authStartPage: async ({ page, authEnabled, authUserName }, use) => {
    await use(new AuthStartPage(page, authEnabled, authUserName))
  },
  switchboardPage: async ({ page }, provide) => {
    await provide(new SwitchboardPage(page))
  },
  sitemapPage: async ({ page }, use) => {
    await use(new SitemapPage(page))
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page))
  },
})

export { expect } from '@playwright/test'
