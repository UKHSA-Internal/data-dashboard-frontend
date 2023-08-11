import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class Covid19Page {
  readonly page: Page
  readonly nav: Locator

  constructor(page: Page) {
    this.page = page
    this.nav = this.page.getByRole('navigation', { name: 'Menu' })
  }

  async goto() {
    await this.page.goto('/topics/covid-19')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/COVID-19 | UKHSA data dashboard/)
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Overall summary of COVID-19 in circulation within the UK'
    )
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /COVID-19/, level: 1 })).toBeVisible()
  }

  async hasDescription() {
    await expect(this.page.getByText('Data and insights from the UKHSA on COVID-19.')).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'See the simple summary for England (opens in a new tab)' })
    ).toHaveAttribute('href', 'https://www.gov.uk/government/organisations/uk-health-security-agency')
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Tuesday, 21 March 2023 at 10:25am/)).toBeVisible()
  }
}
