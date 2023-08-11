import { test } from '../../fixtures/app.fixture'

test('Home page', async ({ homePage, app }) => {
  await test.step('loads the page', async () => {
    await homePage.goto()
  })
  await test.step('metadata is correct', async () => {
    await homePage.hasMetadata()
  })
  await test.step('displays the correct layout', async () => {
    await app.hasLayout()
  })
  // await test.step('displays the correct layout on a tablet', async () => {
  //   await app.hasTabletLayout()
  // })
  // await test.step('displays the correct layout in mobile', async () => {
  //   await app.hasMobileLayout()
  // })
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
    await homePage.hasCovid19CasesTabularData
  })
  await test.step('displays the COVID-19 "deaths" chart row card', async () => {
    await homePage.hasCovid19DeathsChartRowCard()
    await homePage.hasCovid19DeathsTabularData()
  })
  await test.step('displays the Influenza headline numbers row card', async () => {
    await homePage.hasInfluenzaHeadlineNumbersRowCard()
  })
  await test.step('displays the Influenza "healthcare" chart row card', async () => {
    await homePage.hasInfluenzaHealthareChartRowCard()
    await homePage.hasInfluenzaHealthcareTabularData()
  })
  await test.step('displays the Influenza "testing" chart row card', async () => {
    await homePage.hasInfluenzaTestingChartRowCard()
    await homePage.hasInfluenzaTestingTabularData()
  })
  await test.step('downloads a csv version of each chart', async () => {
    await homePage.canDownloadChartAsCsv(['cases', 'deaths', 'healthcare', 'testing'])
  })
  await test.step('displays related links', async () => {
    await app.hasRelatedLinks()
  })
  await test.step('displays back to top', async () => {
    await app.hasBackToTop()
  })
})
