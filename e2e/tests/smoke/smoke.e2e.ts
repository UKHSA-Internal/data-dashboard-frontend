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
]

test.describe('Smoke tests - desktop @smoke', () => {
  test.use({ viewport: viewports.desktop })

  test('Navigates to each page from the navigation menu', async ({ app, landingPage }) => {
    await test.step('loads the landing page', async () => {
      await landingPage.goto()
      await landingPage.hasHeading()
    })

    for (const page of pagesShownInNavMenu) {
      await test.step(`loads the "${page}" page`, async () => {
        await app.clickNav(decodeURI(page))
        await app.hasHeading(decodeURI(page))
      })
    }
  })
})

test.describe('Smoke tests - mobile @smoke', () => {
  test.use({ viewport: viewports.mobile })

  test('Navigates to each page from the dropdown mobile navigation menu', async ({ app, landingPage }) => {
    await test.step('loads the landing page', async () => {
      await landingPage.goto()
      await landingPage.hasHeading()
    })

    for (const page of pagesShownInNavMenu) {
      await test.step(`loads the "${page}" page`, async () => {
        await app.clickNav(decodeURI(page))
        await app.hasHeading(decodeURI(page))
      })
    }
  })
})

test.describe('Smoke tests - no JavaScript @smoke', () => {
  test.use({ javaScriptEnabled: false, viewport: viewports.desktop })

  test('Navigates to each page from the side navigation menu', async ({ app, landingPage }) => {
    await test.step('loads the landing page', async () => {
      await landingPage.goto()
      await landingPage.hasHeading()
    })

    for (const page of pagesShownInNavMenu) {
      await test.step(`loads the "${page}" page`, async () => {
        await app.clickBrowseNav(decodeURI(page))
        await app.hasHeading(decodeURI(page))
      })
    }
  })
})
