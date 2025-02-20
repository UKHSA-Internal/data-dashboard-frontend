import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../../fixtures/app.fixture'

const chartIdentifiers = [
  'line-chart-comparing-rsv-hospital-icu-or-hdu-admission-rates-of-positive-cases-per-100-000-population-reported-through-sari-watch-england',
  'bar-chart-comparing-rsv-hospital-admissions-count-by-week',
  'bar-chart-comparing-weekly-rsv-icu-hdu-admissions-count-by-week',
  'line-chart-comparing-adenovirus-test-positivity-count-by-week',
  'line-chart-comparing-adenovirus-test-positivity-count-by-week-broken-down-by-age',
  'line-chart-comparing-h-mpv-test-positivity-count-by-week',
  'line-chart-comparing-h-mpv-test-positivity-count-by-week-broken-down-by-age',
  'line-chart-comparing-parainfluenza-test-positivity-count-by-week',
  'line-chart-comparing-parainfluenza-test-positivity-count-by-week-broken-down-by-age',
  'line-chart-comparing-rhinovirus-test-positivity-count-by-week',
  'line-chart-comparing-rhinovirus-test-positivity-count-by-week-broken-down-by-age',
  'line-chart-comparing-rsv-test-positivity-count-by-week',
  'line-chart-comparing-rsv-test-positivity-count-by-week-broken-down-by-age',
]

test.describe('Other respiratory viruses page', () => {
  test('Page layout', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await otherRespiratoryVirusesPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('displays heading & description', async () => {
      await otherRespiratoryVirusesPage.hasHeading()
      await otherRespiratoryVirusesPage.hasDescription()
    })
    await test.step('does not display the area selector', async () => {
      await app.hasNotAreaSelector()
    })
    await test.step('displays last updated date', async () => {
      await otherRespiratoryVirusesPage.hasLastUpdated()
    })
    await test.step('displays table of contents', async () => {
      await app.hasTableOfContents(['Healthcare', 'Testing'])
    })
    await test.step('displays section headings', async () => {
      await app.hasSectionHeadings(['Healthcare', 'Testing'])
    })
    await test.step('displays chart cards for "Healthcare"', async () => {
      await app.hasTopicCard({
        name: 'Line chart comparing RSV hospital (ICU or HDU) admission rates of positive cases per 100,000 population reported through SARI Watch, England',
        description:
          'RSV SARI Watch surveillance has run from week 40 to week 20. In the 2022 to 2023 season onwards this was extended to run throughout the year, to allow for surveillance of out-of-season trends.',
      })
      await app.hasTopicCard({
        name: 'Bar chart comparing RSV hospital admissions count by week',
        description: 'Weekly admissions rates of patients admitted to hospital with RSV as a weekly time series.',
      })
      await app.hasTopicCard({
        name: 'Bar chart comparing weekly RSV ICU/HDU admissions count by week',
        description: 'Weekly admission rates of patients admitted to ICU/HDU with RSV as a weekly time series.',
      })
    })
    await test.step('displays chart cards for "Testing"', async () => {
      await app.hasTopicCard({
        name: 'Line chart comparing Adenovirus test positivity count by week',
        description:
          'Weekly admissions rates of patients admitted to hospital with Adenovirus as a weekly time series.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing Adenovirus test positivity count by week broken down by age',
        description: 'Age breakdown of people testing positive for Adenovirus per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing hMPV test positivity count by week',
        description: 'Weekly admissions rates of patients admitted to hospital with hMPV as a weekly time series.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing hMPV test positivity count by week broken down by age',
        description: 'Age breakdown of people testing positive for hMPV per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing Parainfluenza test positivity count by week',
        description:
          'Weekly admissions rates of patients admitted to hospital with Parainfluenza as a weekly time series.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing Parainfluenza test positivity count by week broken down by age',
        description: 'Age breakdown of people testing positive for Parainfluenza per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing Rhinovirus test positivity count by week',
        description:
          'Weekly admissions rates of patients admitted to hospital with Rhinovirus as a weekly time series.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing Rhinovirus test positivity count by week broken down by age',
        description: 'Age breakdown of people testing positive for Rhinovirus per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing RSV test positivity count by week',
        description: 'Weekly admissions rates of patients admitted to hospital with RSV as a weekly time series.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing RSV test positivity count by week broken down by age',
        description: 'Age breakdown of people testing positive for Rhinovirus per 100,000 people.',
      })
    })
    await test.step('displays related links', async () => {
      await app.hasRelatedLinks()
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })
})

test.describe('Other respiratory viruses page - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ otherRespiratoryVirusesPage, app }) => {
    await otherRespiratoryVirusesPage.goto()
    await app.hasNav()
  })

  test('Downloads a csv version of each chart', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await app.canDownloadChart(chartIdentifiers, 'csv', 'mobile')
  })

  test('Downloads a json version of each chart', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await app.canDownloadChart(chartIdentifiers, 'json', 'mobile')
  })
})

test.describe('Other respiratory viruses page - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ otherRespiratoryVirusesPage, app }) => {
    await otherRespiratoryVirusesPage.goto()
    await app.hasNav()
  })

  test('Downloads a csv version of each chart', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await app.canDownloadChart(chartIdentifiers, 'csv', 'tablet')
  })

  test('Downloads a json version of each chart', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await app.canDownloadChart(chartIdentifiers, 'json', 'tablet')
  })
})

test.describe('Other respiratory viruses page - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ otherRespiratoryVirusesPage, app }) => {
    await otherRespiratoryVirusesPage.goto()
    await app.hasNav()
  })

  test('Downloads a csv version of each chart', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await app.canDownloadChart(chartIdentifiers, 'csv', 'desktop')
  })

  test('Downloads a json version of each chart', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await app.canDownloadChart(chartIdentifiers, 'json', 'desktop')
  })
  test('Navigates through the chart tabs using Enter Key on keyboard', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await test.step('tabs through the tabs and navigates to the download content with Enter Key on keyboard', async () => {
      await app.navigateChartTabsByKeyboardAndSelectWithEnterKey(chartIdentifiers)
    })
  })
  test('Navigates through the chart tabs using Space Key on keyboard', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await test.step('tabs through the tabs and navigates to the download content with Space Key on keyboard', async () => {
      await app.navigateChartTabsByKeyboardAndSelectWithSpaceKey(chartIdentifiers)
    })
  })
})

test.describe('Other respiratory viruses page - no JS', () => {
  test.use({ javaScriptEnabled: false })

  test('Downloads csv charts', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await test.step('downloads a csv version of each chart', async () => {
      await app.canDownloadChart(chartIdentifiers, 'csv', 'desktop')
    })
  })

  test('Downloads json charts', async ({ otherRespiratoryVirusesPage, app }) => {
    await test.step('loads the page', async () => {
      await otherRespiratoryVirusesPage.goto()
    })
    await test.step('downloads a json version of each chart', async () => {
      await app.canDownloadChart(chartIdentifiers, 'json', 'desktop')
    })
  })
})
