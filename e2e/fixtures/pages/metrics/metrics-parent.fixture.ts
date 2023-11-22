import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class MetricsParentPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/metrics')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('Metrics documentation | UKHSA data dashboard')
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Metrics documentation/, level: 1 })).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Tuesday, 24 October 2023 at 04:09pm/)).toBeVisible()
  }

  async hasPageContent() {
    await expect(
      this.page.getByText(
        'Here we outline a list of metrics available in the UKHSA data dashboard. Click to view more information about a metric'
      )
    ).toBeVisible()

    await expect(this.page.getByRole('heading', { level: 2, name: 'Metric title: New cases 7 days sum' })).toBeVisible()
    await expect(
      this.page.getByText('Metric description: This metric shows the count of reported new cases in the last 7 days.')
    ).toBeVisible()
  }

  async openChildPage(name: string) {
    await this.page.getByText(name).click()
  }
}
