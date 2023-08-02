import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class AboutPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/about')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/About | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /About/, level: 1 })).toBeVisible()
  }
}
