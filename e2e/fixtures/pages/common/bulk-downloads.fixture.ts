import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import * as fs from 'fs'

import { bulkDownloadCsv, bulkDownloadJson } from '@/mock-server/handlers/bulkdownloads/fixtures/bulk-download-zip'

export class BulkDownloadsPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/bulk-downloads')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('Bulk downloads | UKHSA data dashboard')
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Mocked bulk downloads page description'
    )
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Bulk downloads/, level: 1 })).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Thursday, 24 August 2023 at 04:53pm/)).toBeVisible()
  }

  async hasPageContent() {
    await expect(
      this.page.getByText(
        'You can download all the data from the UKHSA data dashboard charts on this page by clicking the Download button.'
      )
    ).toBeVisible()
    await expect(
      this.page.getByText('This is useful if you want to analyse the data using your own tools.')
    ).toBeVisible()
    await expect(
      this.page.getByText(
        'The data is available in a zip file format, which has a size of about 70 kB so it should be quick to download even on slower internet connections.'
      )
    ).toBeVisible()
    await expect(this.page.getByText('Select format')).toBeVisible()
    await expect(this.page.getByLabel('CSV')).toBeChecked()
    await expect(this.page.getByLabel('JSON')).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Download' })).toBeVisible()
  }

  async canBulkDownload(format: 'csv' | 'json') {
    await this.page.getByLabel(format.toUpperCase()).click()

    const downloadPromise = this.page.waitForEvent('download')

    await this.page.getByRole('button', { name: 'Download' }).click()

    const download = await downloadPromise

    const fileName = download.suggestedFilename()
    expect(fileName).toBe(`ukhsa-mock-download-${format}.zip`)

    const path = await download.path()

    if (path) {
      const file = fs.readFileSync(path)
      if (format === 'json') {
        expect(file.toString()).toEqual(JSON.stringify(bulkDownloadJson))
      }
      if (format === 'csv') {
        expect(file.toString()).toEqual(bulkDownloadCsv)
      }
    }
  }
}
