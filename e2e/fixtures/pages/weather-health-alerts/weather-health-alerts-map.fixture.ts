import { expect, Page } from '@playwright/test'

interface SummaryList {
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

  async hasNoMapButton() {
    await expect(this.page.getByRole('link', { name: 'View map of weather health alerts' })).toBeHidden()
  }

  async hasMapButtons() {
    await expect(this.page.getByRole('button', { name: 'Zoom in' })).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Zoom out' })).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Copyright information' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Exit map' })).toBeVisible()
  }

  async hasButton(name: string) {
    await expect(this.page.getByRole('link', { name })).toBeVisible()
  }

  async clickMapButton(name: string) {
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

  async hasDialogueContentTitle(region: string) {
    await expect(this.page.getByRole('heading', { level: 2, name: region })).toBeVisible()
  }

  async hasDialogueSummaryComponent({ type, status, start, end }: summaryListProps) {
    await expect(this.page.getByText('Type')).toBeVisible()
    await expect(this.page.getByText(type, { exact: true })).toBeVisible()

    await expect(this.page.getByText('Colour')).toBeVisible()
    await expect(this.page.getByLabel(status)).toBeVisible()

    await expect(this.page.getByText('Start')).toBeVisible()
    await expect(this.page.getByText(start)).toBeVisible()

    await expect(this.page.getByText('End', { exact: true })).toBeVisible()
    await expect(this.page.getByText(end)).toBeVisible()
  }

  async hasDialogueDescription(dialogue: string) {
    await expect(this.page.getByRole('heading', { level: 3, name: 'Description' })).toBeVisible()
    await expect(this.page.getByText(dialogue)).toBeVisible()
  }

  async clickDialogueGoToAlertPage() {
    await this.page.getByRole('link', { name: 'Go to alert page' }).click()
  }
}
