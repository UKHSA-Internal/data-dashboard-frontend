import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class WhatsNewPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/whats-new')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/What's new | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /What's new/, level: 1 })).toBeVisible()
  }
}
