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
    await expect(this.page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
  }

  async clickReturnToHome() {
    await this.page.getByRole('link', { name: 'Return to home page' }).click()
  }
}
