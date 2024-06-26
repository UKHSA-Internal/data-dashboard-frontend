import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Feature flag enabled', () => {
  test.describe('Desktop - Weather health alerts parent page', () => {
    test.use({ viewport: viewports.desktop })

    test('displays the navigation', async ({ app }) => {
      await app.goto('/weather-health-alerts')
      await app.hasDesktopNav()
    })

    test('loads the page', async ({ app, weatherHealthAlertsParentPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Weather health alerts | UKHSA data dashboard',
          description: 'Mocked weather health alerts page description',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsParentPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Weather health alerts')
      })
      await test.step('has page description', async () => {
        await weatherHealthAlertsParentPage.hasPageDescription()
      })
      await test.step('has link for the map', async () => {
        await weatherHealthAlertsParentPage.hasMapLink()
      })
      await test.step('has alerts list', async () => {
        await weatherHealthAlertsParentPage.hasAlertsList()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsParentPage.hasRelatedLinks()
      })
    })
  })

  test.describe('Mobile - Weather health alerts parent page', () => {
    test.use({ viewport: viewports.mobile })

    test('displays the navigation', async ({ app }) => {
      await app.goto('/weather-health-alerts')
      await app.hasMobileNav()
    })

    test('displays WHA category page on mobile', async ({ app, weatherHealthAlertsParentPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts')
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsParentPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Weather health alerts')
      })
      await test.step('has page description', async () => {
        await weatherHealthAlertsParentPage.hasPageDescription()
      })
      await test.step('has link for the map', async () => {
        await weatherHealthAlertsParentPage.hasMapLink()
      })
      await test.step('has alerts list', async () => {
        await weatherHealthAlertsParentPage.hasAlertsList()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsParentPage.hasRelatedLinks()
      })
    })
  })

  test.describe('Tablet - Weather health alerts parent page', () => {
    test.use({ viewport: viewports.tablet })

    test('displays the navigation', async ({ app }) => {
      await app.goto('/weather-health-alerts')
      await app.hasMobileNav()
    })

    test('displays category page on mobile', async ({ app, weatherHealthAlertsParentPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts')
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsParentPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Weather health alerts')
      })
      await test.step('has page description', async () => {
        await weatherHealthAlertsParentPage.hasPageDescription()
      })
      await test.step('has link for the map', async () => {
        await weatherHealthAlertsParentPage.hasMapLink()
      })
      await test.step('has alerts list', async () => {
        await weatherHealthAlertsParentPage.hasAlertsList()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsParentPage.hasRelatedLinks()
      })
    })
  })
})

// TODO: CDD-2032 - Ticket to add feature flag tests
/**
 *  Feature flag disabled
 */
// test.describe('Feature flag disabled', () => {
//   test.describe('Weather health alerts parent page', () => {
//     test('loads the page', async ({ app }) => {
//       await test.step('loads the page', async () => {
//         await app.goto('/weather-health-alerts')
//       })
//       await test.step('metadata is correct', async () => {
//         await app.hasDocumentTitle('Page not found | UKHSA data dashboard')
//       })
//       await test.step('Shows page not found message', async () => {
//         await app.hasHeading('Page not found')
//       })
//     })
//   })
// })
