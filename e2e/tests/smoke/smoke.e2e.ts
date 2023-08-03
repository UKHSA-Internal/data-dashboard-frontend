import { test } from '../../fixtures/app.fixture'

test.describe('Smoke tests', () => {
  test('Navigates to all pages from the menu', async ({
    app,
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
      await app.nav.getByRole('link', { name: /COVID-19/ }).click()
      await covid19Page.hasHeading()
    })
    await test.step('loads the "Influenza" topic page', async () => {
      await app.nav.getByRole('link', { name: /Influenza/ }).click()
      await influenzaPage.hasHeading()
    })
    await test.step('loads the "Other respiratory viruses" topic page', async () => {
      await app.nav.getByRole('link', { name: /Other respiratory viruses/ }).click()
      await otherRespiratoryVirusesPage.hasHeading()
    })
    await test.step('loads the "about" page', async () => {
      await app.nav.getByRole('link', { name: /About/ }).click()
      await aboutPage.hasHeading()
    })
    await test.step('loads the "whats new" page', async () => {
      await app.nav.getByRole('link', { name: /What's new/ }).click()
      await whatsNewPage.hasHeading()
    })
  })
})
