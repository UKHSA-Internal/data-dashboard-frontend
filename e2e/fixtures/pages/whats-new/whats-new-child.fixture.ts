import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class WhatsNewChildPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/whats-new/soft-launch-of-the-ukhsa-data-dashboard')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/What's new child | UKHSA data dashboard/)
  }

  async hasHeading(name: string) {
    await expect(this.page.getByRole('heading', { name, level: 1 })).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Tuesday, 26 September 2023 at 01:00am/)).toBeVisible()
  }

  async hasBadge(name: string) {
    await expect(this.page.getByText(name)).toBeVisible()
  }

  async hasAdditionalInformation(show: boolean) {
    const heading = this.page.getByRole('heading', { level: 2, name: /Additional information/ })

    show ? await expect(heading).toBeVisible() : await expect(heading).toBeHidden()
  }

  async clickBackButton() {
    await this.page.getByRole('link', { name: 'Back', exact: true }).click()
  }
}
