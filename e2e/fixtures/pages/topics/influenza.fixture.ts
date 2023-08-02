import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class InfluenzaPage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto('/topics/influenza')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/Influenza | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Influenza/, level: 1 })).toBeVisible()
  }
}
