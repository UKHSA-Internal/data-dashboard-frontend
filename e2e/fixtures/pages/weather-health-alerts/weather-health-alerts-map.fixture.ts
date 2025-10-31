import { expect, Page } from '@playwright/test'

import { SummaryList } from './shared/types'

type ButtonNames = 'Copyright information' | 'Zoom in' | 'Zoom out' | 'Exit map' | 'Close'

export class WeatherHealthAlertsMapPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async openWeatherHealthAlertsMap() {
    await this.page.locator('a[href*="v=map"]').click()
  }

  async hasMapDialog() {
    await expect(this.page.getByRole('dialog', { name: 'Weather health alerts map' })).toBeVisible()
  }

  async hasMapLeaflet() {
    await expect(this.page.getByRole('application')).toBeVisible()
  }

  async hasNoMapButton() {
    await expect(this.page.getByRole('link', { name: /View map/i })).toBeHidden()
  }

  async hasMapButtons() {
    await expect(this.page.getByRole('button', { name: 'Zoom in' })).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Zoom out' })).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Copyright information' })).toBeVisible()
    await expect(this.page.getByRole('button', { name: 'Exit map' })).toBeVisible()
  }

  async hasMapKey() {
    await expect(this.page.getByTestId('map-key')).toBeVisible()
  }

  async hasUKHSALogo() {
    await expect(this.page.getByTestId('logo-layer')).toBeVisible()
  }

  async hasDisplayKeyButton() {
    await expect(this.page.getByRole('button', { name: 'Display key' })).toBeVisible()
  }

  async mapKeyCanBeMinimised() {
    await expect(this.page.getByTestId('close-key-button')).toBeVisible()
    await this.page.getByTestId('close-key-button').click()
  }

  async clickDisplayKeyButton() {
    await expect(this.page.getByRole('button', { name: 'Display key' })).toBeVisible()
    await this.page.getByRole('button', { name: 'Display key' }).click()
  }

  async hasButton(name: ButtonNames) {
    await expect(this.page.getByRole('button', { name })).toBeVisible()
  }

  async clickMapButton(name: ButtonNames) {
    await this.page.getByRole('button', { name }).click()
  }

  async hasCopyrightModal() {
    await expect(this.page.getByRole('button', { name: 'Close' })).toBeVisible()
    await expect(this.page.getByLabel('© Copyright').getByText('Leaflet | © OpenStreetMap')).toBeVisible()
  }

  async notHaveCopyrightModal() {
    await expect(this.page.getByRole('button', { name: 'Close' })).toBeHidden()
    await expect(this.page.getByLabel('© Copyright').getByText('Leaflet | © OpenStreetMap')).toBeHidden()
  }

  async exitMap() {
    await this.page.getByRole('button', { name: 'Exit map' }).click()
  }

  async clickRegion(region: string) {
    await expect(this.page.getByTestId(region)).toBeVisible()
    await this.page.getByTestId(region).click()
  }

  async dialogIsOpen(name: string) {
    await expect(this.page.getByRole('dialog', { name })).toBeVisible()
  }

  async dialogIsClosed(name: string) {
    await expect(this.page.getByRole('dialog', { name })).toBeHidden()
  }

  async hasDialogContentTitle(region: string) {
    await expect(this.page.getByRole('heading', { level: 2, name: region })).toBeVisible()
  }

  async hasDialogWeatherHealthAlertSummary({ type, status, start, end }: SummaryList) {
    const wrapper = this.page.getByLabel('Weather health alerts summary')

    await expect(wrapper.getByText('Type')).toBeVisible()
    await expect(wrapper.getByText(type, { exact: true })).toBeVisible()

    await expect(wrapper.getByText('Colour')).toBeVisible()
    await expect(wrapper.getByText(status)).toBeVisible()

    if (start) {
      await expect(wrapper.getByText('Start')).toBeVisible()
      await expect(wrapper.getByText(start)).toBeVisible()
    }

    if (end) {
      await expect(wrapper.getByText('End', { exact: true })).toBeVisible()
      await expect(wrapper.getByText(end)).toBeVisible()
    }
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

  // Playwright mouse movement classes: https://playwright.dev/docs/next/api/class-mouse
  async panWeatherHealthAlertsMap() {
    await this.page.mouse.move(800, 500)
    await this.page.mouse.down()
    await this.page.mouse.move(150, 500)
    await this.page.mouse.up()
  }

  // Playwright keyboard movement: https://playwright.dev/docs/api/class-keyboard
  async openCopyrightWithKeyboard() {
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Enter')
  }

  async zoomInWithKeyboard() {
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Enter')
    await this.page.keyboard.press('Enter')
  }
  async zoomOutWithKeyboard() {
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Enter')
    await this.page.keyboard.press('Enter')
  }

  async closeKeyWithKeyboard() {
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Enter')
  }

  async openKeyWithKeyboard() {
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Tab')
    await this.page.keyboard.press('Enter')
  }

  async accessRegionWithKeyboard(regionNumber: number) {
    await this.page.keyboard.press(`Digit${regionNumber}`)
  }
}
