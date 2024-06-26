import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class ErrorPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/error')
  }

  async hasHeading() {
    await expect(
      this.page.getByRole('heading', { name: /Sorry, there is a problem with the service/, level: 1 })
    ).toBeVisible()
  }
}
