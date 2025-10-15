import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Feature flag enabled', () => {
  test.describe('Weather health alerts child pages', () => {
    test('Cold health alerts page', async ({ app, weatherHealthAlertsChildPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts/cold')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Cold health alerts | UKHSA data dashboard',
          description: 'View all cold health alerts currently in place in England',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsChildPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Cold health alerts')
      })
      await test.step('has page description', async () => {
        await weatherHealthAlertsChildPage.hasPageDescription()
      })
      await test.step('shows all 9 regions', async () => {
        await weatherHealthAlertsChildPage.hasAlertListItems('cold', [
          {
            region: 'North East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Red',
          },
          {
            region: 'North West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Amber',
          },
          {
            region: 'Yorkshire and The Humber',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'East Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'West Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'East of England',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'London',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
        ])
      })
      await test.step('has further advice section ', async () => {
        await weatherHealthAlertsChildPage.hasFurtherAdviceSection()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsChildPage.hasRelatedLinks()
      })
      await test.step('has link for the map', async () => {
        await weatherHealthAlertsChildPage.hasMapLink('cold')
      })
      await test.step('map link works as expected', async () => {
        await weatherHealthAlertsChildPage.opensMapLink()
      })
    })

    test('Heat health alerts page', async ({ app, weatherHealthAlertsChildPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts/heat')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Heat health alerts | UKHSA data dashboard',
          description: 'View all heat health alerts currently in place in England',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsChildPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Heat health alerts')
      })
      await test.step('has page description', async () => {
        await weatherHealthAlertsChildPage.hasPageDescription()
      })
      await test.step('shows all 9 regions', async () => {
        await weatherHealthAlertsChildPage.hasAlertListItems('heat', [
          {
            region: 'North East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Red',
          },
          {
            region: 'North West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Amber',
          },
          {
            region: 'Yorkshire and The Humber',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'East Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'West Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'East of England',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'London',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
        ])
      })
      await test.step('has further advice section ', async () => {
        await weatherHealthAlertsChildPage.hasFurtherAdviceSection()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsChildPage.hasRelatedLinks()
      })
      await test.step('has link for the map', async () => {
        await weatherHealthAlertsChildPage.hasMapLink('heat')
      })
      await test.step('map link works as expected', async () => {
        await weatherHealthAlertsChildPage.opensMapLink()
      })
    })
  })

  test.describe('Mobile - Weather health alerts child pages @mobileOnly', () => {
    test.use({ viewport: viewports.mobile })
    test('Cold health alerts page', async ({ app, weatherHealthAlertsChildPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts/cold')
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsChildPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Cold health alerts')
      })
      await test.step('has page description', async () => {
        await weatherHealthAlertsChildPage.hasPageDescription()
      })
      await test.step('shows all 9 regions', async () => {
        await weatherHealthAlertsChildPage.hasAlertListItems('cold', [
          {
            region: 'North East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Red',
          },
          {
            region: 'North West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Amber',
          },
          {
            region: 'Yorkshire and The Humber',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'East Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'West Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'East of England',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'London',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
        ])
      })
      await test.step('has further advice section ', async () => {
        await weatherHealthAlertsChildPage.hasFurtherAdviceSection()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsChildPage.hasRelatedLinks()
      })
      await test.step('has link for the map', async () => {
        await weatherHealthAlertsChildPage.hasMapLink('cold')
      })
      await test.step('map link works as expected', async () => {
        await weatherHealthAlertsChildPage.opensMapLink()
      })
    })

    test('Heat health alerts page', async ({ app, weatherHealthAlertsChildPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts/heat')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Heat health alerts | UKHSA data dashboard',
          description: 'View all heat health alerts currently in place in England',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsChildPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Heat health alerts')
      })
      await test.step('has page description', async () => {
        await weatherHealthAlertsChildPage.hasPageDescription()
      })
      await test.step('shows all 9 regions', async () => {
        await weatherHealthAlertsChildPage.hasAlertListItems('heat', [
          {
            region: 'North East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Red',
          },
          {
            region: 'North West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Amber',
          },
          {
            region: 'Yorkshire and The Humber',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'East Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'West Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'East of England',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'London',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
        ])
      })
      await test.step('has further advice section ', async () => {
        await weatherHealthAlertsChildPage.hasFurtherAdviceSection()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsChildPage.hasRelatedLinks()
      })
      await test.step('has link for the map', async () => {
        await weatherHealthAlertsChildPage.hasMapLink('heat')
      })
      await test.step('map link works as expected', async () => {
        await weatherHealthAlertsChildPage.opensMapLink()
      })
    })
  })

  test.describe('Tablet - Weather health alerts child pages @tabletOnly', () => {
    test.use({ viewport: viewports.tablet })

    test('Cold health alerts page', async ({ app, weatherHealthAlertsChildPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts/cold')
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsChildPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Cold health alerts')
      })
      await test.step('has page description', async () => {
        await weatherHealthAlertsChildPage.hasPageDescription()
      })
      await test.step('has link for the map', async () => {
        await weatherHealthAlertsChildPage.hasMapLink('cold')
      })
      await test.step('shows all 9 regions', async () => {
        await weatherHealthAlertsChildPage.hasAlertListItems('cold', [
          {
            region: 'North East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Red',
          },
          {
            region: 'North West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Amber',
          },
          {
            region: 'Yorkshire and The Humber',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'East Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'West Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'East of England',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'London',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
        ])
      })
      await test.step('has further advice section ', async () => {
        await weatherHealthAlertsChildPage.hasFurtherAdviceSection()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsChildPage.hasRelatedLinks()
      })
    })

    test('Heat health alerts page', async ({ app, weatherHealthAlertsChildPage }) => {
      await test.step('loads the page', async () => {
        await app.goto('/weather-health-alerts/heat')
      })
      await test.step('metadata is correct', async () => {
        await app.hasMetadata({
          title: 'Heat health alerts | UKHSA data dashboard',
          description: 'View all heat health alerts currently in place in England',
        })
      })
      await test.step('has breadcrumbs', async () => {
        await weatherHealthAlertsChildPage.hasBreadcrumbs()
      })
      await test.step('has title', async () => {
        await app.hasHeading('Heat health alerts')
      })
      await test.step('has page description', async () => {
        await weatherHealthAlertsChildPage.hasPageDescription()
      })
      await test.step('shows all 9 regions', async () => {
        await weatherHealthAlertsChildPage.hasAlertListItems('heat', [
          {
            region: 'North East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Red',
          },
          {
            region: 'North West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Amber',
          },
          {
            region: 'Yorkshire and The Humber',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'East Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Yellow',
          },
          {
            region: 'West Midlands',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'East of England',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'London',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South East',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
          {
            region: 'South West',
            updated: 'Updated 12:00pm on 7 May 2024',
            status: 'Green',
          },
        ])
      })
      await test.step('has further advice section ', async () => {
        await weatherHealthAlertsChildPage.hasFurtherAdviceSection()
      })
      await test.step('has related links', async () => {
        await weatherHealthAlertsChildPage.hasRelatedLinks()
      })
      await test.step('has link for the map', async () => {
        await weatherHealthAlertsChildPage.hasMapLink('heat')
      })
      await test.step('map link works as expected', async () => {
        await weatherHealthAlertsChildPage.opensMapLink()
      })
    })
  })
})

test.describe('WHA child smoke test - desktop @smoke', () => {
  test.use({ viewport: viewports.desktop })

  test('Navigates to Cold health alerts page', async ({ app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/weather-health-alerts/cold')
    })
    await test.step('Shows header', async () => {
      await app.hasHeading('Cold health alerts')
    })
  })
  test('Navigates to Heat health alerts page', async ({ app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/weather-health-alerts/heat')
    })
    await test.step('Shows header', async () => {
      await app.hasHeading('Heat health alerts')
    })
  })
})

test.describe('WHA child smoke test - tablet @smoke', () => {
  test.use({ viewport: viewports.tablet })

  test('Navigates to Cold health alerts page', async ({ app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/weather-health-alerts/cold')
    })
    await test.step('Shows header', async () => {
      await app.hasHeading('Cold health alerts')
    })
  })

  test('Navigates to Heat health alerts page', async ({ app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/weather-health-alerts/heat')
    })
    await test.step('Shows header', async () => {
      await app.hasHeading('Heat health alerts')
    })
  })
})

test.describe('WHA child smoke test - mobile @smoke', () => {
  test.use({ viewport: viewports.mobile })

  test('Navigates to Cold health alerts page', async ({ app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/weather-health-alerts/cold')
    })
    await test.step('Shows header', async () => {
      await app.hasHeading('Cold health alerts')
    })
  })
  test('Navigates to Heat health alerts page', async ({ app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/weather-health-alerts/heat')
    })
    await test.step('Shows header', async () => {
      await app.hasHeading('Heat health alerts')
    })
  })
})

test.describe('WHA child smoke test - no JavaScript @smoke', () => {
  test.use({ javaScriptEnabled: false, viewport: viewports.desktop })

  test('Navigates to Cold health alerts page', async ({ app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/weather-health-alerts/cold')
    })
    await test.step('Shows header', async () => {
      await app.hasHeading('Cold health alerts')
    })
  })
  test('Navigates to Heat health alerts page', async ({ app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/weather-health-alerts/heat')
    })
    await test.step('Shows header', async () => {
      await app.hasHeading('Heat health alerts')
    })
  })
})
