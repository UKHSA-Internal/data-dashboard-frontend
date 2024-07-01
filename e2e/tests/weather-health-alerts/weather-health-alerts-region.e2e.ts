import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'

import { test } from '../../fixtures/app.fixture'

const cases: Array<{ weather: HealthAlertTypes; region: string; status: HealthAlertStatus; fid: string }> = [
  {
    weather: 'heat',
    region: 'North East',
    status: 'Red',
    fid: 'E12000001',
  },
  {
    weather: 'heat',
    region: 'North West',
    status: 'Amber',
    fid: 'E12000002',
  },
  {
    weather: 'heat',
    region: 'Yorkshire and The Humber',
    status: 'Yellow',
    fid: 'E12000003',
  },
  {
    weather: 'heat',
    region: 'East Midlands',
    status: 'Yellow',
    fid: 'E12000004',
  },
  {
    weather: 'heat',
    region: 'West Midlands',
    status: 'Green',
    fid: 'E12000005',
  },
  {
    weather: 'heat',
    region: 'East of England',
    status: 'Green',
    fid: 'E12000006',
  },
  {
    weather: 'heat',
    region: 'London',
    status: 'Green',
    fid: 'E12000007',
  },
  {
    weather: 'heat',
    region: 'South East',
    status: 'Green',
    fid: 'E12000008',
  },
  {
    weather: 'heat',
    region: 'South West',
    status: 'Green',
    fid: 'E12000009',
  },
  {
    weather: 'cold',
    region: 'North East',
    status: 'Red',
    fid: 'E12000001',
  },
  {
    weather: 'cold',
    region: 'North West',
    status: 'Amber',
    fid: 'E12000002',
  },
  {
    weather: 'cold',
    region: 'Yorkshire and The Humber',
    status: 'Yellow',
    fid: 'E12000003',
  },
  {
    weather: 'cold',
    region: 'East Midlands',
    status: 'Yellow',
    fid: 'E12000004',
  },
  {
    weather: 'cold',
    region: 'West Midlands',
    status: 'Green',
    fid: 'E12000005',
  },
  {
    weather: 'cold',
    region: 'East of England',
    status: 'Green',
    fid: 'E12000006',
  },
  {
    weather: 'cold',
    region: 'London',
    status: 'Green',
    fid: 'E12000007',
  },
  {
    weather: 'cold',
    region: 'South East',
    status: 'Green',
    fid: 'E12000008',
  },
  {
    weather: 'cold',
    region: 'South West',
    status: 'Green',
    fid: 'E12000009',
  },
]

test.describe('Feature flag enabled', () => {
  test.describe('Weather health alerts region pages', () => {
    test.describe.configure({ mode: 'parallel' })

    for (const { weather, region, status, fid } of cases) {
      const regionDashCase = region.toLowerCase().replaceAll(' ', '-')

      test(`${weather} alert - ${region} - ${status}`, async ({ app, weatherHealthAlertsRegionPage }) => {
        await test.step('loads the page', async () => {
          await app.goto(`/weather-health-alerts/${weather}/${regionDashCase}`)
        })
        await test.step('metadata is correct', async () => {
          await app.hasMetadata({
            title: `Weather alert for ${regionDashCase} | UKHSA data dashboard`,
            description: `Weather alert for ${regionDashCase}`,
          })
        })
        await test.step('has breadcrumbs', async () => {
          await weatherHealthAlertsRegionPage.hasBreadcrumbs(weather)
        })
        await test.step('has heading', async () => {
          await app.hasHeading(`${weather}-health alert for ${region}`)
        })
        await test.step('has last updated', () => {
          weatherHealthAlertsRegionPage.hasLastUpdated()
        })
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (status !== 'Green') {
          await test.step('has alert banner', () => {
            weatherHealthAlertsRegionPage.hasAlertBanner(weather, status)
          })
        }
        await test.step('has summary list', () => {
          weatherHealthAlertsRegionPage.hasAlertSummaryList({
            type: `${weather === 'cold' ? 'Cold' : 'Heat'} Health Alert`,
            start: '6 May 2024 at 12:00pm',
            end: '8 May 2024 at 12:00pm',
            status,
          })
        })
        await test.step('has body content', () => {
          weatherHealthAlertsRegionPage.hasBodyContent(
            'Severe impacts are expected across the health and social care sector due to forecast weather conditions'
          )
        })
        await test.step('has map link', () => {
          weatherHealthAlertsRegionPage.hasMapLink(`?v=map&type=${weather}&fid=${fid}`)
        })
        await test.step('map link works as expected', async () => {
          await weatherHealthAlertsRegionPage.opensMapLink()
        })
        await test.step('has related links section', () => {
          weatherHealthAlertsRegionPage.hasRelatedLinks()
        })
      })
    }
  })
})

// TODO: CDD-2032 - Ticket to add feature flag tests
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
