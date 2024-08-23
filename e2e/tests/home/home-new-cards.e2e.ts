import { test } from '../../fixtures/app.fixture'

test.describe('Landing page new card design feature flag enabled', () => {
  test.describe('Home page', () => {
    test('Page layout', async ({ switchboardPage, homePage, app }) => {
      await test.step('enables feature flag', async () => {
        await switchboardPage.setFeatureFlag('landingPageContent', 'Enabled')
      })
      await test.step('loads the page', async () => {
        await homePage.goto()
      })
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
        await homePage.hasCategories(['Health topics'])
      })
      await test.step('displays a total of 3 health topic cards', async () => {
        await homePage.hasHealthTopicColumns(3)
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
      await test.step('displays related links', async () => {
        await app.hasRelatedLinks()
      })
      await test.step('displays back to top', async () => {
        await app.hasBackToTop()
      })
    })
  })
})
