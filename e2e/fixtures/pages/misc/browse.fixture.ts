import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class BrowsePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/browse')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('Browse | UKHSA data dashboard')
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Browse/, level: 1 })).toBeVisible()
  }

  async hasPageContent() {
    await expect(this.page.getByRole('link', { name: 'Home', exact: true })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Health topics', exact: true })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'API', exact: true })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Metrics documentation', exact: true })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'About', exact: true })).toBeVisible()
  }
}
