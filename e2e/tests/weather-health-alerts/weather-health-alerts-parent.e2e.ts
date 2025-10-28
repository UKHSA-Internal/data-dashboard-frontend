import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Weather health alerts parent page', () => {
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
    await test.step('map link works as expected', async () => {
      await weatherHealthAlertsParentPage.opensMapLink()
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
    await test.step('map link works as expected', async () => {
      await weatherHealthAlertsParentPage.opensMapLink()
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
    await test.step('map link works as expected', async () => {
      await weatherHealthAlertsParentPage.opensMapLink()
    })
    await test.step('has alerts list', async () => {
      await weatherHealthAlertsParentPage.hasAlertsList()
    })
    await test.step('has related links', async () => {
      await weatherHealthAlertsParentPage.hasRelatedLinks()
    })
  })
})

test.describe('WHA parent smoke test - desktop @smoke', () => {
  test.use({ viewport: viewports.desktop })

  test('Navigates to Weather Health Alerts parent page', async ({ app }) => {
    await test.step('loads the Weather health alerts page', async () => {
      await app.goto('weather-health-alerts')
      await app.hasHeading('Weather health alerts')
    })
  })
})

test.describe('WHA parent smoke test - mobile @smoke', () => {
  test.use({ viewport: viewports.mobile })

  test('Navigates to Weather Health Alerts parent page', async ({ app }) => {
    await test.step('loads the Weather health alerts page', async () => {
      await app.goto('weather-health-alerts')
      await app.hasHeading('Weather health alerts')
    })
  })
})

test.describe('WHA parent smoke test - tablet @smoke', () => {
  test.use({ viewport: viewports.tablet })

  test('Navigates to Weather Health Alerts parent page - tablet', async ({ app }) => {
    await test.step('loads the Weather health alerts page', async () => {
      await app.goto('weather-health-alerts')
      await app.hasHeading('Weather health alerts')
    })
  })
})

test.describe('WHA parent smoke test - no JavaScript @smoke', () => {
  test.use({ javaScriptEnabled: false, viewport: viewports.desktop })

  test('Navigates to Weather Health Alerts parent page - no javascript', async ({ app }) => {
    await test.step('loads the Weather health alerts page', async () => {
      await app.goto('weather-health-alerts')
      await app.hasHeading('Weather health alerts')
    })
  })
})
