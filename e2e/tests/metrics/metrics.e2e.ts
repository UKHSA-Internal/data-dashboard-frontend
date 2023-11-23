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
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects(['landmark-unique'])
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
