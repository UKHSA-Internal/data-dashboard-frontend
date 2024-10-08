import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class ArchiveDataPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/covid-19-archive-data-download')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('COVID-19 Archive data download | UKHSA data dashboard')
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /COVID-19 Archive data download/, level: 1 })).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Tuesday, 2 July 2024 at 12:44pm/)).toBeVisible()
  }

  async hasDownloadLinkByHref(href: string) {
    await expect(this.page.locator(`a[href="${href}"]`)).toBeVisible()
  }

  async hasPageContent() {
    await expect(
      this.page.getByText(
        'You can download all the historic data from the decommissioned Coronavirus (COVID-19) in the UK dashboard on this page by clicking the Download link.'
      )
    ).toBeVisible()
    await expect(
      this.page.getByText('This is useful if you want to analyse the data using your own tools.')
    ).toBeVisible()
    await expect(
      this.page.getByText(
        'The data is available in a zip file format, which has a size of about 638MB so it should be quick to download even on slower internet connections (although you may prefer to download a subset of the data using the links below).'
      )
    ).toBeVisible()

    await expect(this.page.getByRole('link', { name: 'Download all (Opens in a new tab)' })).toBeVisible()

    const headings = ['Cases', 'Deaths', 'Healthcare', 'Testing', 'Vaccinations']
    for (const name of headings) {
      await expect(this.page.getByRole('heading', { name })).toBeVisible()
    }

    await expect(await this.page.getByRole('link', { name: 'Download (Opens in a new tab)' }).all()).toHaveLength(5)
  }
}
