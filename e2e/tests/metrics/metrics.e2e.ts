import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Metrics parent page', () => {
  test('Page layout', async ({ metricsParentPage, app }) => {
    await test.step('loads the page', async () => {
      await metricsParentPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await metricsParentPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    // await test.step('displays without any accessibility defects', async () => {
    //   // eslint-disable-next-line playwright/no-skipped-test -- See annotation below
    //   test.skip()
    //   test.info().annotations.push({
    //     type: 'issue',
    //     description:
    //       'Re-enable once the legacy whats new page is removed. Something in the mock responses is causing a data clash in NextJs',
    //   })
    //   await app.hasNoAccessibilityDefects()
    // })
    await test.step('displays last updated date', async () => {
      await metricsParentPage.hasLastUpdated()
    })
    await test.step('displays related links', async () => {
      await app.hasRelatedLinks()
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })
})

test.describe('Metrics parent page - mobile', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ metricsParentPage, app }) => {
    await metricsParentPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Metrics parent page - tablet', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ metricsParentPage, app }) => {
    await metricsParentPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Metrics parent page - desktop', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ metricsParentPage, app }) => {
    await metricsParentPage.goto()
    await app.hasDesktopNav()
  })
})

test.describe('Metrics child page', () => {
  test('Page layout', async ({ metricsChildPage, app }) => {
    await test.step('loads child page', async () => {
      await metricsChildPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await metricsChildPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    // await test.step('displays without any accessibility defects', async () => {
    //   // eslint-disable-next-line playwright/no-skipped-test -- See annotation below
    //   test.skip()
    //   test.info().annotations.push({
    //     type: 'issue',
    //     description:
    //       'Re-enable once the legacy whats new page is removed. Something in the mock responses is causing a data clash in NextJs',
    //   })
    //   await app.hasNoAccessibilityDefects()
    // })
    await test.step('displays last updated date', async () => {
      await metricsChildPage.hasLastUpdated()
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })

  test('Shows details for the first child page', async ({ metricsParentPage, metricsChildPage }) => {
    await test.step('loads parent page', async () => {
      await metricsParentPage.goto()
    })
    await test.step('clicks first entry', async () => {
      await metricsParentPage.openChildPage('New cases 7 days sum')
    })
    await test.step('shows heading', async () => {
      await metricsChildPage.hasHeading('New cases 7 days sum')
    })
    await test.step('clicks back button', async () => {
      await metricsChildPage.clickBackButton()
    })
    await test.step('checks now on parent page', async () => {
      await metricsParentPage.hasHeading()
    })
  })
})

test.describe('Metrics child page - mobile', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ metricsChildPage, app }) => {
    await metricsChildPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Metrics child page - tablet', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ metricsChildPage, app }) => {
    await metricsChildPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Metrics child page - desktop', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ metricsChildPage, app }) => {
    await metricsChildPage.goto()
    await app.hasDesktopNav()
  })
})
