/* eslint-disable playwright/no-skipped-test */
import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Weather health alerts map display', () => {
  test('Health alerts overlay opens & has expected buttons', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('dialog is open', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('has all buttons', async () => {
      await weatherHealthAlertsMapPage.hasMapButtons()
    })
    await test.step('has map key', async () => {
      await weatherHealthAlertsMapPage.hasMapKey()
    })
    await test.step('has UKHSA logo overlay', async () => {
      await weatherHealthAlertsMapPage.hasUKHSALogo()
    })
  })

  test('Map overlay opens and can exit back to previous page', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('weather-health-alerts/cold')
    })
    await test.step('click map button to open cold alerts map', async () => {
      weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('dialog is open', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('exit map', async () => {
      await weatherHealthAlertsMapPage.clickMapButton('Exit map')
    })
    await test.step('shows cold health alerts page', async () => {
      await app.hasHeading('Cold health alerts')
    })
  })
})

test.describe('Weather Health Alerts map interactivty', () => {
  test('Viewing the copyright information by mouse', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
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
    await test.step('no longer shows copyright modal', async () => {
      await weatherHealthAlertsMapPage.notHaveCopyrightModal()
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
  })

  test('Viewing the copyright information by keyboard', async ({ app, weatherHealthAlertsMapPage, page }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('map overlay is open', async () => {
      await weatherHealthAlertsMapPage.hasMapButtons()
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('open copyright modal with keyboard', async () => {
      await weatherHealthAlertsMapPage.openCopyrightWithKeyboard()
    })
    await test.step('shows copyright modal', async () => {
      await weatherHealthAlertsMapPage.hasCopyrightModal()
    })
    await test.step('close copyright modal', async () => {
      await page.keyboard.press('Enter')
    })
    await test.step('no longer shows copyright modal', async () => {
      await weatherHealthAlertsMapPage.notHaveCopyrightModal()
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
  })

  // TODO: Investigate flakeyness CDD-2136
  test.skip('Zooming in and out by mouse', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('shows all regions initially', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
    })
    await test.step('click zoom in button', async () => {
      await weatherHealthAlertsMapPage.clickMapButton('Zoom in')
    })
    await test.step('shows fewer regions', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(8)
    })
    await test.step('click zoom out button', async () => {
      await weatherHealthAlertsMapPage.clickMapButton('Zoom out')
    })
    await test.step('shows all regions again', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
    })
  })

  test('Zooming in and out by keyboard', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('shows all regions initially', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
    })
    await test.step('zoom in with keyboard', async () => {
      await weatherHealthAlertsMapPage.zoomInWithKeyboard()
    })
    await test.step('shows fewer regions', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(8)
    })
    await test.step('zoom out with keyboard', async () => {
      await weatherHealthAlertsMapPage.zoomOutWithKeyboard()
    })
    await test.step('shows all regions again', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
    })
  })

  test('Panning the map', async ({ app, weatherHealthAlertsMapPage, isMobile }) => {
    test.skip(isMobile, 'Mobile failing, CDD-2024 to sort, add @desktopOnly tag')

    await test.step('open weather health alerts cold page', async () => {
      await app.goto('/weather-health-alerts/cold')
    })
    await test.step('click map button', async () => {
      await weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('map overlay is open', async () => {
      await weatherHealthAlertsMapPage.hasMapButtons()
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('shows all regions initially', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
    })
    await test.step('pan the map', async () => {
      await weatherHealthAlertsMapPage.panWeatherHealthAlertsMap()
    })
    await test.step('shows fewer regions after pan', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(7)
    })
  })

  test('Key should be visible and closable with Mouse', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('shows the map key', async () => {
      await weatherHealthAlertsMapPage.hasMapKey()
    })
    await test.step('can close the map key', async () => {
      await weatherHealthAlertsMapPage.mapKeyCanBeMinimised()
    })
    await test.step('shows the display key button', async () => {
      await weatherHealthAlertsMapPage.hasDisplayKeyButton()
    })
  })

  test('Key should be visible and closable with Keyboard', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('shows the map key', async () => {
      await weatherHealthAlertsMapPage.hasMapKey()
    })
    await test.step('can close the map key', async () => {
      await weatherHealthAlertsMapPage.closeKeyWithKeyboard()
    })
    await test.step('shows the display key button', async () => {
      await weatherHealthAlertsMapPage.hasDisplayKeyButton()
    })
  })

  test('Key should be opened using the display key button with Mouse', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('shows the map key', async () => {
      await weatherHealthAlertsMapPage.hasMapKey()
    })
    await test.step('can close the map key', async () => {
      await weatherHealthAlertsMapPage.mapKeyCanBeMinimised()
    })
    await test.step('shows the display key button', async () => {
      await weatherHealthAlertsMapPage.hasDisplayKeyButton()
    })
    await test.step('click the display key button', async () => {
      await weatherHealthAlertsMapPage.clickDisplayKeyButton()
    })
    await test.step('should display the map key', async () => {
      await weatherHealthAlertsMapPage.hasMapKey()
    })
  })

  test('Key should be opened using the display key button with Keyboard', async ({
    app,
    weatherHealthAlertsMapPage,
  }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('map is displaying', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('shows the map key', async () => {
      await weatherHealthAlertsMapPage.hasMapKey()
    })
    await test.step('can close the map key', async () => {
      await weatherHealthAlertsMapPage.closeKeyWithKeyboard()
    })
    await test.step('shows the display key button', async () => {
      await weatherHealthAlertsMapPage.hasDisplayKeyButton()
    })
    await test.step('click the display key button', async () => {
      await weatherHealthAlertsMapPage.openKeyWithKeyboard()
    })
    await test.step('should display the map key', async () => {
      await weatherHealthAlertsMapPage.hasMapKey()
    })
  })
})

// Need to investigate flaky test: CDD-2136
// -------------------------------------------------

// test.describe('Accessing Weather Health Alerts Map Regions by Mouse', () => {

//   test('Red - North East', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('clicks region', async () => {
//       await weatherHealthAlertsMapPage.clickRegion('feature-E12000001')
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('North East')
//     })
//     await test.step('has summary component in dialog', async () => {
//       await weatherHealthAlertsMapPage.hasDialogWeatherHealthAlertSummary({
//         type: 'Cold Health Alert',
//         status: 'Red',
//         start: '6 May 2024 at 12:00pm',
//         end: '8 May 2024 at 12:00pm',
//       })
//     })
//     await test.step('has dialog description', async () => {
//       await weatherHealthAlertsMapPage.hasDialogDescription(
//         'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
//       )
//     })
//   })

//   test('Amber - North West', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('clicks region', async () => {
//       await weatherHealthAlertsMapPage.clickRegion('feature-E12000002')
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('North West')
//     })
//     await test.step('has summary component in dialog', async () => {
//       await weatherHealthAlertsMapPage.hasDialogWeatherHealthAlertSummary({
//         type: 'Cold Health Alert',
//         status: 'Amber',
//         start: '6 May 2024 at 12:00pm',
//         end: '8 May 2024 at 12:00pm',
//       })
//     })
//     await test.step('has dialog description', async () => {
//       await weatherHealthAlertsMapPage.hasDialogDescription(
//         'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
//       )
//     })
//   })

//   test('Yellow - East Midlands', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('clicks region', async () => {
//       await weatherHealthAlertsMapPage.clickRegion('feature-E12000004')
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('East Midlands')
//     })
//     await test.step('has summary component in dialog', async () => {
//       await weatherHealthAlertsMapPage.hasDialogWeatherHealthAlertSummary({
//         type: 'Cold Health Alert',
//         status: 'Yellow',
//         start: '6 May 2024 at 12:00pm',
//         end: '8 May 2024 at 12:00pm',
//       })
//     })
//     await test.step('has dialog description', async () => {
//       await weatherHealthAlertsMapPage.hasDialogDescription(
//         'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
//       )
//     })
//   })

//   test('Green - London', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('clicks region', async () => {
//       await weatherHealthAlertsMapPage.clickRegion('feature-E12000007')
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('London')
//     })
//     await test.step('has summary component in dialog', async () => {
//       await weatherHealthAlertsMapPage.hasDialogWeatherHealthAlertSummary({
//         type: 'Cold Health Alert',
//         status: 'Green',
//         start: '6 May 2024 at 12:00pm',
//         end: '8 May 2024 at 12:00pm',
//       })
//     })
//     await test.step('has dialog description', async () => {
//       await weatherHealthAlertsMapPage.hasDialogDescription(
//         'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
//       )
//     })
//   })

//   test('North West', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('clicks region', async () => {
//       await weatherHealthAlertsMapPage.clickRegion('feature-E12000002')
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('North West')
//     })
//   })

//   test('West Midlands', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('clicks region', async () => {
//       await weatherHealthAlertsMapPage.clickRegion('feature-E12000005')
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('West Midlands')
//     })
//   })

//   test('East of England', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('clicks region', async () => {
//       await weatherHealthAlertsMapPage.clickRegion('feature-E12000006')
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('East of England')
//     })
//   })

//   // TODO: South east click doesn't work, the hitbox for clicking seems to cover london so it clicks there instead? Investigate.
//   // test('South East', async ({ app, weatherHealthAlertsMapPage }) => {
//   //   await test.step('open weather health alerts page', async () => {
//   //     await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//   //   })
//   //   await test.step('clicks region', async () => {
//   //     await weatherHealthAlertsMapPage.clickRegion('feature-E12000008')
//   //   })
//   //   await test.step('dialog opens', async () => {
//   //     await weatherHealthAlertsMapPage.hasdialogContentTitle('South East')
//   //   })
//   // })

//   test('South West', async ({ app, weatherHealthAlertsMapPage, browserName }) => {
//     test.skip(browserName === 'firefox', 'Firefox intermittently failing here, CDD-2076 to investigate')

//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('clicks region', async () => {
//       await weatherHealthAlertsMapPage.clickRegion('feature-E12000009')
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('South West')
//     })
//   })

//   test('go to alert page link works', async ({ app, weatherHealthAlertsMapPage, browserName }) => {
//     test.skip(browserName === 'firefox', 'Firefox intermittently failing here, CDD-2076 to investigate')

//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('clicks region', async () => {
//       await weatherHealthAlertsMapPage.clickRegion('feature-E12000009')
//     })
//     await test.step('clicks go to alert page link', async () => {
//       await weatherHealthAlertsMapPage.clickDialogGoToAlertPage()
//     })
//     await test.step('check navigated successfully', async () => {
//       await app.hasHeading('South West')
//     })
//     await test.step('check map is closed', async () => {
//       await weatherHealthAlertsMapPage.dialogIsClosed('Weather health alerts map')
//     })
//   })
// })

// test.describe('Accessing Weather Health Alerts Map Regions by Keyboard @desktopOnly', () => {

//   test('Red - North East', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('select region', async () => {
//       await weatherHealthAlertsMapPage.accessRegionWithKeyboard(1)
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('North East')
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('North East')
//     })
//     await test.step('has summary component in dialog', async () => {
//       await weatherHealthAlertsMapPage.hasDialogWeatherHealthAlertSummary({
//         type: 'Cold Health Alert',
//         status: 'Red',
//         start: '6 May 2024 at 12:00pm',
//         end: '8 May 2024 at 12:00pm',
//       })
//     })
//     await test.step('has dialog description', async () => {
//       await weatherHealthAlertsMapPage.hasDialogDescription(
//         'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
//       )
//     })
//   })

//   test('Amber - North West', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('select region', async () => {
//       await weatherHealthAlertsMapPage.accessRegionWithKeyboard(2)
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('North West')
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('North West')
//     })
//     await test.step('has summary component in dialog', async () => {
//       await weatherHealthAlertsMapPage.hasDialogWeatherHealthAlertSummary({
//         type: 'Cold Health Alert',
//         status: 'Amber',
//         start: '6 May 2024 at 12:00pm',
//         end: '8 May 2024 at 12:00pm',
//       })
//     })
//     await test.step('has dialog description', async () => {
//       await weatherHealthAlertsMapPage.hasDialogDescription(
//         'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
//       )
//     })
//   })

//   test('Yellow - East Midlands', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('select region', async () => {
//       await weatherHealthAlertsMapPage.accessRegionWithKeyboard(4)
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('East Midlands')
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('East Midlands')
//     })
//     await test.step('has summary component in dialog', async () => {
//       await weatherHealthAlertsMapPage.hasDialogWeatherHealthAlertSummary({
//         type: 'Cold Health Alert',
//         status: 'Yellow',
//         start: '6 May 2024 at 12:00pm',
//         end: '8 May 2024 at 12:00pm',
//       })
//     })
//     await test.step('has dialog description', async () => {
//       await weatherHealthAlertsMapPage.hasDialogDescription(
//         'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
//       )
//     })
//   })

//   test('Green - London', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('select region', async () => {
//       await weatherHealthAlertsMapPage.accessRegionWithKeyboard(7)
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('London')
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('London')
//     })
//     await test.step('has summary component in dialog', async () => {
//       await weatherHealthAlertsMapPage.hasDialogWeatherHealthAlertSummary({
//         type: 'Cold Health Alert',
//         status: 'Green',
//         start: '6 May 2024 at 12:00pm',
//         end: '8 May 2024 at 12:00pm',
//       })
//     })
//     await test.step('has dialog description', async () => {
//       await weatherHealthAlertsMapPage.hasDialogDescription(
//         'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
//       )
//     })
//   })

//   test('Yorkshire and the Humber', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('select region', async () => {
//       await weatherHealthAlertsMapPage.accessRegionWithKeyboard(3)
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Yorkshire and The Humber')
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('Yorkshire and The Humber')
//     })
//   })

//   test('West Midlands', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('select region', async () => {
//       await weatherHealthAlertsMapPage.accessRegionWithKeyboard(5)
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('West Midlands')
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('West Midlands')
//     })
//   })

//   test('East of England', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('select region', async () => {
//       await weatherHealthAlertsMapPage.accessRegionWithKeyboard(6)
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('East of England')
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('East of England')
//     })
//   })

//   test('South East', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('select region', async () => {
//       await weatherHealthAlertsMapPage.accessRegionWithKeyboard(8)
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('South East')
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('South East')
//     })
//   })

//   test('South West', async ({ app, weatherHealthAlertsMapPage }) => {
//     await test.step('open weather health alerts page', async () => {
//       await app.goto('/weather-health-alerts/cold?v=map&type=cold')
//     })
//     await test.step('map is displaying', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('Weather health alerts map')
//     })
//     await test.step('shows highlighted choropleth regions', async () => {
//       await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
//     })
//     await test.step('select region', async () => {
//       await weatherHealthAlertsMapPage.accessRegionWithKeyboard(9)
//     })
//     await test.step('dialog opens', async () => {
//       await weatherHealthAlertsMapPage.dialogIsOpen('South West')
//       await weatherHealthAlertsMapPage.hasDialogContentTitle('South West')
//     })
//   })
// })

test.describe('Weather health alerts map, smoke test - desktop @smoke', () => {
  test.use({ viewport: viewports.desktop })

  // TODO: Investigate flakeyness CDD-2136

  test.skip('Shows button & opens a map on Weather health alerts page', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('navigate to cold health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold')
    })
    await test.step('open the map', async () => {
      await weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('check map dialog has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapDialog()
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('check interactive map has choropleth layer', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
    })
    await test.step('shows exit button', async () => {
      await weatherHealthAlertsMapPage.hasButton('Exit map')
    })
  })
})

test.describe('Weather health alerts map, smoke test - tablet @smoke', () => {
  test.use({ viewport: viewports.tablet })

  // TODO: Investigate flakeyness CDD-2136
  test.skip('Shows button & opens a map on Weather health alerts page', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('navigate to cold health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold')
    })
    await test.step('open the map', async () => {
      await weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('check map dialog has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapDialog()
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('check interactive map has choropleth layer', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
    })
    await test.step('shows exit button', async () => {
      await weatherHealthAlertsMapPage.hasButton('Exit map')
    })
  })
})

test.describe('Weather health alerts map, smoke test - mobile @smoke', () => {
  test.use({ viewport: viewports.mobile })

  // TODO: Investigate flakeyness CDD-2136
  test.skip('Shows button & opens a map on Weather health alerts page', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('navigate to cold health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold')
    })
    await test.step('open the map', async () => {
      await weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('check map dialog has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapDialog()
    })
    await test.step('check interactive map has loaded', async () => {
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('check interactive map has choropleth layer', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
    })
    await test.step('shows exit button', async () => {
      await weatherHealthAlertsMapPage.hasButton('Exit map')
    })
  })
})

test.describe('Weather health alerts map, smoke test - no JavaScript @smoke', () => {
  test.use({ javaScriptEnabled: false, viewport: viewports.mobile })

  test('Does not show a map button on Weather health alerts pages', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('opens cold health alerts overlay', async () => {
      await app.goto('/weather-health-alerts/cold')
      await app.hasHeading('Cold health alerts')
    })
    await test.step('has no map button showing', async () => {
      await weatherHealthAlertsMapPage.hasNoMapButton()
    })
  })
})
