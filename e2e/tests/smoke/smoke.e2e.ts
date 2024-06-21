import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

const pagesShownInNavMenu = [
  'COVID-19',
  'Influenza',
  'Respiratory syncytial virus (RSV)',
  'Other respiratory viruses',
  'About',
  'Metrics documentation',
  "What's new",
  "What's coming",
  'Access our data',
  'Weather health alerts',
]

test.describe('Smoke tests - desktop @smoke', () => {
  test.use({ viewport: viewports.desktop })

  test('Navigates to each page from the side navigation menu', async ({ app, homePage }) => {
    await test.step('loads the home page', async () => {
      await homePage.goto()
      await homePage.hasHeading()
    })

    for (const page of pagesShownInNavMenu) {
      await test.step(`loads the "${page}" page`, async () => {
        await app.clickDesktopNav(decodeURI(page))
        await app.hasHeading(decodeURI(page))
      })
    }
  })

  test('Navigates to Weather Health Alerts mid-level pages', async ({ app }) => {
    await test.step('loads the cold health alerts page', async () => {
      await app.goto('weather-health-alerts/cold')
      await app.hasHeading('Cold health alerts')
    })
    await test.step('loads the heat health alerts page', async () => {
      await app.goto('weather-health-alerts/heat')
      await app.hasHeading('Heat health alerts')
    })
  })
})

test.describe('Smoke tests - mobile @smoke', () => {
  test.use({ viewport: viewports.mobile })

  test('Navigates to each page from the dropdown mobile navigation menu', async ({ app, homePage }) => {
    await test.step('loads the home page', async () => {
      await homePage.goto()
      await homePage.hasHeading()
    })

    for (const page of pagesShownInNavMenu) {
      await test.step(`loads the "${page}" page`, async () => {
        await app.clickMobileNav(decodeURI(page))
        await app.hasHeading(decodeURI(page))
      })
    }
  })

  test('Navigates to Weather Health Alerts mid-level pages', async ({ app }) => {
    await test.step('loads the cold health alerts page', async () => {
      await app.goto('weather-health-alerts/cold')
      await app.hasHeading('Cold health alerts')
    })
    await test.step('loads the heat health alerts page', async () => {
      await app.goto('weather-health-alerts/heat')
      await app.hasHeading('Heat health alerts')
    })
  })
})

test.describe('Smoke tests - no JavaScript @smoke', () => {
  test.use({ javaScriptEnabled: false, viewport: viewports.desktop })

  test('Navigates to each page from the side navigation menu', async ({ app, homePage }) => {
    await test.step('loads the home page', async () => {
      await homePage.goto()
      await homePage.hasHeading()
    })

    for (const page of pagesShownInNavMenu) {
      await test.step(`loads the "${page}" page`, async () => {
        await app.clickDesktopNav(decodeURI(page))
        await app.hasHeading(decodeURI(page))
      })
    }
  })

  test('Navigates to Weather Health Alerts mid-level pages', async ({ app }) => {
    await test.step('loads the cold health alerts page', async () => {
      await app.goto('weather-health-alerts/cold')
      await app.hasHeading('Cold health alerts')
    })
    await test.step('loads the heat health alerts page', async () => {
      await app.goto('weather-health-alerts/heat')
      await app.hasHeading('Heat health alerts')
    })
  })
})
