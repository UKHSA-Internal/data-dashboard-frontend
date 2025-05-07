import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test('About page', async ({ aboutPage, app }) => {
  await test.step('loads the page', async () => {
    await aboutPage.goto()
  })
  await test.step('metadata is correct', async () => {
    await aboutPage.hasMetadata()
  })
  await test.step('displays the correct layout', async () => {
    await app.hasLayout()
  })
  await test.step('displays a warning announcement', async () => {
    await app.hasAnnouncement(
      'Warning',
      'Single page announcement',
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.'
    )
  })
  await test.step('displays without any accessibility defects', async () => {
    await app.hasNoAccessibilityDefects()
  })
  await test.step('displays last updated date', async () => {
    await aboutPage.hasLastUpdated()
  })
  await test.step('displays table of contents', async () => {
    await app.hasTableOfContents([
      'About the UKHSA data dashboard',
      'Using the dashboard',
      'Respiratory viruses',
      'Metrics',
      'Data availability',
      'Data sources',
    ])
  })
  await test.step('displays cms page content', async () => {
    await aboutPage.hasPageContent()
  })
  await test.step('displays related links', async () => {
    await app.hasRelatedLinks()
  })
  await test.step('displays back to top', async () => {
    await app.hasBackToTop()
  })
})

test.describe('About page - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ aboutPage, app }) => {
    await aboutPage.goto()
    await app.hasNav()
  })
})

test.describe('About page - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ aboutPage, app }) => {
    await aboutPage.goto()
    await app.hasNav()
  })
})

test.describe('About page - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ aboutPage, app }) => {
    await aboutPage.goto()
    await app.hasNav()
  })
})
