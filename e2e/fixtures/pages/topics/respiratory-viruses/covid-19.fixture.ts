import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class Covid19Page {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/respiratory-viruses/covid-19')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('COVID-19 | UKHSA data dashboard')
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Overall summary of COVID-19 in circulation within the UK'
    )
  }

  async hasHeading(heading?: string) {
    await expect(this.page.getByRole('heading', { name: heading ?? /COVID-19/, level: 1 })).toBeVisible()
  }

  async hasDescription() {
    await expect(this.page.getByText('Data and insights from the UKHSA on COVID-19.')).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'See the simple summary for England (opens in a new tab)' })
    ).toHaveAttribute('href', 'https://www.gov.uk/government/organisations/uk-health-security-agency')
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Tuesday, 2 July 2024 at 12:44pm/)).toBeVisible()
  }
}
