import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

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
