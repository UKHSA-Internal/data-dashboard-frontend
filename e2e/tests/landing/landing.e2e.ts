import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Landing page - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ landingPage, app }) => {
    await landingPage.goto()
    await app.hasNav()
  })
})

test.describe('Landing page - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto()
  })

  test('Card', async ({ landingPage }) => {
    await test.step('displays a Weather Health Alerts card', async () => {
      await landingPage.hasWeatherHealthAlertsCard('Cold health alerts', { tagline: 'Alerts in England', map: true })
    })
  })

  test('Open map after clicking a minimap region', async ({ landingPage, weatherHealthAlertsMapPage }) => {
    await test.step('click minimap card', async () => {
      await landingPage.clickMinimapCardRegionByMap('Cold health alerts', 'E12000004')
    })
    await test.step('shows map', async () => {
      await weatherHealthAlertsMapPage.hasMapDialog()
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('shows regional alert', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('East Midlands')
    })
  })
})

test.describe('Landing page - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto()
  })

  test('displays the navigation on desktop', async ({ app }) => {
    await app.hasNav()
  })

  test('displays the landing page contents', async ({ landingPage, app }) => {
    await app.hasHeroBannerLayout()
    await landingPage.hasHeading()
  })

  test('displays the charts for respiratory viruses', async ({ landingPage }) => {
    await landingPage.hasLandingPageCard({
      title: 'COVID-19',
      sub_title: 'Cases Reported',
    })
    await landingPage.hasLandingPageCard({
      title: 'Influenza',
      sub_title: 'Healthcare admission rates',
    })
    await landingPage.hasLandingPageCard({
      title: 'Respiratory syncytial virus (RSV)',
      sub_title: 'Healthcare admission rates',
    })
  })

  test('displays the showMore button with more than 3 charts', async ({ landingPage }) => {
    await landingPage.hasShowMoreButton()
  })

  test('doesnt display the showMore button with 3 or less charts', async ({ landingPage }) => {
    await landingPage.hasNoShowMoreButton()
  })

  test('displays the Weather health alerts header', async ({ landingPage }) => {
    await landingPage.hasWeatherHealthAlertsCard('Cold health alerts', { tagline: 'Alerts in England', map: true })
  })

  test('Open map after clicking a minimap region', async ({ landingPage, weatherHealthAlertsMapPage }) => {
    await test.step('click minimap card', async () => {
      await landingPage.clickMinimapCardRegionByMap('Cold health alerts', 'E12000004')
    })
    await test.step('shows map', async () => {
      await weatherHealthAlertsMapPage.hasMapDialog()
      await weatherHealthAlertsMapPage.hasMapLeaflet()
    })
    await test.step('shows regional alert', async () => {
      await weatherHealthAlertsMapPage.dialogIsOpen('East Midlands')
    })
  })

  test('displays the back to top navigation', async ({ app }) => {
    await app.hasBackToTop()
  })
})

test.describe('Landing page - no JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('landing page functionality', async ({ landingPage, app }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'https://digitaltools.phe.org.uk/browse/CDD-1419',
    })

    await test.step('loads the page', async () => {
      await landingPage.goto()
    })

    await test.step('has the correct page formatting', async () => {
      await landingPage.goto()
      await app.hasHeroBannerLayout()
    })
  })
})
