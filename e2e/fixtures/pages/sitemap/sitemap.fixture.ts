import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

import { logger } from '@/lib/logger'

interface SitemapEntry {
  loc: string | null
  lastmod: string | null
  changefreq: string | null
  priority: string | null
}

export class SitemapPage {
  readonly page: Page
  sitemap: SitemapEntry[]

  constructor(page: Page) {
    this.page = page
    this.sitemap = []
  }

  async goto() {
    await this.page.goto('/sitemap.xml')

    // eslint-disable-next-line playwright/no-eval
    this.sitemap = await this.page.$$eval('url', (urls) =>
      urls.map((url) => ({
        loc: url.querySelector('loc')?.textContent ?? null,
        lastmod: url.querySelector('lastmod')?.textContent ?? null,
        changefreq: url.querySelector('changefreq')?.textContent ?? null,
        priority: url.querySelector('priority')?.textContent ?? null,
      }))
    )
  }

  async count(number: number) {
    expect(this.sitemap.length).not.toBeLessThan(number)
  }

  async validate() {
    for (const page of this.sitemap) {
      expect(page.loc).toBeDefined()
      expect(page.lastmod).toBeDefined()
      expect(page.changefreq).toBeDefined()
      expect(page.priority).toBeDefined()
    }
  }

  async verifyUrls() {
    for (const page of this.sitemap) {
      if (!page.loc) {
        throw new Error('Missing url in sitemap')
      }

      try {
        const responsePromise = this.page.waitForResponse((response) => {
          logger.info(`${response.url()} status: ${response.status()}`)
          return (
            response.url().includes(page.loc ?? '') &&
            response.status() === 200 &&
            response.request().method() === 'GET'
          )
        })
        await this.page.goto(page.loc)
        expect(await responsePromise).toBeTruthy()
      } catch (error) {
        logger.error(`Error navigating to ${page.loc}:`, error)
      }
    }
  }
}
