import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Home page', () => {
  test('Page layout', async ({ homePage, app }) => {
    await test.step('loads the page', async () => {
      await homePage.goto()
    })
    await test.step('metadata is correct', async () => {
      await homePage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('does not display the last updated date', async () => {
      await homePage.hasNotLastUpdated()
    })
    await test.step('displays page sections', async () => {
      await homePage.hasWelcomeText()
      await homePage.hasPageDescription()
      await homePage.hasSectionHeadingsAndDescription()
    })
    await test.step('displays the COVID-19 headline numbers row card', async () => {
      await homePage.hasCovid19HeadlineNumbersRowCard()
    })
    await test.step('displays the COVID-19 "cases" chart row card', async () => {
      await homePage.hasCovid19CasesChartRowCard()
    })
    await test.step('displays the COVID-19 "deaths" chart row card', async () => {
      await homePage.hasCovid19DeathsChartRowCard()
    })
    await test.step('displays the Influenza headline numbers row card', async () => {
      await homePage.hasInfluenzaHeadlineNumbersRowCard()
    })
    await test.step('displays the Influenza "healthcare" chart row card', async () => {
      await homePage.hasInfluenzaHealthareChartRowCard()
    })
    await test.step('displays the Influenza "testing" chart row card', async () => {
      await homePage.hasInfluenzaTestingChartRowCard()
    })
    await test.step('displays related links', async () => {
      await app.hasRelatedLinks()
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })

  test('Downloading a csv version of each chart', async ({ homePage, app }) => {
    await test.step('loads the page', async () => {
      await homePage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChartAsCsv(['cases', 'deaths', 'healthcare', 'testing'])
    })
  })
})

test.describe('Home page - mobile', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ homePage, app }) => {
    await homePage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Home page - tablet', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ homePage, app }) => {
    await homePage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Home page - desktop', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ homePage, app }) => {
    await homePage.goto()
    await app.hasDesktopNav()
  })
})

test.describe('Home page - no JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test.skip(({ browserName }) => browserName === 'webkit', 'Not working in safari')

  test('Downloads without JS', async ({ homePage, app }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'https://digitaltools.phe.org.uk/browse/CDD-1419',
    })

    await test.step('loads the page', async () => {
      await homePage.goto()
    })
    await test.step('downloads a csv version of each chart', async () => {
      await app.canDownloadChartAsCsv(['cases', 'deaths', 'healthcare', 'testing'])
    })
  })

  test('Tabs fallback', async ({ homePage }) => {
    await test.step('loads the page', async () => {
      await homePage.goto()
    })
    await test.step('displays the COVID-19 headline numbers row card', async () => {
      await homePage.hasCovid19HeadlineNumbersRowCard()
    })
    await test.step('displays the COVID-19 "cases" chart row card', async () => {
      await homePage.hasCovid19CasesChartRowCard({ javaScriptEnabled: false })
    })
    await test.step('displays the COVID-19 "deaths" chart row card', async () => {
      await homePage.hasCovid19DeathsChartRowCard({ javaScriptEnabled: false })
    })
    await test.step('displays the Influenza headline numbers row card', async () => {
      await homePage.hasInfluenzaHeadlineNumbersRowCard()
    })
    await test.step('displays the Influenza "healthcare" chart row card', async () => {
      await homePage.hasInfluenzaHealthareChartRowCard({ javaScriptEnabled: false })
    })
    await test.step('displays the Influenza "testing" chart row card', async () => {
      await homePage.hasInfluenzaTestingChartRowCard({ javaScriptEnabled: false })
    })
  })
})
