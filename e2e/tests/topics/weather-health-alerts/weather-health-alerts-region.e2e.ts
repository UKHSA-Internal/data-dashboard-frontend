import { test } from '../../../fixtures/app.fixture'

test.describe('Feature flag enabled', () => {
  test.describe('Weather health alerts region pages', () => {
    test('North east heat health alerts page - Red', async ({ app, weatherHealthAlertsRegionPage }) => {
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
      // TODO: Fix below test, currently playwright just "fails" no error
      // await test.step('has summary list', () => {
      //   weatherHealthAlertsRegionPage.hasAlertSummaryList({
      //     type: 'Heat Health Alert',
      //     start: '6 May 2024 at 12:00pm',
      //     end: '	8 May 2024 at 12:00pm',
      //     status: 'Red',
      //   })
      // })
      await test.step('has body content', () => {
        weatherHealthAlertsRegionPage.hasBodyContent(
          'Severe impacts are expected across the health and social care sector due to forecast weather conditions'
        )
      })
      await test.step('has map link', () => {
        weatherHealthAlertsRegionPage.hasMapLink('?v=map&type=heat&fid=E12000001')
      })
      await test.step('has related links section', () => {
        weatherHealthAlertsRegionPage.hasRelatedLinks()
      })
    })

    test('East midlands heat health alerts page - Yellow', async ({ app, weatherHealthAlertsRegionPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('weather-health-alerts/heat/east-midlands')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Weather alert for east-midlands | UKHSA data dashboard',
          description: 'Weather alert for east-midlands',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsRegionPage.hasBreadcrumbs('heat')
      })
      await test.step('has heading', async () => {
        await app.hasHeading('Heat-health alert for East midlands')
      })
      await test.step('has last updated', () => {
        weatherHealthAlertsRegionPage.hasLastUpdated()
      })
      await test.step('has alert banner', () => {
        weatherHealthAlertsRegionPage.hasAlertBanner('heat', 'Yellow')
      })
      // TODO: Fix below test, currently playwright just "fails" no error
      // await test.step('has summary list', () => {
      //   weatherHealthAlertsRegionPage.hasAlertSummaryList({
      //     type: 'Heat Health Alert',
      //     start: '6 May 2024 at 12:00pm',
      //     end: '8 May 2024 at 12:00pm',
      //     status: 'Yellow',
      //   })
      // })
      await test.step('has body content', () => {
        weatherHealthAlertsRegionPage.hasBodyContent(
          'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
        )
      })
      await test.step('has map link', () => {
        weatherHealthAlertsRegionPage.hasMapLink('?v=map&type=heat&fid=E12000004')
      })
      await test.step('has related links section', () => {
        weatherHealthAlertsRegionPage.hasRelatedLinks()
      })
    })

    test('London heat health alerts page - Green', async ({ app, weatherHealthAlertsRegionPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('weather-health-alerts/heat/london')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Weather alert for london | UKHSA data dashboard',
          description: 'Weather alert for london',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsRegionPage.hasBreadcrumbs('heat')
      })
      await test.step('has heading', async () => {
        await app.hasHeading('Heat-health alert for London')
      })
      await test.step('has last updated', () => {
        weatherHealthAlertsRegionPage.hasLastUpdated()
      })
      await test.step('has no alert banner', () => {
        weatherHealthAlertsRegionPage.hasNoAlertBanner()
      })
      // TODO: Fix below test, currently playwright just "fails" no error
      // await test.step('has summary list', () => {
      //   weatherHealthAlertsRegionPage.hasAlertSummaryList({
      //     type: 'Heat Health Alert',
      //     start: '6 May 2024 at 12:00pm',
      //     end: '8 May 2024 at 12:00pm',
      //     status: 'Yellow',
      //   })
      // })
      await test.step('has body content', () => {
        weatherHealthAlertsRegionPage.hasBodyContent(
          'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
        )
      })
      await test.step('has map link', () => {
        weatherHealthAlertsRegionPage.hasMapLink('?v=map&type=heat&fid=E12000007')
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
