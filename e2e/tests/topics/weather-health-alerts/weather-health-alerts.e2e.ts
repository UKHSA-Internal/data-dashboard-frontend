import { test } from '../../../fixtures/app.fixture'

test.describe('Feature flag enabled', () => {
  test.describe('Weather health alerts category page', () => {
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
      await test.step('has page content', async () => {
        await weatherHealthAlertsParentPage.hasPageContent()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsParentPage.hasRelatedLinks()
      })
    })
  })

  test.describe('Cold health alerts page', () => {
    test('loads the page', async ({ app, weatherHealthAlertsChildPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts/cold')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Cold health alerts | UKHSA data dashboard',
          description: 'Mocked Cold health alerts page description',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsChildPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Cold health alerts')
      })
      await test.step('has page content', async () => {
        await weatherHealthAlertsChildPage.hasPageContent('cold')
      })
      await test.step('has further advice section ', async () => {
        await weatherHealthAlertsChildPage.hasFurtherAdviceSection()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsChildPage.hasRelatedLinks()
      })
    })
  })

  test.describe('Heat health alerts page', () => {
    test('loads the page', async ({ app, weatherHealthAlertsChildPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts/heat')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Heat health alerts | UKHSA data dashboard',
          description: 'Mocked Heat health alerts page description',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsChildPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Heat health alerts')
      })
      await test.step('has page content', async () => {
        await weatherHealthAlertsChildPage.hasPageContent('heat')
      })
      await test.step('has further advice section ', async () => {
        await weatherHealthAlertsChildPage.hasFurtherAdviceSection()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsChildPage.hasRelatedLinks()
      })
    })
  })

  test.describe('Weather health alerts region pages', () => {
    test('North east heat health alerts page', async ({ app, weatherHealthAlertsRegionPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts/heat/north-east')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Weather alert for north-east | UKHSA data dashboard',
          description: 'Weather alert for north-east',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsRegionPage.hasBreadcrumbs('heat')
      })
      await test.step('has heading', async () => {
        await app.hasHeading('Heat-health alert for North East')
      })
      await test.step('has last updated', () => {
        weatherHealthAlertsRegionPage.hasLastUpdated()
      })
      await test.step('has alert banner', () => {
        weatherHealthAlertsRegionPage.hasAlertBanner('heat', 'Red')
      })
      // TODO:  Playwright "Failure" here, to resolve
      // await test.step('has summary list', () => {
      //   weatherHealthAlertsRegionPage.hasSummarySection()
      // })
      await test.step('has body content', () => {
        weatherHealthAlertsRegionPage.hasBodyContent(
          'Severe impacts are expected across the health and social care sector due to forecast weather conditions',
          '?v=map&type=heat&fid=E12000001'
        )
      })
      await test.step('has related links section', () => {
        weatherHealthAlertsRegionPage.hasRelatedLinks()
      })
    })
  })
})

/**
 *  Feature flag disabled
 */
// test.describe('Feature flag disabled', () => {
//   test.describe('Weather health alerts category page', () => {
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

//   test.describe('Heat health alerts page', () => {
//     test('loads the page', async ({ app }) => {
//       await test.step('loads the page', async () => {
//         await app.goto('/weather-health-alerts/heat')
//       })
//       await test.step('metadata is correct', async () => {
//         await app.hasDocumentTitle('Page not found | UKHSA data dashboard')
//       })
//       await test.step('Shows page not found message', async () => {
//         await app.hasHeading('Page not found')
//       })
//     })
//   })

//   test.describe('Cold health alerts page', () => {
//     test('loads the page', async ({ app }) => {
//       await test.step('loads the page', async () => {
//         await app.goto('/weather-health-alerts/cold')
//       })en
//       await test.step('metadata is correct', async () => {
//         await app.hasDocumentTitle('Page not found | UKHSA data dashboard')
//       })
//       await test.step('Shows page not found message', async () => {
//         await app.hasHeading('Page not found')
//       })
//     })
//   })

//   test.describe('Weather health alerts page', () => {
//     test('loads the page', async ({ app }) => {
//       await test.step('loads the page', async () => {
//         await app.goto('/weather-health-alerts/cold/east-midlands')
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
