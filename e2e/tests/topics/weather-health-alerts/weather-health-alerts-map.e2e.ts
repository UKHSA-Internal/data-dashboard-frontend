import { test } from '../../../fixtures/app.fixture'

test.describe('Weather health alerts map page', () => {
  test('map for Cold health alerts', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('weather-health-alerts/cold')
    })
    await test.step('click map button to open cold alerts map', async () => {
      weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('check navigation buttons exist', async () => {
      await weatherHealthAlertsMapPage.hasNavButtons()
    })
    await test.step('click copyright button', async () => {
      await weatherHealthAlertsMapPage.clickMapButton('Copyright information')
    })
    await test.step('shows copyright modal', async () => {
      await weatherHealthAlertsMapPage.hasCopyrightModal()
    })
    await test.step('close copyright modal', async () => {
      await weatherHealthAlertsMapPage.clickMapButton('Close')
    })
    await test.step('exit map', async () => {
      await weatherHealthAlertsMapPage.exitMap()
      await app.hasHeading('Cold health alerts')
    })
    await test.step('re-open cold health alerts map', () => {
      weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })

    // Zoom in, check
    // Zoom out, check
    // Click each region
    //     Check dialogue content
    // Close dialogue
    // Click Go to alert page button, check
  })
})
