import { test } from '../../fixtures/app.fixture'

test.describe('Smoke tests', () => {
  test('Navigates to all pages from the menu', async ({
    homePage,
    aboutPage,
    whatsNewParentPage,
    whatsNewChildPage,
    metricsParentPage,
    metricsChildPage,
    covid19Page,
    influenzaPage,
    otherRespiratoryVirusesPage,
    accessibilityStatementPage,
    errorPage,
  }) => {
    await test.step('loads the home page', async () => {
      await homePage.goto()
      await homePage.hasHeading()
    })
    await test.step('loads the "COVID-19" topic page', async () => {
      await covid19Page.goto()
      await covid19Page.hasHeading()
    })
    await test.step('loads the "Influenza" topic page', async () => {
      await influenzaPage.goto()
      await influenzaPage.hasHeading()
    })
    await test.step('loads the "Other respiratory viruses" topic page', async () => {
      await otherRespiratoryVirusesPage.goto()
      await otherRespiratoryVirusesPage.hasHeading()
    })
    await test.step('loads the "about" page', async () => {
      await aboutPage.goto()
      await aboutPage.hasHeading()
    })
    await test.step('loads the "whats new" parent page', async () => {
      await whatsNewParentPage.goto()
      await whatsNewParentPage.hasHeading()
    })
    await test.step('loads the "whats new" child page', async () => {
      await whatsNewChildPage.goto()
      await whatsNewChildPage.hasHeading('Soft launch of the UKHSA data dashboard')
    })
    await test.step('loads the metrics parent page', async () => {
      await metricsParentPage.goto()
      await metricsParentPage.hasHeading()
    })
    await test.step('loads the metrics child page', async () => {
      await metricsChildPage.goto()
      await metricsChildPage.hasHeading('New cases 7 days sum')
    })
    await test.step('loads the "Accessibility statement" page', async () => {
      await accessibilityStatementPage.goto()
      await accessibilityStatementPage.hasHeading()
    })
    // TODO: Removed API tests for now, until further API work done
    // await test.step('loads the "api" external url', async () => {
    //   await app.nav.getByRole('link', { name: /API/ }).click()
    //   await app.page.waitForURL('http://uhd-uat-public-api-1804026123.eu-west-2.elb.amazonaws.com')
    // })
    await test.step('loads the "Error" page', async () => {
      await errorPage.goto()
      await errorPage.hasHeading()
    })
  })
})

test.describe('Smoke tests - no JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('Navigates to all pages from the menu', async ({
    homePage,
    aboutPage,
    whatsNewParentPage,
    whatsNewChildPage,
    metricsParentPage,
    metricsChildPage,
    covid19Page,
    influenzaPage,
    otherRespiratoryVirusesPage,
    accessibilityStatementPage,
    errorPage,
  }) => {
    await test.step('loads the home page', async () => {
      await homePage.goto()
      await homePage.hasHeading()
    })
    await test.step('loads the "COVID-19" topic page', async () => {
      await covid19Page.goto()
      await covid19Page.hasHeading()
    })
    await test.step('loads the "Influenza" topic page', async () => {
      await influenzaPage.goto()
      await influenzaPage.hasHeading()
    })
    await test.step('loads the "Other respiratory viruses" topic page', async () => {
      await otherRespiratoryVirusesPage.goto()
      await otherRespiratoryVirusesPage.hasHeading()
    })
    await test.step('loads the "about" page', async () => {
      await aboutPage.goto()
      await aboutPage.hasHeading()
    })
    await test.step('loads the "whats new" parent page', async () => {
      await whatsNewParentPage.goto()
      await whatsNewParentPage.hasHeading()
    })
    await test.step('loads the "whats new" child page', async () => {
      await whatsNewChildPage.goto()
      await whatsNewChildPage.hasHeading('Soft launch of the UKHSA data dashboard')
    })
    await test.step('loads the metrics parent page', async () => {
      await metricsParentPage.goto()
      await metricsParentPage.hasHeading()
    })
    await test.step('loads the metrics child page', async () => {
      await metricsChildPage.goto()
      await metricsChildPage.hasHeading('New cases 7 days sum')
    })
    await test.step('loads the "Accessibility statement" page', async () => {
      await accessibilityStatementPage.goto()
      await accessibilityStatementPage.hasHeading()
    })
    // TODO: Removed API tests for now, until further API work done
    // await test.step('loads the "api" external url', async () => {
    //   await app.nav.getByRole('link', { name: /API/ }).click()
    //   await app.page.waitForURL('http://uhd-uat-public-api-1804026123.eu-west-2.elb.amazonaws.com')
    // })
    await test.step('loads the "Error" page', async () => {
      await errorPage.goto()
      await errorPage.hasHeading()
    })
  })
})
