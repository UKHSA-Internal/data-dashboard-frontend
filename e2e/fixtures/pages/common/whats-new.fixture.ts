import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class WhatsNewPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/whats-new')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/What's new | UKHSA data dashboard/)
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'A list of all the new features and key pieces of data which have been added to the UKHSA data dashboard'
    )
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /What's new/, level: 1 })).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Friday, 12 May 2023 at 04:22pm/)).toBeVisible()
  }

  async hasPageContent() {
    await expect(this.page.getByRole('heading', { name: 'March 2023', level: 2 })).toBeVisible()
    await expect(this.page.getByRole('heading', { name: '2 March 2023 (v5)', level: 3 })).toBeVisible()
    await expect(
      this.page.getByText(
        'The primary navigation items have been updated to focus on viruses included in the dashboard in the place of metrics. The primary navigation items now include ‘Home’ ‘Coronavirus’, ‘Influenza’ and ‘Other respiratory viruses’.'
      )
    ).toBeVisible()

    await expect(this.page.getByRole('heading', { name: 'February 2023', level: 2 })).toBeVisible()
    await expect(this.page.getByRole('heading', { name: '22 February 2023 (v4)', level: 3 })).toBeVisible()
    await expect(
      this.page.getByText(
        'The ‘About’ page has been updated to describe respiratory virus data displayed on the dashboard.'
      )
    ).toBeVisible()
  }

  async hasScreenshot() {
    await expect(this.page).toHaveScreenshot({ fullPage: true })
  }
}
