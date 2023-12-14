import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class MetricsChildPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/metrics-documentation/new-cases-7days-sum')
  }

  async hasHeading(name: string) {
    await expect(this.page.getByRole('heading', { name, level: 1 })).toBeVisible()
  }

  async hasSummarySection(topic: string, category: string, apiName: string) {
    await expect(this.page.getByText('Topic')).toBeVisible()
    await expect(this.page.getByLabel('Summary').getByText(topic)).toBeVisible()

    await expect(this.page.getByText('Category')).toBeVisible()
    await expect(this.page.getByText(category)).toBeVisible()

    await expect(this.page.getByText('API name')).toBeVisible()
    await expect(this.page.getByText(apiName)).toBeVisible()
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
