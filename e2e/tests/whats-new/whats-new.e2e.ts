import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe("What's new parent page", () => {
  test('Page layout', async ({ whatsNewParentPage, app }) => {
    await test.step('loads the page', async () => {
      await whatsNewParentPage.goto()
    })
    await test.step('has correct page title', async () => {
      await app.hasDocumentTitle("What's new (page 1 of 4) | UKHSA data dashboard")
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects(['landmark-unique'])
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
    await test.step('groups the entries into monthly sections', async () => {
      await whatsNewParentPage.isListedByMonth(['October 2023', 'September 2023', 'March 2023'])
    })
    await test.step('groups the entries within the sections by date posted with newest first', async () => {
      await whatsNewParentPage.isSortedByDate([
        'List of changes in the month of October 2023',
        'Entry date: 5 October 2023',
        'Entry date: 4 October 2023',
        'List of changes in the month of September 2023',
        'Entry date: 26 September 2023',
      ])
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

  test('Paginating back/forward between pages', async ({ whatsNewParentPage, app }) => {
    await test.step('loads the page', async () => {
      await whatsNewParentPage.goto()
    })
    await test.step('shows a pagination', async () => {
      await app.hasPagination()
    })
    await test.step('defaults to page 1', async () => {
      await app.checkPaginationLinkIsActive(1)
      await app.hasDocumentTitle("What's new (page 1 of 4) | UKHSA data dashboard")
    })
    await test.step('click "next" pagination link', async () => {
      await app.clickPaginationNextLink()
    })
    await test.step('shows page 2', async () => {
      await app.checkPaginationLinkIsActive(2)
      await app.hasDocumentTitle("What's new (page 2 of 4) | UKHSA data dashboard")
    })
    await test.step('click "page 3" pagination link', async () => {
      await app.clickPaginationNumberLink(3)
    })
    await test.step('shows page 3', async () => {
      await app.checkPaginationLinkIsActive(3)
      await app.hasDocumentTitle("What's new (page 3 of 4) | UKHSA data dashboard")
    })
    await test.step('click "previous" pagination link', async () => {
      await app.clickPaginationPreviousLink()
    })
    await test.step('shows page 2', async () => {
      await app.checkPaginationLinkIsActive(2)
      await app.hasDocumentTitle("What's new (page 2 of 4) | UKHSA data dashboard")
    })
  })

  test('Redirects to 404 error page when paginating to a page that does not exist', async ({
    whatsNewParentPage,
    notFoundPage,
  }) => {
    await test.step('loads the page', async () => {
      await whatsNewParentPage.goto('/whats-new?page=100')
    })
    await test.step('redirects to the 404 page', async () => {
      await notFoundPage.hasPageContent()
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

test.describe("What's new child page", () => {
  test('Page layout', async ({ whatsNewChildPage, app }) => {
    await test.step('loads child page', async () => {
      await whatsNewChildPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await whatsNewChildPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays last updated date', async () => {
      await whatsNewChildPage.hasLastUpdated()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects(['landmark-unique'])
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })

  test('Shows details for the first child page', async ({ whatsNewParentPage, whatsNewChildPage }) => {
    await test.step('loads parent page', async () => {
      await whatsNewParentPage.goto()
    })
    await test.step('displays last updated date', async () => {
      await whatsNewChildPage.hasLastUpdated()
    })
    await test.step('clicks first entry', async () => {
      await whatsNewParentPage.openChildPage('Soft launch of the UKHSA data dashboard')
    })
    await test.step('shows heading', async () => {
      await whatsNewChildPage.hasHeading('Soft launch of the UKHSA data dashboard')
    })
    await test.step('shows entry badge', async () => {
      await whatsNewChildPage.hasBadge('New Feature')
    })
    await test.step('does not show Additional Information', async () => {
      await whatsNewChildPage.hasAdditionalInformation(false)
    })
    await test.step('clicks back button', async () => {
      await whatsNewChildPage.clickBackButton()
    })
    await test.step('checks now on parent page', async () => {
      await whatsNewParentPage.hasHeading()
    })
  })

  test('Shows details for the second child page', async ({ whatsNewParentPage, whatsNewChildPage }) => {
    await test.step('loads parent page', async () => {
      await whatsNewParentPage.goto()
    })
    await test.step('displays last updated date', async () => {
      await whatsNewChildPage.hasLastUpdated()
    })
    await test.step('clicks first entry', async () => {
      await whatsNewParentPage.openChildPage('Other respiratory viruses data added to the homepage')
    })
    await test.step('shows heading', async () => {
      await whatsNewChildPage.hasHeading('Other respiratory viruses data added to the homepage')
    })
    await test.step('shows entry badge', async () => {
      await whatsNewChildPage.hasBadge('Data Issue')
    })
    await test.step('shows Additional Information', async () => {
      await whatsNewChildPage.hasAdditionalInformation(true)
    })
  })
})

test.describe("What's new child page - mobile", () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ whatsNewChildPage, app }) => {
    await whatsNewChildPage.goto()
    await app.hasMobileNav()
  })
})

test.describe("What's new child page - tablet", () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ whatsNewChildPage, app }) => {
    await whatsNewChildPage.goto()
    await app.hasMobileNav()
  })
})

test.describe("What's new child page - desktop", () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ whatsNewChildPage, app }) => {
    await whatsNewChildPage.goto()
    await app.hasDesktopNav()
  })
})
