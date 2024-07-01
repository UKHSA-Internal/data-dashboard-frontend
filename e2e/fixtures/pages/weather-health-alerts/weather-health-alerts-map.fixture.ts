import { expect, Page } from '@playwright/test'

interface summaryListProps {
  type: string
  status: string
  start: string
  end: string
}

export class WeatherHealthAlertsMapPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async openWeatherHealthAlertsMap() {
    await this.page.getByRole('link', { name: 'View map of weather health alerts' }).click()
  }

  async hasMapButtons() {
    await expect(this.page.getByRole('button', { name: 'Zoom in' })).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Zoom out' })).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Copyright information' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Exit map' })).toBeVisible()
  }

  type ButtonNames = 'Copyright information' | 'Zoom in' | 'Zoom out' | 'Exit Map'
  async clickMapButton(name: ButtonNames) {
    await this.page.getByRole('button', { name }).click()
  }

  async hasCopyrightModal() {
    await expect(this.page.getByRole('button', { name: 'Close' })).toBeVisible()
    await expect(this.page.getByLabel('© Copyright').getByText('Leaflet | © OpenStreetMap')).toBeVisible()
  }

  async exitMap() {
    await this.page.getByRole('link', { name: 'Exit map' }).click()
  }

  async clickRegion(region: string) {
    await this.page.getByTestId(region).click()
  }

  async dialogIsOpen(name: string) {
    await expect(this.page.getByRole('dialog', { name })).toBeVisible()
  }

  async hasDialogContentTitle(region: string) {
    await expect(this.page.getByRole('heading', { level: 2, name: region })).toBeVisible()
  }

  async hasDialogSummaryComponent({ type, status, start, end }: summaryListProps) {
    const wrapper = this.page.getByLabel('Dialog summary')

    await expect(wrapper.getByText('Type')).toBeVisible()
    await expect(wrapper.getByText(type, { exact: true })).toBeVisible()

    await expect(wrapper.getByText('Colour')).toBeVisible()
    await expect(wrapper.getByText(status)).toBeVisible()

    await expect(wrapper.getByText('Start')).toBeVisible()
    await expect(wrapper.getByText(start)).toBeVisible()

    await expect(wrapper.getByText('End', { exact: true })).toBeVisible()
    await expect(wrapper.getByText(end)).toBeVisible()
  }

  async hasHighlightedRegions(regionCount: number) {
    await expect(
      this.page.getByTestId('ukhsa-map-sr').getByText(`${regionCount} regions highlighted in the map area.`)
    ).toBeVisible()
  }

  async hasDialogDescription(dialog: string) {
    await expect(this.page.getByRole('heading', { level: 3, name: 'Description' })).toBeVisible()
    await expect(this.page.getByText(dialog)).toBeVisible()
  }

  async clickDialogGoToAlertPage() {
    await this.page.getByRole('link', { name: 'Go to alert page' }).click()
  }

  async panWeatherHealthAlertsMap() {
    await this.page.getByTestId('feature-E12000006').hover()
    await this.page.mouse.down()
    await this.page.getByTestId('feature-E12000009').hover()
    await this.page.mouse.up()
    await this.page.getByTestId('feature-E12000006').hover()
    await this.page.mouse.down()
    await this.page.getByTestId('feature-E12000009').hover()
    await this.page.mouse.up()
  }
}
