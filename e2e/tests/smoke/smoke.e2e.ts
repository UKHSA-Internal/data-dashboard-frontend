import { test } from '../../fixtures/app.fixture'

test.describe('Smoke tests', () => {
  test('Navigates to all pages from the menu', async ({
    homePage,
    aboutPage,
    whatsNewPage,
    covid19Page,
    influenzaPage,
    otherRespiratoryVirusesPage,
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
    await test.step('loads the "whats new" page', async () => {
      await whatsNewPage.goto()
      await whatsNewPage.hasHeading()
    })
    // TODO: Removed API tests for now, until further API work done
    // await test.step('loads the "api" external url', async () => {
    //   await app.nav.getByRole('link', { name: /API/ }).click()
    //   await app.page.waitForURL('http://uhd-uat-public-api-1804026123.eu-west-2.elb.amazonaws.com')
    // })
  })
})
