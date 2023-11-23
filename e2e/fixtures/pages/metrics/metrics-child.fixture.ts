import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class MetricsChildPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/metrics/new-cases-7days-sum')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('Metrics child | UKHSA data dashboard')
  }

  async hasHeading(name: string) {
    await expect(this.page.getByRole('heading', { name, level: 1 })).toBeVisible()
  }

  async hasSummarySection() {
    await expect(this.page.getByText('Topic')).toBeVisible()
    await expect(this.page.getByLabel('Summary').getByText('COVID-19')).toBeVisible()

    await expect(this.page.getByText('Category')).toBeVisible()
    await expect(this.page.getByText('Healthcare')).toBeVisible()

    await expect(this.page.getByText('API name')).toBeVisible()
    await expect(this.page.getByText('new_cases_7days_sum')).toBeVisible()
  }

  async hasContentSection(label: string, text: string) {
    await expect(this.page.getByLabel(label).getByText(text)).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Tuesday, 24 October 2023 at 04:09pm/)).toBeVisible()
  }

  async clickBackButton() {
    await this.page.getByRole('link', { name: 'Back', exact: true }).click()
  }
}
