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
    await expect(this.page).toHaveTitle(/Compliance statement | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Compliance statement/, level: 1 })).toBeVisible()
  }
}
