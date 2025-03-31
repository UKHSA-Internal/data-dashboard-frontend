import { expect, Page } from '@playwright/test'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'

interface AlertListItems {
  region: string
  updated: string
  status: HealthAlertStatus
}

export class WeatherHealthAlertsChildPage {
  readonly page: Page
  isMobile: boolean

  constructor(page: Page, isMobile: boolean) {
    this.page = page
    this.isMobile = isMobile
  }

  async hasBreadcrumbs() {
    const breadbrumbs = await this.page.getByRole('list', { name: 'breadcrumbs' }).getByRole('listitem').all()
    expect(breadbrumbs).toHaveLength(2)

    await expect(this.page.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/')
    await expect(
      this.page.getByLabel('breadcrumbs').getByRole('link', { name: 'Weather health alerts', exact: true })
    ).toHaveAttribute('href', '/weather-health-alerts')
  }

  async hasPageDescription() {
    await expect(
      this.page.getByText(
        'The alerting system provides an early warning when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is provided by the UK Health Security Agency (UKHSA) in partnership with the Met Office. It’s intended to provide early warning to the health and social care sector, the responder community, the voluntary and community sector and government departments when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is made up of the Heat-Health Alerts (HHA) and the Cold-Health Alerts (CHA). The Weather-Health Alerting System underpins the Adverse Weather and Health Plan.'
      )
    ).toBeVisible()
  }

  async hasMapLink(weather: HealthAlertTypes) {
    await expect(this.page.getByRole('link', { name: 'View map of weather health alerts' })).toHaveAttribute(
      'href',
      `?v=map&type=${weather}`
    )
  }

  async opensMapLink() {
    await this.page.getByRole('link', { name: 'View map of weather health alerts' }).click()

    await expect(this.page.getByRole('button', { name: 'Exit map' })).toBeVisible()

    await this.page.getByRole('button', { name: 'Exit map' }).click()
  }

  async hasAlertListItems(weather: HealthAlertTypes, alertList: Array<AlertListItems>) {
    const regions = this.page.getByRole('list', { name: `${weather} health alerts` })

    await expect(await regions.getByRole('listitem').all()).toHaveLength(9)

    for (let i = 0; i < alertList.length; i++) {
      const expectedStatus = alertList[i].status === 'Green' ? 'No alert' : `${alertList[i].status.toLowerCase()} alert`
      const listItem = regions.getByRole('listitem').nth(i)
      await expect(listItem).toBeVisible()

      await expect(listItem.getByRole('heading', { level: 2, name: alertList[i].region })).toBeVisible()
      await expect(listItem.getByText(alertList[i].updated)).toBeVisible()
      await expect(listItem.getByText(expectedStatus, { exact: true })).toBeVisible()

      //TODO: Need to implement tags for mobile vs desktop tags CDD-2024
      // if (this.isMobile) {
      //   await expect(listItem.getByTestId(`${weather}-alert-icon-${alertList[i].status.toLowerCase()}`)).toBeHidden()
      // } else {
      //   await expect(listItem.getByTestId(`${weather}-alert-icon-${alertList[i].status.toLowerCase()}`)).toBeVisible()
      // }
    }
  }

  async hasFurtherAdviceSection() {
    await expect(this.page.getByRole('heading', { level: 3, name: 'Further advice and guidance' })).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'UKHSA Adverse Weather and Health Plan and supporting evidence' })
    ).toHaveAttribute('href', 'https://www.gov.uk/government/publications/adverse-weather-and-health-plan')
    await expect(
      this.page.getByRole('link', { name: 'Find the latest weather forecasts and warnings' })
    ).toHaveAttribute('href', 'https://www.metoffice.gov.uk/')
    await expect(
      this.page.getByRole('link', { name: 'Met Office National Severe Weather Warning Service' })
    ).toHaveAttribute('href', 'https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings')
    await expect(this.page.getByRole('link', { name: 'Flood Alerts and Warnings' })).toHaveAttribute(
      'href',
      'https://check-for-flooding.service.gov.uk/alerts-and-warnings'
    )
    await expect(
      this.page.getByRole('link', { name: 'Local resilience forums: contact details guidance' })
    ).toHaveAttribute('href', 'https://www.gov.uk/guidance/local-resilience-forums-contact-details')
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
