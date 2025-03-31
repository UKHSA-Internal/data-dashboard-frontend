import { expect, Page } from '@playwright/test'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'

import { SummaryList } from './shared/types'

export class WeatherHealthAlertsRegionPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async hasBreadcrumbs(weather: HealthAlertTypes) {
    const breadbrumbs = await this.page.getByRole('list', { name: 'breadcrumbs' }).getByRole('listitem').all()
    expect(breadbrumbs).toHaveLength(3)

    await expect(this.page.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/')
    await expect(
      this.page.getByLabel('breadcrumbs').getByRole('link', { name: 'Weather health alerts', exact: true })
    ).toHaveAttribute('href', '/weather-health-alerts')
    await expect(this.page.getByRole('link', { name: `${weather} health alerts` })).toHaveAttribute(
      'href',
      `/weather-health-alerts/${weather}`
    )
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Tuesday, 7 May 2024 at 12:00pm/)).toBeVisible()
  }

  async hasAlertBanner(weather: HealthAlertTypes, status: HealthAlertStatus) {
    const weatherCapitalise = weather.charAt(0).toUpperCase() + weather.slice(1)
    const statusLowercase = status.toLowerCase()
    const banner = this.page.getByLabel(`Alert banner`)

    const alertClasses =
      status === 'Amber'
        ? new RegExp(`border-orange bg-orange-opaque`)
        : status === 'Yellow'
          ? new RegExp(`border-custard bg-${statusLowercase}-opaque`)
          : new RegExp(`border-${statusLowercase} bg-${statusLowercase}-opaque`)

    await expect(banner).toHaveClass(alertClasses)

    //TODO: Need to implement tags for mobile vs desktop tags CDD-2024
    // if (!mobile) {
    //   await expect(
    //     banner.getByRole('img', { name: `${weatherCapitalise} health alerts ${statusLowercase}` })
    //   ).toBeHidden()
    //   await expect(banner.getByTestId(`${weather}-alert-icon-${statusLowercase}`)).toBeVisible()
    // }

    await expect(
      banner.getByRole('heading', { level: 2, name: `${status} ${weatherCapitalise}-health alert has been issued` })
    ).toBeVisible()
    await expect(banner.getByText(/Alert is in effect from/)).toBeVisible()
  }

  async hasNoAlertBanner() {
    await expect(this.page.getByLabel('Alert banner')).toBeHidden()
  }

  async hasAlertSummaryList({ type, status, start, end }: SummaryList) {
    const wrapper = this.page.getByLabel('Alert details')

    const expectedStatus = status === 'Green' ? 'No alert' : `${status.toLowerCase()} alert`

    await expect(wrapper.getByText('Type')).toBeVisible()
    await expect(wrapper.getByText(type)).toBeVisible()

    await expect(wrapper.getByText('Alert', { exact: true })).toBeVisible()
    await expect(wrapper.getByText(expectedStatus)).toBeVisible()

    await expect(wrapper.getByText('Start')).toBeVisible()
    await expect(wrapper.getByText(start)).toBeVisible()

    await expect(wrapper.getByText('End')).toBeVisible()
    await expect(wrapper.getByText(end)).toBeVisible()
  }

  async hasBodyContent(bodyText: string) {
    await expect(this.page.getByRole('heading', { level: 3, name: 'Description' })).toBeVisible()
    await expect(this.page.getByText(bodyText)).toBeVisible()
  }

  async hasMapLink(href: string) {
    await expect(this.page.getByRole('link', { name: 'View map of weather health alerts' })).toHaveAttribute(
      'href',
      href
    )
  }

  async opensMapLink() {
    await this.page.getByRole('link', { name: 'View map of weather health alerts' }).click()

    await expect(this.page.getByRole('button', { name: 'Exit map' })).toBeVisible()

    await this.page.getByRole('button', { name: 'Exit map' }).click()
  }

  async hasRelatedLinks() {
    await expect(this.page.getByRole('heading', { name: /Related content/, level: 2 })).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'Cold weather and Health: supporting vulnerable people' })
    ).toHaveAttribute(
      'href',
      'https://www.gov.uk/government/publications/cold-weather-and-health-supporting-vulnerable-people'
    )
    await expect(
      this.page.getByRole('link', { name: 'User guide to use the impact based Weather-Health Alerts' })
    ).toHaveAttribute(
      'href',
      'https://assets.publishing.service.gov.uk/media/653f84ff80884d0013f71d1b/User-guide-impact-based-weather-and-health-alerting-system.pdf'
    )
  }
}
