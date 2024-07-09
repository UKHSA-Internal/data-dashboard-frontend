import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Metrics parent page', () => {
  test('Page layout', async ({ metricsParentPage, app }) => {
    await test.step('loads the page', async () => {
      await metricsParentPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await app.hasDocumentTitle('Metrics documentation (page 1 of 6) | UKHSA data dashboard')
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('displays page content', async () => {
      await metricsParentPage.hasPageContent()
    })
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

  test('Paginating back/forward between pages', async ({ metricsParentPage, app }) => {
    await test.step('loads the page', async () => {
      await metricsParentPage.goto()
    })
    await test.step('shows a pagination', async () => {
      await app.hasPagination()
    })
    await test.step('defaults to page 1', async () => {
      await app.checkPaginationLinkIsActive(1)
      await app.hasDocumentTitle('Metrics documentation (page 1 of 6) | UKHSA data dashboard')
    })
    await test.step('click "next" pagination link', async () => {
      await app.clickPaginationNextLink()
    })
    await test.step('shows page 2', async () => {
      await app.checkPaginationLinkIsActive(2)
      await app.hasDocumentTitle('Metrics documentation (page 2 of 6) | UKHSA data dashboard')
    })
    await test.step('click "page 3" pagination link', async () => {
      await app.clickPaginationNumberLink(3)
    })
    await test.step('shows page 3', async () => {
      await app.checkPaginationLinkIsActive(3)
      await app.hasDocumentTitle('Metrics documentation (page 3 of 6) | UKHSA data dashboard')
    })
    await test.step('click "previous" pagination link', async () => {
      await app.clickPaginationPreviousLink()
    })
    await test.step('shows page 2', async () => {
      await app.checkPaginationLinkIsActive(2)
      await app.hasDocumentTitle('Metrics documentation (page 2 of 6) | UKHSA data dashboard')
    })
  })

  test('Redirects to 404 error page when paginating to a page that does not exist', async ({
    metricsParentPage,
    notFoundPage,
  }) => {
    await test.step('loads the page', async () => {
      await metricsParentPage.goto('/metrics?page=100')
    })
    await test.step('redirects to the 404 page', async () => {
      await notFoundPage.hasPageContent()
    })
  })

  test('Performs a search and results have updated with expected result', async ({
    metricsParentPage,
    app,
    baseURL,
  }) => {
    await test.step('loads the page', async () => {
      await metricsParentPage.goto()
    })
    await test.step('count starting items', async () => {
      await metricsParentPage.countMetricsItems(10)
    })
    await test.step('performs a search', async () => {
      await metricsParentPage.search('New cases 7 days')
    })
    await test.step('updates the url', async () => {
      await app.waitForUrl(`${baseURL}/metrics-documentation?search=New+cases+7+days`)
    })
    await test.step('count items after search', async () => {
      await metricsParentPage.countMetricsItems(2)
    })
    await test.step('check entries match expected', async () => {
      await metricsParentPage.hasMatchedEntries(['New cases 7 days sum', 'New cases 7 days percent'])
    })
  })

  test('Performs a search with no results', async ({ metricsParentPage, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await metricsParentPage.goto()
    })
    await test.step('count starting items', async () => {
      await metricsParentPage.countMetricsItems(10)
    })
    await test.step('performs a search', async () => {
      await metricsParentPage.search('no matches')
    })
    await test.step('updates the url', async () => {
      await app.waitForUrl(`${baseURL}/metrics-documentation?search=no+matches`)
    })
    await test.step('count items after search', async () => {
      await metricsParentPage.countMetricsItems(0)
    })
  })

  test('shows all results after clearing the search box', async ({ metricsParentPage, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await metricsParentPage.goto()
    })
    await test.step('performs a search', async () => {
      await metricsParentPage.search('New cases 7 days')
    })
    await test.step('updates the url', async () => {
      await app.waitForUrl(`${baseURL}/metrics-documentation?search=New+cases+7+days`)
    })
    await test.step('check entries match expected', async () => {
      await metricsParentPage.hasMatchedEntries(['New cases 7 days sum', 'New cases 7 days percent'])
    })
    await test.step('count starting items', async () => {
      await metricsParentPage.countMetricsItems(2)
    })
    await test.step('click the clear button', async () => {
      await metricsParentPage.clickClear()
    })
    await test.step('updates the url', async () => {
      await app.waitForUrl(`${baseURL}/metrics-documentation`)
    })
    await test.step('shows all items', async () => {
      await metricsParentPage.countMetricsItems(10)
    })
  })

  test('Persists the current page number when navigating to an entry and then clicking the back button', async ({
    app,
    metricsParentPage,
    metricsChildPage,
  }) => {
    await test.step('loads the page', async () => {
      await metricsParentPage.goto()
    })
    await test.step('click "next" pagination link', async () => {
      await app.clickPaginationNextLink()
    })
    await test.step('shows page 2', async () => {
      await app.checkPaginationLinkIsActive(2)
      await app.hasDocumentTitle('Metrics documentation (page 2 of 6) | UKHSA data dashboard')
    })
    await test.step('opens an entry', async () => {
      await metricsParentPage.openChildPage(/Metrics child mock 6/)
    })
    await test.step('shows heading', async () => {
      await metricsChildPage.hasHeading(/Metrics child mock 6/)
    })
    await test.step('clicks back button', async () => {
      await metricsChildPage.clickBackButton()
    })
    await test.step('shows page 2', async () => {
      await app.checkPaginationLinkIsActive(2)
      await app.hasDocumentTitle('Metrics documentation (page 2 of 6) | UKHSA data dashboard')
    })
  })
})

test.describe('Metrics parent page - no JS', () => {
  test.use({ javaScriptEnabled: false })

  test('Performs a search and results have updated with expected result without JS', async ({ metricsParentPage }) => {
    await test.step('loads the page', async () => {
      await metricsParentPage.goto()
    })
    await test.step('count starting items', async () => {
      await metricsParentPage.countMetricsItems(10)
    })
    await test.step('performs a search', async () => {
      await metricsParentPage.search('New cases 7 days')
    })
    await test.step('clicks search button', async () => {
      await metricsParentPage.clickSearch()
    })
    await test.step('check entries match expected', async () => {
      await metricsParentPage.hasMatchedEntries(['New cases 7 days sum', 'New cases 7 days percent'])
    })
    await test.step('count items after search', async () => {
      await metricsParentPage.countMetricsItems(2)
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
      await app.hasDocumentTitle('Metrics child | UKHSA data dashboard')
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('displays last updated date', async () => {
      await metricsChildPage.hasLastUpdated()
    })
    await test.step('displays summary section', async () => {
      await metricsChildPage.hasSummarySection('COVID-19', 'Healthcare', 'new_cases_7days_sum')
    })
    await test.step('displays a definition section', async () => {
      await metricsChildPage.hasContentSection(
        'definition',
        'This metric shows the count of reported new cases in the last 7 days.'
      )
    })
    await test.step('displays a rationale section', async () => {
      await metricsChildPage.hasContentSection(
        'rationale',
        'The timely identification of cases is important to controlling the spread of COVID-19'
      )
    })
    await test.step('displays a methodology section', async () => {
      await metricsChildPage.hasContentSection(
        'methodology',
        'COVID-19 cases are identified by taking specimens from people and testing them for the SARS-CoV-2 virus.'
      )
    })
    await test.step('displays a caveats section', async () => {
      await metricsChildPage.hasContentSection(
        'caveats',
        'This figure will underestimate the actual number of COVID-19 infections due to people not testing'
      )
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

test.describe('Metrics child page - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ metricsChildPage, app }) => {
    await metricsChildPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Metrics child page - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ metricsChildPage, app }) => {
    await metricsChildPage.goto()
    await app.hasMobileNav()
  })
})

test.describe('Metrics child page - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ metricsChildPage, app }) => {
    await metricsChildPage.goto()
    await app.hasDesktopNav()
  })
})
