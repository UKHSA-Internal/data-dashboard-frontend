import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import AdmZip from 'adm-zip'

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
    await expect(this.page.getByText(/Last updated on Tuesday, 2 July 2024 at 12:44pm/)).toBeVisible()
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

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.getByRole('button', { name: 'Download' }).click(),
    ])

    const fileName = download.suggestedFilename()
    expect(fileName).toBe(`ukhsa-mock-download-${format}.zip`)

    const path = await download.path()

    if (path) {
      // Unzip the downloaded file using AdmZip
      const zip = new AdmZip(path)
      const zipEntries = zip.getEntries()

      // Initialize a variable to hold the extracted data
      let extractedData

      // Check the format and find the relevant entry
      if (format === 'json') {
        const jsonEntry = zipEntries.find((entry) => entry.entryName === 'mock.json')
        if (jsonEntry) {
          extractedData = zip.readAsText(jsonEntry) // Read the contents as text
        }
      } else if (format === 'csv') {
        const csvEntry = zipEntries.find((entry) => entry.entryName === 'mock.csv')
        if (csvEntry) {
          extractedData = zip.readAsText(csvEntry) // Read the contents as text
        }
      }

      if (!extractedData) return

      if (format === 'json') {
        // Assert based on the format
        expect(JSON.parse(extractedData)).toEqual(bulkDownloadJson)
      } else if (format === 'csv') {
        expect(extractedData).toEqual(bulkDownloadCsv)
      }
    }
  }
}
