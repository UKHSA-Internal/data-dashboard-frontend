import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class OtherRespiratoryVirusesPage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto('/topics/other-respiratory-viruses')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/Other respiratory viruses | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Other respiratory viruses/, level: 1 })).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Wednesday, 10 May 2023 at 05:27pm/)).toBeVisible()
  }
}
