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
    await expect(this.page.getByRole('link', { name: 'Homepage', exact: true })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'COVID-19' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Influenza' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Other respiratory viruses' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'API' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: "What's new" })).toBeVisible()
  }
}
