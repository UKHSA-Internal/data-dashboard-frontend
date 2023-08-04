import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class FeedbackPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/feedback')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/Feedback | UKHSA data dashboard/)
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /UKHSA data dashboard feedback/, level: 1 })).toBeVisible()
  }

  async hasPageContent() {
    await expect(
      this.page.getByRole('heading', { name: /What was your reason for visiting the dashboard today?/, level: 2 })
    ).toBeVisible()
    await expect(
      this.page.getByText(
        /We will not be able to get in touch with you about your responses so please do not leave any personal details, such as your name or email address./
      )
    ).toBeVisible()

    await expect(
      this.page.getByRole('heading', { name: /Did you find everything you were looking for?/, level: 2 })
    ).toBeVisible()
    await expect(
      this.page.getByRole('heading', { name: /How could we improve your experience with the dashboard?/, level: 2 })
    ).toBeVisible()
    await expect(
      this.page.getByRole('heading', { name: /What would you like to see on the dashboard in the future?/, level: 2 })
    ).toBeVisible()
  }

  async fillFormInputs() {
    await this.page.getByLabel(/What was your reason for visiting the dashboard today?/).fill('Test input')
    await this.page.getByLabel(/Yes/).check()
    await this.page.getByLabel(/How could we improve your experience with the dashboard?/).fill('Test input')
    await this.page.getByLabel(/What would you like to see on the dashboard in the future?/).fill('Test input')
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'submit' }).click()
  }
}
