import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class OtherRespiratoryVirusesPage {
  readonly page: Page
  readonly nav: Locator

  constructor(page: Page) {
    this.page = page
    this.nav = this.page.getByRole('navigation', { name: 'Menu' })
  }

  async goto() {
    await this.page.goto('/topics/other-respiratory-viruses')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/Other respiratory viruses | UKHSA data dashboard/)
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Overall summary of other respiratory viruses in circulation within the UK'
    )
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Other respiratory viruses/, level: 1 })).toBeVisible()
  }

  async hasDescription() {
    await expect(this.page.getByText('Data and insights from the UKHSA on other respiratory viruses.')).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'See the simple summary for England (opens in a new tab)' })
    ).toHaveAttribute('href', 'https://www.gov.uk/government/organisations/uk-health-security-agency\\')
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Wednesday, 10 May 2023 at 05:27pm/)).toBeVisible()
  }
}
