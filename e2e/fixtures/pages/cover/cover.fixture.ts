import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class CoverPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/respiratory-viruses/childhood-vaccinations/')
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('Childhood vaccinations')
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /Childhood vaccination coverage/, level: 1 })).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Monday, 21 July 2025 at 10:58am/)).toBeVisible()
  }

  async hasPageContent() {
    await expect(
      this.page.getByText(
        'This resource is intended to enable the user to selectively compare routine childhood vaccination coverage statistics over the available time periods for the following geographies: Local authorities (LA) in England, Regions in England and countries of the United Kingdom.'
      )
    ).toBeVisible()
    await expect(
      this.page.getByText(
        'This interactive resource reports annual childhood vaccination as a proportion of the eligible population (coverage), and are derived from information collected by UK Health Security Agency (UKHSA) through the Cover of vaccinations evaluated rapidly (COVER) programme.'
      )
    ).toBeVisible()
  }

  async hasOfficialStatisticsImage() {
    await expect(this.page.getByAltText('Accredited official statistics')).toBeVisible()
  }

  async hasMap() {
    await expect(this.page.getByTestId('ukhsa-map-container')).toBeVisible()
  }

  async hasMapContent() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(
      mapContainer.locator('img[alt*="UKHSA"], img[alt*="Logo for the UK Health Security Agency"], img[src*="ukhsa"]')
    ).toBeVisible()

    await expect(mapContainer.getByRole('combobox', { name: /Year selection/i })).toBeVisible()

    await expect(mapContainer.getByRole('combobox', { name: /Vaccine selection/i })).toBeVisible()

    await expect(mapContainer.getByRole('button', { name: /Enter fullscreen/i })).toBeVisible()

    await expect(mapContainer.getByRole('button', { name: /Zoom in/i })).toBeVisible()
    await expect(mapContainer.getByRole('button', { name: /Zoom out/i })).toBeVisible()

    await expect(mapContainer.getByRole('button', { name: /Copyright information/i })).toBeVisible()
  }

  async hasKeySection() {
    const mapKey = this.page.getByTestId('ukhsa-map-key')
    await expect(mapKey).toBeVisible()

    await expect(mapKey.getByRole('heading', { name: /Key/i, level: 3 })).toBeVisible()

    const expectedThresholds = ['Under 80%', '80-85%', '85-90%', '90-95%', 'Over 95%']

    for (const threshold of expectedThresholds) {
      await expect(mapKey.getByText(threshold)).toBeVisible()
    }
  }

  async hasSelectedFiltersSection() {
    await expect(this.page.getByRole('heading', { name: /Selected filters/i, level: 2 })).toBeVisible()
    await expect(this.page.getByRole('button', { name: /Clear filter selection/i })).toBeVisible()
    await expect(this.page.getByText(/Hide filters/i)).toBeVisible()
  }

  async hasInitialSelectedFiltersState() {
    await expect(this.page.getByRole('heading', { name: /Selected filters/i, level: 2 })).toBeVisible()
  }

  async clearAllFiltersButtonPresent() {
    await expect(this.page.getByRole('button', { name: /Clear filter selection/i })).toBeVisible()
  }

  async clearSelectedFilters() {
    await this.page.getByRole('button', { name: /Clear filter selection/i }).click()
  }

  async clickDropdownOption(dropdownName: string) {
    await this.page.getByRole('button', { name: dropdownName, exact: true }).click()
  }

  async selectAreaCheckbox(areaName: string) {
    await this.page.getByRole('checkbox', { name: areaName, exact: true }).check()
  }

  async hasSelectedFiltersCount(count: number) {
    await expect(this.page.getByRole('heading', { name: `Selected filters (${count})`, level: 2 })).toBeVisible()
  }

  async hasSelectedFilterItem(itemName: string) {
    await expect(
      this.page.getByTestId('selected-filters-list').getByRole('button', { name: itemName, exact: true })
    ).toBeVisible()
  }

  async removeSelectedFilterItem(itemName: string) {
    await this.page.getByTestId('selected-filters-list').getByRole('button', { name: itemName, exact: true }).click()
  }

  async hideFilters() {
    await this.page.getByRole('link', { name: /Hide filters/i }).click()
  }

  async showFilters() {
    await this.page.getByRole('link', { name: /Show filters/i }).click()
  }

  async hasHiddenFilters() {
    await expect(this.page.getByText('Show filters')).toBeVisible()
    await expect(this.page.getByTestId('ukhsa-static-filter').locator('> div')).toHaveClass(/h-0 m-0 overflow-hidden/)
  }

  async hasVisibleFilters() {
    await expect(this.page.getByText('Hide filters')).toBeVisible()
    await expect(this.page.getByRole('heading', { name: `Selected filters (0)`, level: 2 })).toBeVisible()
  }

  async hasStickySelectedFilters() {
    const selectedFilters = this.page.getByTestId('ukhsa-static-filter')
    await expect(selectedFilters).toHaveCSS('position', 'sticky')
  }

  // --- Map Loading Tests ---
  async hasMapLoadingState() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer.getByText('Map loading')).toBeVisible()
    await expect(mapContainer.getByText('Requesting map based on selected filters')).toBeVisible()
  }

  async hasNoMapLoadingState() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer.getByText('Map loading')).toBeHidden()
  }

  // --- Map Interaction Tests ---
  async clickMapFeature(featureId: string) {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await mapContainer.getByTestId(`feature-${featureId}`).click()
  }

  async hoverMapFeature(featureId: string) {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await mapContainer.getByTestId(`feature-${featureId}`).hover()
  }

  async hasMapTooltip() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer.locator('.leaflet-tooltip')).toBeVisible()
  }

  async hasMapTooltipClosed() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer.locator('.leaflet-tooltip')).toBeHidden()
  }

  async hasMapTooltipWithContent(content: string) {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer.locator('.leaflet-tooltip').getByText(content)).toBeVisible()
  }

  async hasMapTooltipWithVaccinationData() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    const tooltip = mapContainer.locator('.leaflet-tooltip')

    // Check for key tooltip elements
    await expect(tooltip.getByText('Country:')).toBeVisible()
    await expect(tooltip.getByText('Region name:')).toBeVisible()
    await expect(tooltip.getByText('Local Authority:')).toBeVisible()
    await expect(tooltip.getByText('Vaccination:')).toBeVisible()
    await expect(tooltip.getByText('Level of Coverage:')).toBeVisible()
  }

  async closeMapTooltip() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await mapContainer.locator('.leaflet-tooltip').click()
  }

  // --- Map Controls Tests ---
  async clickZoomIn() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await mapContainer.getByRole('button', { name: /Zoom in/i }).click()
  }

  async clickZoomOut() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await mapContainer.getByRole('button', { name: /Zoom out/i }).click()
  }

  async clickFullscreen() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await mapContainer.getByRole('button', { name: /Enter fullscreen/i }).click()
  }

  async clickExitFullscreen() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await mapContainer.getByRole('button', { name: /Exit fullscreen/i }).click()
  }

  async selectVaccine(vaccineName: string) {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await mapContainer.getByRole('combobox', { name: /Vaccine selection/i }).selectOption(vaccineName)
  }

  async hasVaccineSelected(vaccineName: string) {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    const select = mapContainer.getByRole('combobox', { name: /Vaccine selection/i })
    await expect(select).toHaveValue(vaccineName)
  }

  async clearVaccineSelection() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await mapContainer.getByRole('combobox', { name: /Vaccine selection/i }).selectOption('')
  }

  // --- Map Data Tests ---
  async hasMapDataLoaded() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    // Check that map features are rendered
    await expect(mapContainer.locator('[data-testid^="feature-"]').first()).toBeVisible()
  }

  async hasMapErrorState() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer.getByText('Error loading map data')).toBeVisible()
  }

  // Map Legend Tests
  async hasMapLegend() {
    await expect(this.page.getByTestId('ukhsa-map-key')).toBeVisible()
  }

  async hasMapLegendWithThresholds(thresholds: string[]) {
    const mapKey = this.page.getByTestId('ukhsa-map-key')
    for (const threshold of thresholds) {
      await expect(mapKey.getByText(threshold)).toBeVisible()
    }
  }

  // Map Feature Tests
  async hasMapFeatures(count: number) {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    const features = mapContainer.locator('[data-testid^="feature-"]')
    await expect(features).toHaveCount(count)
  }

  async hasMapFeatureWithId(featureId: string) {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer.getByTestId(`feature-${featureId}`)).toBeVisible()
  }

  // Map Responsive Tests
  async hasMapOnMobile() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer).toBeVisible()
    // Check that map has appropriate mobile styling
    await expect(mapContainer).toHaveClass(/h-\[70vh\]/)
  }

  async hasMapOnTablet() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer).toBeVisible()
    // Check that map has appropriate tablet styling
    await expect(mapContainer).toHaveClass(/h-\[70vh\]/)
  }

  async hasMapOnDesktop() {
    const mapContainer = this.page.getByTestId('ukhsa-map-container')
    await expect(mapContainer).toBeVisible()
    // Check that map has appropriate desktop styling
    await expect(mapContainer).toHaveClass(/h-\[70vh\]/)
  }
}
