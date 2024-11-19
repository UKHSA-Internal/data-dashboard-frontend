import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test('Downloading a csv version of each chart', async ({ landingPage, app }) => {
  await test.step('loads the page', async () => {
    await landingPage.goto()
  })
  await test.step('downloads charts', async () => {
    await app.canDownloadChart(['cases', 'deaths', 'healthcare', 'testing'], 'csv')
  })
})

test('Downloading a json version of each chart', async ({ landingPage, app }) => {
  await test.step('loads the page', async () => {
    await landingPage.goto()
  })
  await test.step('downloads charts', async () => {
    await app.canDownloadChart(['cases', 'deaths', 'healthcare', 'testing'], 'json')
  })
})

test.describe('Home page - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ landingPage, app }) => {
    await landingPage.goto()
    await app.hasNav()
  })
})

test.describe('Home page - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ landingPage, app }) => {
    await landingPage.goto()
    await app.hasNav()
  })
})

test.describe('Home page - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ landingPage, app }) => {
    await landingPage.goto()
    await app.hasNav()
  })
})

test.describe('Home page - no JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('Downloading a csv version of each chart', async ({ landingPage, app }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'https://digitaltools.phe.org.uk/browse/CDD-1419',
    })

    await test.step('loads the page', async () => {
      await landingPage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(['cases', 'deaths', 'healthcare', 'testing'], 'csv')
    })
  })

  test('Downloading a json version of each chart', async ({ landingPage, app }) => {
    await test.step('loads the page', async () => {
      await landingPage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(['cases', 'deaths', 'healthcare', 'testing'], 'json')
    })
  })

  test('Tabs fallback', async ({ landingPage }) => {
    await test.step('loads the page', async () => {
      await landingPage.goto()
    })
    await test.step('displays the COVID-19 headline numbers row card', async () => {
      await landingPage.hasCovid19HeadlineNumbersRowCard()
    })
    await test.step('displays the COVID-19 "cases" chart row card', async () => {
      await landingPage.hasCovid19CasesChartRowCard({ javaScriptEnabled: false })
    })
    await test.step('displays the COVID-19 "deaths" chart row card', async () => {
      await landingPage.hasCovid19DeathsChartRowCard({ javaScriptEnabled: false })
    })
    await test.step('displays the Influenza headline numbers row card', async () => {
      await landingPage.hasInfluenzaHeadlineNumbersRowCard()
    })
    await test.step('displays the Influenza "healthcare" chart row card', async () => {
      await landingPage.hasInfluenzaHealthareChartRowCard({ javaScriptEnabled: false })
    })
    await test.step('displays the Influenza "testing" chart row card', async () => {
      await landingPage.hasInfluenzaTestingChartRowCard({ javaScriptEnabled: false })
    })
  })
})
