import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class Covid19Page {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto('/topics/covid-19')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/COVID-19 | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /COVID-19/, level: 1 })).toBeVisible()
  }
}
