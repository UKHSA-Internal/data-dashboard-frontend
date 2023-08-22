import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class AccessibilityStatement {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/accessibility-statement')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/Accessibility Statement | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Accessibility Statement/, level: 1 })).toBeVisible()
  }
}
