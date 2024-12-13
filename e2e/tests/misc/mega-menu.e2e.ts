import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Mega Menu', () => {
  test.describe('Mega menu - desktop @desktopOnly', () => {
    test('Hides the Side Navigation', async ({ app, landingPage }) => {
      await test.step('Navigate to home page', async () => {
        await landingPage.goto()
      })
      await test.step('Check Side Navigation is hidden', async () => {
        await app.hasNotNav()
      })
    })

    test('displays new mega menu on desktop', async ({ landingPage, app }) => {
      await landingPage.goto()
      await app.hasNav()
    })
  })

  test.describe('Mega menu - mobile @mobileOnly', () => {
    test.use({ viewport: viewports.mobile })

    test('displays new mega menu on mobile', async ({ landingPage, app }) => {
      await landingPage.goto()
      await app.hasNav()
    })
  })

  test.describe('Mega menu - tablet @tabletOnly', () => {
    test.use({ viewport: viewports.tablet })

    test('displays new mega menu on tablet', async ({ landingPage, app }) => {
      await landingPage.goto()
      await app.hasNav()
    })
  })
})
