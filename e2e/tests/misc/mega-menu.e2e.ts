import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Mega Menu', () => {
  test.describe('Mega menu - desktop @desktopOnly', () => {
    test.beforeEach(async ({ switchboardPage }) => {
      await switchboardPage.setMenus('MegaMenu')
    })

    test('Hides the Side Navigation', async ({ app, homePage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto()
      })
      await test.step('Check Side Navigation is hidden', async () => {
        await app.hasNotNav()
      })
    })

    test('displays new mega menu on desktop', async ({ homePage, app }) => {
      await homePage.goto()
      await app.hasNav()
    })
  })

  test.describe('Mega menu - mobile @mobileOnly', () => {
    test.use({ viewport: viewports.mobile })

    test('displays new mega menu on mobile', async ({ switchboardPage, homePage, app }) => {
      await switchboardPage.setMenus('MegaMenu')
      await homePage.goto()
      await app.hasNav()
    })
  })

  test.describe('Mega menu - tablet @tabletOnly', () => {
    test.use({ viewport: viewports.tablet })

    test('displays new mega menu on tablet', async ({ switchboardPage, homePage, app }) => {
      await switchboardPage.setMenus('MegaMenu')
      await homePage.goto()
      await app.hasNav()
    })
  })
})
