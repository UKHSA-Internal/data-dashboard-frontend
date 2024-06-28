import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Weather health alerts map, smoke test - desktop @smoke', () => {
  test.use({ viewport: viewports.desktop })

  test('Shows button & opens a map on Weather health alerts page', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('opens cold health alerts overlay', async () => {
      app.goto('/weather-health-alerts/cold')
      weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('shows exit button', async () => {
      await weatherHealthAlertsMapPage.hasButton('Exit map')
    })
  })
})

test.describe('Weather health alerts map, smoke test - tablet @smoke', () => {
  test.use({ viewport: viewports.tablet })

  test('Shows button & opens a map on Weather health alerts page', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('opens cold health alerts overlay', async () => {
      app.goto('/weather-health-alerts/cold')
      weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('shows exit button', async () => {
      await weatherHealthAlertsMapPage.hasButton('Exit map')
    })
  })
})

test.describe('Weather health alerts map, smoke test - mobile @smoke', () => {
  test.use({ viewport: viewports.mobile })

  test('Shows button & opens a map on Weather health alerts page', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('opens cold health alerts overlay', async () => {
      app.goto('/weather-health-alerts/cold')
      weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('shows map buttons', async () => {
      await weatherHealthAlertsMapPage.hasButton('Exit map')
    })
  })
})

test.describe('Weather health alerts map, smoke test - no JavaScript @smoke', () => {
  test.use({ javaScriptEnabled: false, viewport: viewports.mobile })

  test('Does not show a map button on Weather health alerts pages', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('opens cold health alerts overlay', async () => {
      app.goto('/weather-health-alerts/cold')
      app.hasHeading('Cold health alerts')
    })
    await test.step('has no map button showing', async () => {
      weatherHealthAlertsMapPage.hasNoMapButton()
    })
  })
})
