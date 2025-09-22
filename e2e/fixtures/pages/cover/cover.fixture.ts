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
}
