import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Childhood vaccinations page', () => {
  test('Page layout', async ({ coverPage, app }) => {
    await test.step('loads the page', async () => {
      await coverPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await coverPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('displays heading & description', async () => {
      await coverPage.hasHeading()
    })
    await test.step('displays page content', async () => {
      await coverPage.hasPageContent()
    })
    await test.step('displays official statistics image', async () => {
      await coverPage.hasOfficialStatisticsImage()
    })
  })

  test('Map functionality', async ({ coverPage }) => {
    await test.step('loads the page', async () => {
      await coverPage.goto()
    })
    await test.step('displays the map', async () => {
      await coverPage.hasMap()
    })
    await test.step('displays map content', async () => {
      await coverPage.hasMapContent()
    })
    await test.step('displays key section underneath the map', async () => {
      await coverPage.hasKeySection()
    })
  })

  test('Selected filters functionality', async ({ coverPage }) => {
    await test.step('loads the page', async () => {
      await coverPage.goto()
    })
    await test.step('displays selected filters section', async () => {
      await coverPage.hasSelectedFiltersSection()
    })
    await test.step('displays initial selected filters state', async () => {
      await coverPage.hasInitialSelectedFiltersState()
    })
    await test.step('click dropdown option', async () => {
      await coverPage.clickDropdownOption('Nation')
    })
    await test.step('select area checkbox', async () => {
      await coverPage.selectAreaCheckbox('England')
    })
    await test.step('selected filters updated', async () => {
      await coverPage.hasSelectedFiltersCount(1)
      await coverPage.hasSelectedFilterItem('England')
    })
    await test.step('clears selected filters', async () => {
      await coverPage.clearSelectedFilters()
    })
    await test.step('resets selected filters count to 0', async () => {
      await coverPage.hasSelectedFiltersCount(0)
    })

    await test.step('multiple selected filters', async () => {
      await coverPage.clickDropdownOption('Select vaccination')
      await coverPage.selectAreaCheckbox('2 years')
      await coverPage.hasSelectedFiltersCount(2)
      await coverPage.hasSelectedFilterItem('MenB (2 years)')
      await coverPage.hasSelectedFilterItem('MMR1 (2 years)')
    })
    await test.step('remove selected filter item', async () => {
      await coverPage.removeSelectedFilterItem('MenB (2 years)')
      await coverPage.hasSelectedFiltersCount(1)
      await coverPage.hasSelectedFilterItem('MMR1 (2 years)')
      await coverPage.removeSelectedFilterItem('MMR1 (2 years)')
      await coverPage.hasSelectedFiltersCount(0)
    })
    await test.step('can hide filters', async () => {
      await coverPage.hideFilters()
      await coverPage.hasHiddenFilters()
    })
    await test.step('can show filters again', async () => {
      await coverPage.showFilters()
      await coverPage.hasVisibleFilters()
    })
    await test.step('selected filters container has sticky positioning', async () => {
      await coverPage.hasStickySelectedFilters()
    })
  })
})

test.describe('Cover - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ coverPage, app }) => {
    await coverPage.goto()
    await app.hasNav()
  })
})

test.describe('Cover - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ coverPage, app }) => {
    await coverPage.goto()
    await app.hasNav()
  })
})

test.describe('Cover - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ coverPage, app }) => {
    await coverPage.goto()
    await app.hasNav()
  })
})

test.describe('Cover - no Javascript', () => {
  test.use({ javaScriptEnabled: false })

  test('Parent page', async ({ coverPage }) => {
    await test.step('go to route page', async () => {
      await coverPage.goto()
    })
    await test.step('it redirects to first child page', async () => {
      await coverPage.hasHeading()
    })
  })
})
