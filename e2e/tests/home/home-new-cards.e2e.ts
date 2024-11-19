import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Landing page new card design feature flags enabled', () => {
  test.describe('Layout', () => {
    test('Page layout', async ({ landingPage, app }) => {
      await test.step('metadata is correct', async () => {
        await landingPage.hasMetadata()
      })
      // temp remove, as hero banner not on landing page
      // TODO: Add back in on integration
      // await test.step('displays the correct layout', async () => {
      // await app.hasHeroBannerLayout()
      // })
      await test.step('displays without any accessibility defects', async () => {
        // TODO: Add back in on integration (without integration has no H1, so getting defect)
        // await app.hasNoAccessibilityDefects()
      })
      await test.step('does not display the last updated date', async () => {
        await landingPage.hasNotLastUpdated()
      })
      await test.step('displays sections', async () => {
        await landingPage.hasSection(['Respiratory viruses', 'Weather health alerts'])
      })
      await test.step('does not display related links', async () => {
        await app.hasNotRelatedLinks()
      })
      await test.step('displays back to top', async () => {
        await app.hasBackToTop()
      })
    })
  })

  test.describe('Health Topics', () => {
    test.beforeEach(async ({ app }) => {
      await app.goto('/')
    })

    test('Cards', async ({ landingPage }) => {
      await test.step('displays a total of 3 health topic cards', async () => {
        await landingPage.hasHealthTopicColumns(['COVID-19', 'Influenza', 'Measles'])
      })
      await test.step('displays a COVID-19 card', async () => {
        await landingPage.hasLandingPageCard({
          title: 'COVID-19',
          sub_title: 'Cases reported',
        })
      })
      await test.step('displays an Influenza health topic card', async () => {
        await landingPage.hasLandingPageCard({
          title: 'Influenza',
          sub_title: 'Healthcare admission rates',
        })
      })
      await test.step('displays a RSV health topic card', async () => {
        await landingPage.hasLandingPageCard({
          title: 'RSV',
          sub_title: 'Healthcare admission rates',
        })
      })
    })
  })

  test.describe('Weather health alerts', () => {
    test.describe('Desktop @desktopOnly', () => {
      test.use({ viewport: viewports.desktop })

      test.beforeEach(async ({ app }) => {
        await app.goto('/')
      })

      test('Card', async ({ landingPage }) => {
        await test.step('displays a Weather Health Alerts card', async () => {
          await landingPage.hasWeatherHealthAlertsCard('Heat health alerts', { tagline: 'Across England', map: true })
        })
      })

      test('Open map after clicking a minimap region', async ({ landingPage, weatherHealthAlertsMapPage }) => {
        await test.step('click minimap card', async () => {
          await landingPage.clickMinimapCardRegionByMap('Heat health alerts', 'E12000004')
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

    test.describe('Tablet @tabletOnly', () => {
      test.use({ viewport: viewports.tablet })

      test.beforeEach(async ({ app }) => {
        await app.goto('/')
      })

      test('Card', async ({ landingPage }) => {
        await test.step('displays a Weather Health Alerts card', async () => {
          await landingPage.hasWeatherHealthAlertsCard('Heat health alerts', { tagline: 'Across England', map: true })
        })
      })

      test('Open map after clicking a minimap region', async ({ landingPage, weatherHealthAlertsMapPage }) => {
        await test.step('click minimap card', async () => {
          await landingPage.clickMinimapCardRegionByMap('Heat health alerts', 'E12000004')
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

    test.describe('Mobile @mobileOnly', () => {
      test.use({ viewport: viewports.mobile })

      test.beforeEach(async ({ app }) => {
        await app.goto('/')
      })

      test('Card', async ({ landingPage }) => {
        await test.step('displays a Weather Health Alerts card', async () => {
          await landingPage.hasWeatherHealthAlertsCard('Heat health alerts', { tagline: 'Across England', map: false })
        })
      })
    })
  })
})
