import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class FeedbackConfirmationPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/feedback/confirmation')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/Feedback Confirmation | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Form submitted/, level: 1 })).toBeVisible()
    await expect(this.page.getByText(/Thank you for your feedback/)).toBeVisible()
  }

  async hasPageContent() {
    await expect(
      this.page.getByText(
        /Thank you for taking the time to give feedback on the UKHSA data dashboard. We'll use your feedback to help us continually improve our services./
      )
    ).toBeVisible()
    await expect(
      this.page.getByText(
        /We're constantly looking to improve our users' experience of the dashboard. If you'd like to share your thoughts further, please get in touch with our user research team at/
      )
    ).toBeVisible()
    await expect(this.page.getByRole('link', { name: /researchteam.dpd@ukhsa.gov.uk/ })).toHaveAttribute(
      'href',
      'mailto:researchteam.dpd@ukhsa.gov.uk'
    )
  }

  async hasScreenshot() {
    await expect(this.page).toHaveScreenshot({ fullPage: true })
  }
}
