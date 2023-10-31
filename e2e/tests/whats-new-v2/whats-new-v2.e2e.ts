import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe("What's new parent page", () => {
  test('Page layout', async ({ whatsNewParentPage, app }) => {
    await test.step('loads the page', async () => {
      await whatsNewParentPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await whatsNewParentPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      // eslint-disable-next-line playwright/no-skipped-test -- See annotation below
      test.skip()
      test.info().annotations.push({
        type: 'issue',
        description:
          'Re-enable once the legacy whats new page is removed. Something in the mock responses is causing a data clash in NextJs',
      })
      await app.hasNoAccessibilityDefects()
    })
    await test.step('displays last updated date', async () => {
      await whatsNewParentPage.hasLastUpdated()
    })
    await test.step('displays related links', async () => {
      await app.hasRelatedLinks()
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })

  test("Shows a list of published what's new entries", async ({ whatsNewParentPage }) => {
    await test.step('loads the page', async () => {
      await whatsNewParentPage.goto()
    })
    await test.step('groups the entries by month', async () => {
      await whatsNewParentPage.isListedByMonth(['September 2023', 'October 2023'])
    })
    await test.step('shows entry metadata', async () => {
      await whatsNewParentPage.checkForEntry({
        title: 'Soft launch of the UKHSA data dashboard',
        category: 'New feature',
        date: '26 September 2023',
        body: 'The UKHSA data dashboard is an iteration of',
      })
      await whatsNewParentPage.checkForEntry({
        title: 'Updated CSV download and tabular data functionality',
        category: 'New feature',
        date: '4 October 2023',
        body: 'We’ve added the functionality to download a CSV file of a graph across all pages.',
      })
      await whatsNewParentPage.checkForEntry({
        title: 'Other respiratory viruses data added to the homepage',
        category: 'Data issue',
        date: '5 October 2023',
        body: 'We’ve added data for other respiratory viruses to the homepage of the dashboard. The homepage of the dashboard shows headline positivity figures for:',
      })
    })
  })
})

test.describe("What's new parent page - mobile", () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ whatsNewParentPage, app }) => {
    await whatsNewParentPage.goto()
    await app.hasMobileNav()
  })
})

test.describe("What's new parent page - tablet", () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ whatsNewParentPage, app }) => {
    await whatsNewParentPage.goto()
    await app.hasMobileNav()
  })
})

test.describe("What's new parent page - desktop", () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ whatsNewParentPage, app }) => {
    await whatsNewParentPage.goto()
    await app.hasDesktopNav()
  })
})
