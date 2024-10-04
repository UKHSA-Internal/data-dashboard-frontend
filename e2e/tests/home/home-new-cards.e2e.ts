import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Landing page new card design feature flags enabled', () => {
  test.describe('Layout', () => {
    test.beforeEach(async ({ switchboardPage, homePage }) => {
      await switchboardPage.setFeatureFlag('landingPageContent', 'Enabled')
      await homePage.goto()
    })

    test('Page layout', async ({ homePage, app }) => {
      await test.step('metadata is correct', async () => {
        await homePage.hasMetadata()
      })
      await test.step('displays the correct layout', async () => {
        await app.hasLayout()
      })
      await test.step('displays without any accessibility defects', async () => {
        await app.hasNoAccessibilityDefects()
      })
      await test.step('does not display the last updated date', async () => {
        await homePage.hasNotLastUpdated()
      })
      await test.step('displays categories', async () => {
        await homePage.hasCategories(['Health topics', 'Weather health alerts'])
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
    test.beforeEach(async ({ switchboardPage, homePage }) => {
      await switchboardPage.setFeatureFlag('landingPageContent', 'Enabled')
      await homePage.goto()
    })

    test('Cards', async ({ homePage }) => {
      await test.step('displays a total of 3 health topic cards', async () => {
        await homePage.hasHealthTopicColumns(['COVID-19', 'Influenza', 'Measles'])
      })
      await test.step('displays a COVID-19 health topic card', async () => {
        await homePage.hasHealthTopicCard('COVID-19', {
          tagline: 'Positive cases reported',
          trendPercent: '6%',
          trendDescription: 'Increase of 377 (6%) compared to the previous 7 days.',
        })
      })
      await test.step('displays an Influenza health topic card', async () => {
        await homePage.hasHealthTopicCard('Influenza', {
          tagline: 'Weekly hospital admission rates',
          trendPercent: '0.3%',
          trendDescription: 'Decrease of 5,911 (0.3%) compared to the previous 7 days.',
        })
      })
      await test.step('displays a Measles health topic card', async () => {
        await homePage.hasHealthTopicCard('Measles', {
          tagline: 'Positive cases reported',
          trendPercent: '6%',
          trendDescription: 'Increase of 377 (6%) compared to the previous 7 days.',
        })
      })
    })
  })

  test.describe('Weather health alerts', () => {
    test.describe('Desktop @desktopOnly', () => {
      test.use({ viewport: viewports.desktop })

      test.beforeEach(async ({ switchboardPage, homePage }) => {
        await switchboardPage.setFeatureFlag('landingPageContent', 'Enabled')
        await homePage.goto()
      })

      test('Card', async ({ homePage }) => {
        await test.step('displays a Weather Health Alerts card', async () => {
          await homePage.hasWeatherHealthAlertsCard('Heat health alerts', { tagline: 'Across England', map: true })
        })
      })

      test('Open map after clicking a minimap region', async ({ homePage, weatherHealthAlertsMapPage }) => {
        await test.step('click minimap card', async () => {
          await homePage.clickMinimapCardRegionByMap('Heat health alerts', 'E12000004')
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

      test.beforeEach(async ({ switchboardPage, homePage }) => {
        await switchboardPage.setFeatureFlag('landingPageContent', 'Enabled')
        await homePage.goto()
      })

      test('Card', async ({ homePage }) => {
        await test.step('displays a Weather Health Alerts card', async () => {
          await homePage.hasWeatherHealthAlertsCard('Heat health alerts', { tagline: 'Across England', map: true })
        })
      })

      test('Open map after clicking a minimap region', async ({ homePage, weatherHealthAlertsMapPage }) => {
        await test.step('click minimap card', async () => {
          await homePage.clickMinimapCardRegionByMap('Heat health alerts', 'E12000004')
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

      test.beforeEach(async ({ switchboardPage, homePage }) => {
        await switchboardPage.setFeatureFlag('landingPageContent', 'Enabled')
        await homePage.goto()
      })

      test('Card', async ({ homePage }) => {
        await test.step('displays a Weather Health Alerts card', async () => {
          await homePage.hasWeatherHealthAlertsCard('Heat health alerts', { tagline: 'Across England', map: false })
        })
      })
    })
  })
})
