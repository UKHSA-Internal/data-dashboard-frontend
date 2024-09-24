import { test } from '../../fixtures/app.fixture'

test.describe('Landing page hero feature flag enabled', () => {
  test.describe('Home page', () => {
    test('Page layout', async ({ switchboardPage, homePage, app }) => {
      await test.step('enables feature flag', async () => {
        await switchboardPage.setFeatureFlag('landingPageHero', 'Enabled')
      })
      await test.step('loads the page', async () => {
        await homePage.goto()
      })
      await test.step('metadata is correct', async () => {
        await homePage.hasMetadata()
      })
      await test.step('displays the correct layout', async () => {
        await app.hasHeroBannerLayout()
      })
      await test.step('displays without any accessibility defects', async () => {
        await app.hasNoAccessibilityDefects()
      })
      await test.step('does not display the last updated date', async () => {
        await homePage.hasNotLastUpdated()
      })
      await test.step('displays page sections', async () => {
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
  })
})
