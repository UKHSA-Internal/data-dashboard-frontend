import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class InfluenzaPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/topics/influenza')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/Influenza | UKHSA data dashboard/)
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Detailed summary of Influenza in circulation within the UK'
    )
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Influenza/, level: 1 })).toBeVisible()
  }

  async hasDescription() {
    await expect(this.page.getByText('Data and insights from the UKHSA on Influenza.')).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'See the simple summary for England (opens in a new tab)' })
    ).toHaveAttribute('href', 'https://www.gov.uk/government/organisations/uk-health-security-agency\\')
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Monday, 15 May 2023 at 04:26pm/)).toBeVisible()
  }
}
