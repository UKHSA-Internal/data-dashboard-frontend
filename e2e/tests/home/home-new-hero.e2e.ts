import { test } from '../../fixtures/app.fixture'

test.describe('Landing page hero feature flag enabled', () => {
  test.describe('Home page', () => {
    test('Page layout', async ({ switchboardPage, homePage, app }) => {
      await test.step('enables feature flag', async () => {
        await switchboardPage.setFeatureFlag('landingPageHero', 'Enabled')
      })
      await test.step('loads the page', async () => {
        await homePage.goto()
      })
      await test.step('metadata is correct', async () => {
        await homePage.hasMetadata()
      })
      await test.step('displays the correct layout', async () => {
        await app.hasHeroBannerLayout()
      })
      await test.step('displays without any accessibility defects', async () => {
        await app.hasNoAccessibilityDefects()
      })

      // Temp remove these, as landing page & hero banner on seperate pages
      // TODO: add back in, on integration

      // await test.step('does not display the last updated date', async () => {
      //   await homePage.hasNotLastUpdated()
      // })
      // await test.step('displays page sections', async () => {
      //   await homePage.hasSectionTitleandSubtitle()
      // })
      // await test.step('Does not display related links', async () => {
      //   await app.hasNotRelatedLinks()
      // })
      // await test.step('displays back to top', async () => {
      //   await app.hasBackToTop()
      // })
    })
  })
})
