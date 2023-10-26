import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Influenza page', () => {
  test('Page layout', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await influenzaPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('displays heading & description', async () => {
      await influenzaPage.hasHeading()
      await influenzaPage.hasDescription()
    })
    await test.step('displays last updated date', async () => {
      await influenzaPage.hasLastUpdated()
    })
    await test.step('displays table of contents', async () => {
      await app.hasTableOfContents(['Healthcare', 'Testing'])
    })
    await test.step('displays section headings', async () => {
      await app.hasSectionHeadings(['Healthcare', 'Testing'])
    })
    await test.step('displays chart cards for "Healthcare"', async () => {
      await app.hasTopicCard({
        name: 'Line chart with overlaying line comparing hospital admission rates of patients admitted to hospital with Influenza',
        description:
          'Weekly admissions rates of patients admitted to hospital with Influenza as a weekly time series, shown as the rate per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing Influenza hospital admission rates by age',
        description: 'Age breakdown of people admitted to hospital, shown as the rate per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart with overlaying line comparing ICU admission rates of patients admitted to hospital with Influenza',
        description:
          'Weekly admissions rates of patients admitted to ICU with Influenza as a weekly time series, shown as the rate per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing Influenza ICU admission rates by age',
        description: 'Age breakdown of people admitted to ICU, shown as the rate per 100,000 people.',
      })
    })
    await test.step('displays chart cards for "Testing"', async () => {
      7
      await app.hasTopicCard({
        name: 'Bar chart with overlaying line comparing positivity for Influenza tests',
        description:
          'Weekly admissions rates of patients admitted to hospital with Influenza as a weekly time series, shown as the rate per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing weekly positivity for Influenza tests by age',
        description: 'Weekly time series of positivity for people testing positive for Influenza broken down by age.',
      })
    })

    await test.step('displays related links', async () => {
      await app.hasRelatedLinks()
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })

  test('downloads a csv version of each chart', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChartAsCsv([
        'line-chart-with-overlaying-line-comparing-hospital-admission-rates-of-patients-admitted-to-hospital-with-influenza',
        'line-chart-comparing-influenza-hospital-admission-rates-by-age',
        'line-chart-with-overlaying-line-comparing-icu-admission-rates-of-patients-admitted-to-hospital-with-influenza',
        'line-chart-comparing-influenza-icu-admission-rates-by-age',
        'bar-chart-with-overlaying-line-comparing-positivity-for-influenza-tests',
        'line-chart-comparing-weekly-positivity-for-influenza-tests-by-age',
      ])
    })
  })
})

test.describe('Influenza page - mobile', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ influenzaPage, app }) => {
    await influenzaPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Influenza page - tablet', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ influenzaPage, app }) => {
    await influenzaPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Influenza page - desktop', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ influenzaPage, app }) => {
    await influenzaPage.goto()
    await app.hasDesktopNav()
  })
})

test.describe('Influenza page - no JS', () => {
  test.use({ javaScriptEnabled: false })

  test('Downloads without JS', async ({ influenzaPage, app, browserName }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(browserName == 'webkit')

    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads a csv version of each chart', async () => {
      await app.canDownloadChartAsCsv([
        'line-chart-with-overlaying-line-comparing-hospital-admission-rates-of-patients-admitted-to-hospital-with-influenza',
        'line-chart-comparing-influenza-hospital-admission-rates-by-age',
        'line-chart-with-overlaying-line-comparing-icu-admission-rates-of-patients-admitted-to-hospital-with-influenza',
        'line-chart-comparing-influenza-icu-admission-rates-by-age',
        'bar-chart-with-overlaying-line-comparing-positivity-for-influenza-tests',
        'line-chart-comparing-weekly-positivity-for-influenza-tests-by-age',
      ])
    })
  })
})
