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
    await test.step('displays map legend with correct thresholds', async () => {
      await coverPage.hasMapLegend()
      await coverPage.hasMapLegendWithThresholds(['Under 80%', '80-85%', '85-90%', '90-95%', 'Over 95%'])
    })
  })

  test('Map loading states', async ({ coverPage }) => {
    await test.step('loads the page', async () => {
      await coverPage.goto()
    })
    await test.step('initially no loading state', async () => {
      await coverPage.hasNoMapLoadingState()
    })
    await test.step('selects a vaccine to trigger loading', async () => {
      await coverPage.selectVaccine('MenB (2 years)')
    })
    await test.step('shows loading state during data fetch', async () => {
      await coverPage.hasMapLoadingState()
    })
    await test.step('loading state disappears after data loads', async () => {
      await coverPage.hasNoMapLoadingState()
    })
  })

  test('Map data loading with vaccine selection changes', async ({ coverPage }) => {
    await test.step('loads the page', async () => {
      await coverPage.goto()
    })
    await test.step('initially no vaccine selected, no loading', async () => {
      await coverPage.hasNoMapLoadingState()
    })
    await test.step('selects vaccine', async () => {
      await coverPage.selectVaccine('MenB (2 years)')
    })
    await test.step('map loading state appears', async () => {
      await coverPage.hasMapLoadingState()
    })
    await test.step('map data loaded', async () => {
      await coverPage.hasMapDataLoaded()
    })
    await test.step('waits for first vaccine data to load', async () => {
      await coverPage.hasNoMapLoadingState()
    })
  })

  // TODO: Investigate tooltip in e2e, playwright is finding the element, but unable to interact with it?
  // test('Map tooltip functionality', async ({ coverPage }) => {
  //   await test.step('loads the page', async () => {
  //     await coverPage.goto()
  //   })
  //   await test.step('selects a vaccine to load map data', async () => {
  //     await coverPage.selectVaccine('MenB (2 years)')
  //   })
  //   await test.step('waits for map data to load', async () => {
  //     await coverPage.hasMapDataLoaded()
  //   })
  //   await test.step('clicks on a map feature to show tooltip', async () => {
  //     await coverPage.clickMapFeature('E06000001')
  //   })
  //   await test.step('tooltip appears with vaccination data', async () => {
  //     await coverPage.hasMapTooltip()
  //     await coverPage.hasMapTooltipWithVaccinationData()
  //   })
  //   await test.step('tooltip contains specific content', async () => {
  //     await coverPage.hasMapTooltipWithContent('MenB (2 years)')
  //   })
  //   await test.step('closes tooltip by clicking same feature', async () => {
  //     await coverPage.closeMapTooltip()
  //     await coverPage.hasMapTooltipClosed()
  //   })
  // })

  test('Map interaction controls', async ({ coverPage }) => {
    await test.step('loads the page', async () => {
      await coverPage.goto()
    })
    await test.step('zoom controls work', async () => {
      await coverPage.clickZoomIn()
      await coverPage.clickZoomOut()
    })
    await test.step('fullscreen controls work', async () => {
      await coverPage.clickFullscreen()
      await coverPage.clickExitFullscreen()
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

  test('map functionality on mobile', async ({ coverPage }) => {
    await test.step('loads the page', async () => {
      await coverPage.goto()
    })
    await test.step('displays map on mobile', async () => {
      await coverPage.hasMapOnMobile()
    })
    await test.step('vaccine selection works on mobile', async () => {
      await coverPage.selectVaccine('MenB (2 years)')
      await coverPage.hasVaccineSelected('MenB (2 years)')
    })
  })
})

test.describe('Cover - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ coverPage, app }) => {
    await coverPage.goto()
    await app.hasNav()
  })

  test('map functionality on tablet', async ({ coverPage }) => {
    await test.step('loads the page', async () => {
      await coverPage.goto()
    })
    await test.step('displays map on tablet', async () => {
      await coverPage.hasMapOnTablet()
    })
    await test.step('vaccine selection works on tablet', async () => {
      await coverPage.selectVaccine('MenB (2 years)')
      await coverPage.hasMapDataLoaded()
    })
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
