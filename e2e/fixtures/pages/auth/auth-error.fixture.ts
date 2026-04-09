import { expect, Locator, type Page } from '@playwright/test'

export class AuthErrorPage {
  readonly page: Page
  readonly heading: Locator
  readonly errorLine: Locator
  readonly errorText: Locator
  readonly subText: Locator
  readonly backButton: Locator
  readonly errorBorder: Locator
  readonly relatedLinksSidebar: Locator
  readonly relatedLinksFooter: Locator
  readonly announcements: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = this.page.locator('main').getByRole('heading', { level: 1 })
    this.errorLine = this.page.locator('.text-red').first()
    this.errorText = this.page.locator('.border-l-red').locator('[data-testid="rich-text"]').first()
    this.subText = this.page.locator('main').locator('[data-testid="rich-text"]').nth(1)
    this.backButton = this.page.getByRole('link', { name: /back/i })
    this.errorBorder = this.page.locator('.border-l-\\[9px\\].border-l-red')
    this.relatedLinksSidebar = this.page.locator('.govuk-grid-column-one-quarter-from-desktop')
    this.relatedLinksFooter = this.page.locator('main > div:last-child')
    this.announcements = this.page.locator('[data-testid="announcements"]')
  }

  async goto(slug: string = 'authentication-error') {
    await this.page.goto(`/${slug}`)
  }

  async isAuthErrorPage(slug: string = 'authentication-error') {
    await expect(this.page).toHaveURL(new RegExp(`/${slug}/?$`))
  }

  async checkHeadingExists(expectedText: string) {
    await expect(this.heading).toBeVisible()
    await expect(this.heading).toHaveText(expectedText)
  }

  async checkErrorLineExists(expectedText: string) {
    await expect(this.errorLine).toBeVisible()
    await expect(this.errorLine).toHaveText(expectedText)
  }

  async checkErrorTextExists() {
    await expect(this.errorText).toBeVisible()
  }

  async checkSubTextExists() {
    await expect(this.subText).toBeVisible()
  }

  async checkBackButtonExists() {
    await expect(this.backButton).toBeVisible()
  }

  async checkBackButtonHasCorrectHref() {
    await expect(this.backButton).toHaveAttribute('href', '/start')
  }

  async clickBackButton() {
    await this.backButton.click()
  }

  async checkErrorBorderStyling() {
    await expect(this.errorBorder).toBeVisible()
    await expect(this.errorBorder).toHaveClass(/border-l-\[9px\]/)
    await expect(this.errorBorder).toHaveClass(/border-l-red/)
    await expect(this.errorBorder).toHaveClass(/pl-9/)
  }

  async checkRelatedLinksSidebarExists() {
    await expect(this.relatedLinksSidebar).toBeVisible()
  }

  async checkRelatedLinksSidebarNotExists() {
    await expect(this.relatedLinksSidebar).not.toBeVisible()
  }

  async checkRelatedLinksFooterExists() {
    const footerLinks = this.page.locator('[data-testid="related-links-footer"]')
    await expect(footerLinks).toBeVisible()
  }

  async checkRelatedLinksFooterNotExists() {
    const footerLinks = this.page.locator('[data-testid="related-links-footer"]')
    await expect(footerLinks).not.toBeVisible()
  }

  async checkAnnouncementsExist() {
    await expect(this.announcements).toBeVisible()
  }

  async checkAnnouncementsCount(expectedCount: number) {
    const announcements = this.page.locator('[role="alert"]')
    await expect(announcements).toHaveCount(expectedCount)
  }

  async hasMainContent() {
    await expect(this.page.locator('main')).toBeVisible()
  }

  async checkBackButtonIcon() {
    const svg = this.backButton.locator('svg')
    await expect(svg).toBeVisible()
    await expect(svg).toHaveAttribute('width', '20')
    await expect(svg).toHaveAttribute('height', '20')
  }

  async checkPageContainsText(text: string) {
    await expect(this.page.locator('main')).toContainText(text)
  }

  async checkRelatedLinksCount(count: number) {
    const links = this.page.locator('[data-testid*="related-links"] a')
    await expect(links).toHaveCount(count)
  }

  async clickRelatedLink(linkText: string) {
    await this.page.getByRole('link', { name: linkText }).click()
  }
}
