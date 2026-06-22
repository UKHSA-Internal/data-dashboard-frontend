import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Menu', () => {
  test.describe('Static menu - desktop @desktopOnly', () => {
    test('displays the static menu on desktop', async ({ landingPage, app }) => {
      await landingPage.goto()
      await app.hasDesktopNav()
    })
  })

  test.describe('Collapsible menu - mobile @mobileOnly', () => {
    test.use({ viewport: viewports.mobile })

    test('displays the collapsible menu on mobile', async ({ landingPage, app }) => {
      await landingPage.goto()
      await app.hasMobileNav()
    })
  })

  test.describe('Collapsible menu - tablet @tabletOnly', () => {
    test.use({ viewport: viewports.tablet })

    test('displays the collapsible menu on tablet', async ({ landingPage, app }) => {
      await landingPage.goto()
      await app.hasDesktopNav()
    })
  })
})
