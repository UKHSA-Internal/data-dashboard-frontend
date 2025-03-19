import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class InfluenzaPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/respiratory-viruses/influenza')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('Influenza | UKHSA data dashboard')
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Detailed summary of Influenza in circulation within the UK'
    )
  }

  async hasHeading(heading?: string) {
    await expect(this.page.getByRole('heading', { name: heading ?? /Influenza/, level: 1 })).toBeVisible()
  }

  async hasDescription() {
    await expect(this.page.getByText('Data and insights from the UKHSA on Influenza.')).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'See the simple summary for England (opens in a new tab)' })
    ).toHaveAttribute('href', 'https://www.gov.uk/government/organisations/uk-health-security-agency\\')
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Tuesday, 2 July 2024 at 12:44pm/)).toBeVisible()
  }
}
