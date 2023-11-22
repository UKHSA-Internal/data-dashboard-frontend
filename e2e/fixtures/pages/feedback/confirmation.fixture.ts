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
    const title = await this.page.title()
    await expect(title).toBe('Feedback Confirmation | UKHSA data dashboard')
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Form submitted/, level: 1 })).toBeVisible()
    await expect(this.page.getByText(/Thank you for your feedback/)).toBeVisible()
  }

  async hasPageContent() {
    await expect(
      this.page.getByText(
        /Thank you for giving feedback on the UKHSA data dashboard. We'll use your comments to help us continually improve the service. We will not be able to get in touch with you about your comments./
      )
    ).toBeVisible()
    await expect(
      this.page.getByText(
        /The feedback form is intended for feedback on your experience using the dashboard. If you need to get in touch with UK Health Security Agency, you can find contact information at the bottom of the/
      )
    ).toBeVisible()
    await expect(this.page.getByRole('link', { name: /UKHSA webpage/ })).toHaveAttribute(
      'href',
      'https://www.gov.uk/government/organisations/uk-health-security-agency'
    )
  }
}
