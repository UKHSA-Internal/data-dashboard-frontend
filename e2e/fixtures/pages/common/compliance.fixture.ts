import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class CompliancePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/compliance')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('Compliance | UKHSA data dashboard')
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Compliance/, level: 1 })).toBeVisible()
  }
}
