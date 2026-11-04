import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class NotFoundPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(url: string) {
    const response = await this.page.goto(url)
    expect(response?.status()).toBe(404)
  }

  async hasPageContent() {
    await expect(
      this.page.getByRole('heading', {
        level: 1,
        name: 'Page not found',
      })
    ).toBeVisible()

    // Check that exactly one site header is rendered.
    const header = this.page.locator('header.govuk-header')
    await expect(header).toHaveCount(1)
    await expect(header).toBeVisible()

    // Check that there is one document title with the correct 404 text.
    await expect(this.page.locator('head > title')).toHaveCount(1)
    await expect(this.page).toHaveTitle('Page Not Found | UKHSA Data Dashboard')
  }

  async clickReturnToHome() {
    await this.page.getByRole('link', { name: 'Return to home page' }).click()
  }
}
