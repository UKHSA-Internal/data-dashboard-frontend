import { test } from '../../../fixtures/app.fixture'

test.describe('Weather health alerts map display', () => {
  test('Health alerts overlay opens & has expected buttons', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('has all buttons', async () => {
      await weatherHealthAlertsMapPage.hasMapButtons()
    })
  })

  test('Map overlay opens and can exit back to previous page', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('weather-health-alerts/cold')
    })
    await test.step('click map button to open cold alerts map', async () => {
      weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('exit map', async () => {
      await weatherHealthAlertsMapPage.exitMap()
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
    await test.step('click copyright button', async () => {
      await weatherHealthAlertsMapPage.clickMapButton('Copyright information')
    })
    await test.step('shows copyright modal', async () => {
      await weatherHealthAlertsMapPage.hasCopyrightModal()
    })
    await test.step('close copyright modal', async () => {
      await weatherHealthAlertsMapPage.clickMapButton('Close')
    })
  })

  // TODO: CDD-2028: Keyboard WHA e2e
  // test('Viewing the copyright information by keyboard', async ({}) => {})

  test('Zooming in and out by mouse', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
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

  // TODO: CDD-2028: Keyboard WHA e2e
  // test('Zooming in and out by keyboard', async ({}) => {})

  test('Panning the map', async ({ page, app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts cold page', async () => {
      await app.goto('/weather-health-alerts/cold')
    })
    await test.step('click map button', async () => {
      await weatherHealthAlertsMapPage.openWeatherHealthAlertsMap()
    })
    await test.step('map overlay is open', async () => {
      await weatherHealthAlertsMapPage.hasMapButtons()
    })
    await test.step('shows all regions initially', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(9)
    })
    await test.step('pan the map', async () => {
      await page.getByTestId('feature-E12000006').hover()
      await page.mouse.down()
      await page.getByTestId('feature-E12000009').hover()
      await page.mouse.up()
      await page.getByTestId('feature-E12000006').hover()
      await page.mouse.down()
      await page.getByTestId('feature-E12000009').hover()
      await page.mouse.up()
    })
    await test.step('shows fewer regions after pan', async () => {
      await weatherHealthAlertsMapPage.hasHighlightedRegions(6)
    })
  })
})

test.describe('Accessing Weather Health Alerts Map Regions by Mouse', () => {
  test('Red - North East', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('clicks region', async () => {
      await weatherHealthAlertsMapPage.clickRegion('feature-E12000001')
    })
    await test.step('dialog opens', async () => {
      await weatherHealthAlertsMapPage.hasDialogContentTitle('North East')
    })
    await test.step('has summary component in dialog', async () => {
      await weatherHealthAlertsMapPage.hasDialogSummaryComponent({
        type: 'Cold Health Alert',
        status: 'There is currently a Red cold alert status for North East',
        start: '6 May 2024 at 12:00pm',
        end: '8 May 2024 at 12:00pm',
      })
    })
    await test.step('has dialog description', async () => {
      await weatherHealthAlertsMapPage.hasDialogDescription(
        'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
      )
    })
  })

  test('Amber - Yorkshire and The Humber', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('clicks region', async () => {
      await weatherHealthAlertsMapPage.clickRegion('feature-E12000003')
    })
    await test.step('dialog opens', async () => {
      await weatherHealthAlertsMapPage.hasDialogContentTitle('Yorkshire and The Humber')
    })
    await test.step('has summary component in dialog', async () => {
      await weatherHealthAlertsMapPage.hasDialogSummaryComponent({
        type: 'Cold Health Alert',
        status: 'Amber',
        start: '6 May 2024 at 12:00pm',
        end: '8 May 2024 at 12:00pm',
      })
    })
    await test.step('has dialog description', async () => {
      await weatherHealthAlertsMapPage.hasDialogDescription(
        'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
      )
    })
  })

  test('Yellow - East Midlands', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('clicks region', async () => {
      await weatherHealthAlertsMapPage.clickRegion('feature-E12000004')
    })
    await test.step('dialog opens', async () => {
      await weatherHealthAlertsMapPage.hasDialogContentTitle('East Midlands')
    })
    await test.step('has summary component in dialog', async () => {
      await weatherHealthAlertsMapPage.hasDialogSummaryComponent({
        type: 'Cold Health Alert',
        status: 'There is currently a Yellow cold alert status for East Midlands',
        start: '6 May 2024 at 12:00pm',
        end: '8 May 2024 at 12:00pm',
      })
    })
    await test.step('has dialog description', async () => {
      await weatherHealthAlertsMapPage.hasDialogDescription(
        'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
      )
    })
  })

  test('Green - London', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('clicks region', async () => {
      await weatherHealthAlertsMapPage.clickRegion('feature-E12000007')
    })
    await test.step('dialog opens', async () => {
      await weatherHealthAlertsMapPage.hasDialogContentTitle('London')
    })
    await test.step('has summary component in dialog', async () => {
      await weatherHealthAlertsMapPage.hasDialogSummaryComponent({
        type: 'Cold Health Alert',
        status: 'There is currently a Green cold alert status for London',
        start: '6 May 2024 at 12:00pm',
        end: '8 May 2024 at 12:00pm',
      })
    })
    await test.step('has dialog description', async () => {
      await weatherHealthAlertsMapPage.hasDialogDescription(
        'Severe impacts are expected across the health and social care sector due to forecast weather conditions, including'
      )
    })
  })

  test('North West', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('clicks region', async () => {
      await weatherHealthAlertsMapPage.clickRegion('feature-E12000002')
    })
    await test.step('dialog opens', async () => {
      await weatherHealthAlertsMapPage.hasDialogContentTitle('North West')
    })
  })

  test('West Midlands', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('clicks region', async () => {
      await weatherHealthAlertsMapPage.clickRegion('feature-E12000005')
    })
    await test.step('dialog opens', async () => {
      await weatherHealthAlertsMapPage.hasDialogContentTitle('West Midlands')
    })
  })

  test('East of England', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('clicks region', async () => {
      await weatherHealthAlertsMapPage.clickRegion('feature-E12000006')
    })
    await test.step('dialog opens', async () => {
      await weatherHealthAlertsMapPage.hasDialogContentTitle('East of England')
    })
  })

  // TODO: South east click doesn't work, the hitbox for clicking seems to cover london so it clicks there instead? Investigate.
  // test('South East', async ({ app, weatherHealthAlertsMapPage }) => {
  //   await test.step('open weather health alerts page', async () => {
  //     await app.goto('/weather-health-alerts/cold?v=map&type=cold')
  //   })
  //   await test.step('clicks region', async () => {
  //     await weatherHealthAlertsMapPage.clickRegion('feature-E12000008')
  //   })
  //   await test.step('dialog opens', async () => {
  //     await weatherHealthAlertsMapPage.hasdialogContentTitle('South East')
  //   })
  // })

  test('South West', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('clicks region', async () => {
      await weatherHealthAlertsMapPage.clickRegion('feature-E12000009')
    })
    await test.step('dialog opens', async () => {
      await weatherHealthAlertsMapPage.hasDialogContentTitle('South West')
    })
  })

  test('go to alert page link works', async ({ app, weatherHealthAlertsMapPage }) => {
    await test.step('open weather health alerts page', async () => {
      await app.goto('/weather-health-alerts/cold?v=map&type=cold')
    })
    await test.step('clicks region', async () => {
      await weatherHealthAlertsMapPage.clickRegion('feature-E12000009')
    })
    await test.step('clicks go to alert page link', async () => {
      await weatherHealthAlertsMapPage.clickDialogGoToAlertPage()
    })
    await test.step('check navigated successfully', async () => {
      await app.hasHeading('South West')
    })
  })
})

// TODO: CDD-2028: Keyboard WHA e2e
// test.describe('Accessing Weather Health Alerts Map Regions by Keyboard', () => {
//   test('North East', async ({}) => {})
//   test('North West', async ({}) => {})
//   test('Yorkshire and The Humber', async ({}) => {})
//   test('West Midlands', async ({}) => {})
//   test('East Midlands', async ({}) => {})
//   test('South West', async ({}) => {})
//   test('South East', async ({}) => {})
//   test('London', async ({}) => {})
//   test('East of England', async ({}) => {})
// })
