import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

// Static links shown in nav menu. TODO: This will need updating once we know the content from production
const pagesShownInNavMenu: ReadonlyArray<{ link: string; heading: string }> = [
  { link: 'Home', heading: 'UKHSA data dashboard' },
  { link: 'About', heading: 'About' },
  { link: 'Health topics', heading: 'Health topics' },
  { link: 'API', heading: 'Access our data' },
  { link: 'Data documentation', heading: 'Data documentation' },
]

test.describe('Smoke tests - desktop @smoke', () => {
  test.use({ viewport: viewports.desktop })

  test('Navigates to each page from the navigation menu', async ({ app }) => {
    await app.goto('/')

    for (const { link, heading } of pagesShownInNavMenu) {
      await test.step(`loads the "${link}" page`, async () => {
        await app.clickNav(link)
        await app.hasHeading(heading)
      })
    }
  })
})

test.describe('Smoke tests - mobile @smoke', () => {
  test.use({ viewport: viewports.mobile })

  test('Navigates to each page from the dropdown mobile navigation menu', async ({ app }) => {
    await app.goto('/')

    for (const { link, heading } of pagesShownInNavMenu) {
      await test.step(`loads the "${link}" page`, async () => {
        await app.clickNav(link)
        await app.hasHeading(heading)
      })
    }
  })
})

test.describe('Smoke tests - no JavaScript @smoke', () => {
  test.use({ javaScriptEnabled: false, viewport: viewports.desktop })

  test('Navigates to each page from the static navigation menu', async ({ app }) => {
    await app.goto('/')

    for (const { link, heading } of pagesShownInNavMenu) {
      await test.step(`loads the "${link}" page`, async () => {
        await app.clickBrowseNav(link)
        await app.hasHeading(heading)
      })
    }
  })
})
