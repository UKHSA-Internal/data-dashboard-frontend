import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('WHA map smoke test - desktop @smoke', () => {
  test.use({ viewport: viewports.desktop })

  test('Navigates to WHA map', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('opens cold health alerts overlay', async () => {
      app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('shows exit button', async () => {
      await weatherHealthAlertsMapPage.hasButton('Exit map')
    })
  })
})

test.describe('WHA map smoke test - tablet @smoke', () => {
  test.use({ viewport: viewports.tablet })

  test('Navigates to WHA map', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('opens cold health alerts overlay', async () => {
      app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('shows exit button', async () => {
      await weatherHealthAlertsMapPage.hasButton('Exit map')
    })
  })
})

test.describe('WHA map smoke test - mobile @smoke', () => {
  test.use({ viewport: viewports.mobile })

  test('Navigates to WHA map', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('opens cold health alerts overlay', async () => {
      app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('shows map buttons', async () => {
      await weatherHealthAlertsMapPage.hasButton('Exit map')
    })
  })
})

test.describe('WHA map smoke test - noJavaScript @smoke', () => {
  test.use({ javaScriptEnabled: false, viewport: viewports.mobile })

  test('Navigates to WHA parent page', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('opens cold health alerts overlay', async () => {
      app.goto('/weather-health-alerts/cold')
      app.hasHeading('Cold health alerts')
    })
    await test.step('has no map button showing', async () => {
      weatherHealthAlertsMapPage.hasNoMapButton()
    })
  })
})
