import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import * as fs from 'fs'

import { bulkDownloadZip } from '@/mock-server/handlers/bulkdownloads/fixtures/bulk-download-zip'

export class BulkDownloadsPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/bulk-downloads')
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/Bulk downloads | UKHSA data dashboard/)
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Mocked bulk downloads page description'
    )
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Bulk downloads/, level: 1 })).toBeVisible()
  }

  async hasNotLastUpdated() {
    await expect(this.page.getByText(/Last updated/)).toBeHidden()
  }

  async hasPageContent() {
    await expect(
      this.page.getByText(
        'The government’s coronavirus dashboard publishes up-to-date statistics about the coronavirus (COVID-19) pandemic in the UK. These statistics are not classed as official statistics because...'
      )
    ).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Download (csv)' })).toBeVisible()
  }

  async canBulkDownload() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      await this.page.getByRole('button', { name: 'Download (csv)' }).click(),
    ])

    const fileName = download.suggestedFilename()
    expect(fileName).toBe('data.csv')

    const path = await download.path()

    if (path) {
      const file = fs.readFileSync(path)
      expect(file.toString()).toEqual(bulkDownloadZip)
    }
  }
}
