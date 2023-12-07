import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class WhatsNewParentPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/whats-new')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe("What's new | UKHSA data dashboard")
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /What's new/, level: 1 })).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Tuesday, 24 October 2023 at 04:09pm/)).toBeVisible()
  }

  async isListedByMonth(months: string[]) {
    const list = this.page.getByRole('list', { name: "What's new" })

    const headings = await list.getByRole('heading', { name: /List of changes in the month of/ }).all()
    await expect(headings).toHaveLength(months.length)

    let index = 0
    for (const heading of await headings) {
      await expect(heading).toHaveText(`List of changes in the month of ${months[index]}`)
      index++
    }
  }

  async isSortedByDate(expectedDates: string[]) {
    const dates = this.page.getByRole('time')

    let idx = 0
    for (const date of expectedDates) {
      await expect(dates.nth(idx)).toHaveText(date)
      idx++
    }
  }

  async checkForEntry({
    title,
    category,
    date,
    body,
  }: {
    title: string
    category: string
    date: string
    body: string
  }) {
    const heading = this.page.getByRole('heading', {
      level: 3,
      name: `Entry date: ${date} Entry category: ${category} Entry title: ${title}`,
    })
    await expect(heading).toBeVisible()
    await expect(this.page.getByText(body)).toBeVisible()
  }

  async openChildPage(name: string) {
    await this.page.getByText(name).click()
  }
}
