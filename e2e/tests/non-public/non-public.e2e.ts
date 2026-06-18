import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture.non.public'

const pagesShownInNavMenu = ['start']

test.describe('Non-public tests - desktop @non-public', () => {
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

test.describe('Non-public tests - mobile @non-public', () => {
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

test.describe('Non-public tests - no JavaScript @non-public', () => {
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
