import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class AccessibilityStatementPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/accessibility-statement')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('Accessibility Statement | UKHSA data dashboard')
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Accessibility statement/, level: 1 })).toBeVisible()
  }
}
