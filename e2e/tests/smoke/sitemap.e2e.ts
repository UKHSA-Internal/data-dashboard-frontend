import { test } from '../../fixtures/app.fixture'

/**
 * Our site is CMS generated but the total number of pages don't change very often. With this in mind,
 * we can be quite agressive with our sitemap testing.
 *
 * If the total number of sitemap pages changes, we probably do want to know about it.
 */
const TOTAL_PAGES = 106

test.describe('Sitemap.xml @smoke', () => {
  test('Validate sitemap structure', async ({ sitemapPage }) => {
    await test.step('Go to sitemap.xml', async () => {
      await sitemapPage.goto()
    })
    await test.step(`Has expected number of pages (${TOTAL_PAGES})`, async () => {
      await sitemapPage.count(TOTAL_PAGES)
    })
    await test.step('Check format is correct', async () => {
      await sitemapPage.validate()
    })
  })

  test('Verify URLs in sitemap', async ({ sitemapPage }) => {
    await test.step('Go to sitemap.xml', async () => {
      await sitemapPage.goto()
    })

    await test.step('Url loads correctly', async () => {
      await sitemapPage.verifyUrls()
    })
  })
})
