import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class MetricsParentPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(page?: string) {
    await this.page.goto(page || '/metrics-documentation')
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

    await expect(this.page.getByRole('form', { name: 'Metrics search' })).toBeVisible()
    await expect(this.page.getByRole('textbox', { name: 'Metric name' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Clear' })).toBeVisible()

    await expect(this.page.getByRole('heading', { level: 2, name: 'Metric title: New cases 7 days sum' })).toBeVisible()
    await expect(
      this.page.getByText('Metric description: This metric shows the count of reported new cases in the last 7 days.')
    ).toBeVisible()
  }

  async hasMatchedEntries(entries: string[]) {
    for (const entry of entries) {
      const heading = this.page.getByRole('listitem').getByRole('heading', { level: 2, name: entry })
      await expect(heading).toBeVisible()
    }
  }

  async countMetricsItems(expectedItems: number) {
    const items = await this.page.getByRole('list', { name: 'Metrics documentation' }).getByRole('listitem').all()
    await expect(items).toHaveLength(expectedItems)
  }

  async search(value: string) {
    await this.page.getByLabel('Metric name').fill(value, { timeout: 1000 })
  }

  async clickSearch() {
    await this.page.getByRole('button', { name: 'Search' }).click()
  }

  async clickClear() {
    await this.page.getByRole('link', { name: 'Clear' }).click()
  }

  async openChildPage(name: string) {
    await this.page.getByText(name).click()
  }
}
