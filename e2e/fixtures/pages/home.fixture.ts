import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class HomePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/Respiratory Viruses | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Respiratory viruses/, level: 1 })).toBeVisible()
  }

  async hasNotLastUpdated() {
    await expect(this.page.getByText(/Last updated/)).not.toBeVisible()
  }
}
